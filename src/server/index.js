const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(http, {
  pingInterval: 100000,
  pingTimeout: 500000
}));
const { markov } = require('./responseGenerator/markov')
const { redditor } = require('./responseGenerator/redditor')

app.use(bodyParser.json());

const messages = [
  {
    username: "welcome_bot",
    text: "Hello and welcome to the chat!"
  }
];
var users = [
  {username: 'markov_bot', socket: null},
  {username: 'reddit_bot', socket: null}
]; 
var votes = {};
var queries = [];
var winner = null;
var time = 0;
var timer = 0;
var socketConnections = 0;

const startTimer = () => {
  if (timer == 0) {
    io.emit('receive_time', time);
    timer = setInterval(countdown, 1000);
  }
};

const countdown = () => {
  if (time > 0) {
    time--;
  } else if (time === 0) {
    clearInterval(timer);
    timer = 0;
    tallyVotes();
  }
  io.emit("receive_time", time);
};

const tallyVotes = () => {
  let sortedVotes = Object.keys(votes).sort(
    (a, b) => votes[b].count - votes[a].count
  );
  let winningVote = sortedVotes[0];
  winner = votes[winningVote];
  sendBotMessageToggle(winner);
  io.emit("winning_query", winner);
  votes = [];
  queries = [];
  io.emit("receive_query", queries);
  io.emit("receive_vote", votes);
};

const sendBotMessageToggle = (data) => {
  if (Math.random() > 0.5) {
    redditor(data).then((response)=>{
      messages.push({username: 'redditor_bot', text: response})
      setTimeout(() => io.emit("receive_message", messages), 1000);
    })
  } else {
    messages.push({username: 'markov_bot', text: markov(10)})
    setTimeout(() => io.emit("receive_message", messages), 1000);
  }
}

// io.set('transports', ['websocket']);
io.on("connection", socket => {
  console.log("user connected: ", socket.id);
  socketConnections++;
  console.log("current number of connections: ", socketConnections);
  socket.emit("receive_id", socket.id);
  io.emit("receive_message", messages);
  io.emit("receive_user", users);
  io.emit("receive_query", queries);
  io.emit("receive_votes", votes);
  io.emit("winning_query", winner);

  socket.on("send_message", data => {
    messages.push(data);
    io.emit('receive_message', messages);
    sendBotMessageToggle(data.text);
  });

  socket.on("send_user", data => {
    users.push(data);
    io.emit("receive_user", users);
  });

  socket.on("send_query", data => {
    queries.push(data);
    io.emit("receive_query", queries);
  });

  socket.on("start_timer", data => {
    time = 60;
    startTimer();
  });

  socket.on("cast_vote", data => {
    if (votes[data.i]) {
      votes[data.i].count++;
    } else {
      votes[data.i] = {
        question: data.q.question,
        user: data.q.user,
        id: data.i,
        count: 1
      };
    }
    io.emit("receive_vote", Object.values(votes));
  });

  socket.on("tally_votes", () => {
    let sortedVotes = Object.keys(votes).sort(
      (a, b) => votes[b].count - votes[a].count
    );
    let winningVote = sortedVotes[0];
    winner = votes[winningVote];
    io.emit("winning_query", winner);
    votes = [];
    queries = [];
    io.emit("receive_query", queries);
    io.emit("receive_vote", votes);
  });

  socket.on("reset_game", () => {
    winner = null;
    votes = [];
    queries = [];
    io.emit("receive_query", queries);
    io.emit("receive_vote", votes);
    io.emit("winning_query", winner);
    io.emit('game_reset');
  });

  socket.on("disconnect", reason => {
    console.log(reason);
    socketConnections--;
    users.splice(users.indexOf(socket));
    io.emit("disconnect_user", users);
    console.log("user disconnected: ", socket.id);
    console.log("current number of connections: ", socketConnections);
  });
});

app.use(express.static(path.join(__dirname, "../client/")));

app.post("/auth", (req, res) => {
  if (req.body.pass === "irobot") {
    res.send({ result: true });
  } else {
    res.send({ result: false });
  }
});

app.post("/markov", (req, res) => {
  res.send(markov(10))
})

app.post("/redditor", (req, res) => {
  redditor(req.body.query).then((response)=>{res.send(response)})
})

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

http.listen(process.env.PORT || 8080, () => console.log("on 8080"));
