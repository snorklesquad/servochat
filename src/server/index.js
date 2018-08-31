const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const request = require("request-promise");
const http = require("http").Server(app);
const io = (module.exports.io = require("socket.io")(http, {
  pingInterval: 100000,
  pingTimeout: 500000
}));
const { markov, token, analyzer } = require('./responseGenerator/markov')
const { redditor } = require('./responseGenerator/redditor')

app.use(bodyParser.json());

const messages = [
  {
    username: "welcome_bot",
    text: "Hello and welcome to the chat!",
    img: "robot-10.svg"
  }
];

let messagesForTony = [{ text: "Hey friend, my name's Tony.", sentiment: 0.6 }];

var users = [
  { username: "Markov13378008", socket: null, img: "robot-15.svg" },
  { username: "PM_YOUR_REDDIT_COMMENTS", socket: null, img: "robot-13.svg" },
  { username: "dubstep99", socket: null, img: "robot-11.svg" }
];

var votes = {};
var queries = [];
var winner = null;
var time = 0;
var timer = 0;
var socketConnections = 0;

const startTimer = () => {
  if (timer == 0) {
    io.emit("receive_time", time);
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
  askTony(winner.question);
  io.emit("winning_query", winner);
  votes = [];
  queries = [];
  io.emit("receive_query", queries);
  io.emit("receive_vote", votes);
};

const askTony = (data) => {
  console.log(data.split(' '))
  let decider = Math.random(),
    sentiment = analyzer.getSentiment(data.split(' '));
    console.log('heres the sentiment: ', sentiment);
  messagesForTony = [];
  if (decider < 0.4) {
    console.log('hitting the reddit')
    redditor(data).then(response => {
      if (!response) {
        console.log('hitting the markov');
        messagesForTony.push({
          text: markov(10),
          sentiment: sentiment
        });
      } else {
        messagesForTony.push({
          text: response,
          sentiment: sentiment
        });
      }
    })
  } else {
    console.log('hitting whatever this thing is')
    askTheNet(data, messagesForTony, sentiment)
  }
}


const askTheNet = (message, chat, sentiment) => {
  let query = message;
      tokens = token(query);
      options = {
        method: 'POST',
        uri: 'http://localhost:5000/predict',
        body: tokens.join(' '),
        json: true
      }
  request(options).then((data) => {
    if (sentiment === undefined)  {
      chat.push({username: 'dubstep_lives', text: data.predictions.slice(40).trim(), img: "robot-11.svg"})
      setTimeout(() => io.emit("receive_message", chat), 200);
    } else {
      chat = [];
      chat.push({ text: data.predictions.slice(40, 103).trim(), sentiment: sentiment })
    }
  })
}

const sendBotMessageToggle = (data) => {
  let decider = Math.random()
  if (decider > 0.4) {
    console.log('hitting the reddit')
    redditor(data).then(response => {
      if (!response) {
        console.log('hitting the markov');
        messages.push({
          username: "markov13378008",
          text: markov(10),
          img: "robot-15.svg"
        });
      } else {
        messages.push({
          username: "PM_YOUR_REDDIT_COMMENTS",
          text: response,
          img: "robot-13.svg"
        });
      }
      setTimeout(() => io.emit("receive_message", messages), 200)
    })
  } else {
    console.log('hitting whatever this thing is')
    askTheNet(data, messages)
  }
}

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
    io.emit("receive_message", messages);
    if (Math.random() > 0.25) {
      sendBotMessageToggle(data.text);
    }
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
    io.emit("game_reset");
  });

  socket.on("disconnect", reason => {
    socketConnections--;
    if (users.findIndex(u => u.socket === socket.id) !== -1) {
      users.splice(users.findIndex(u => u.socket === socket.id), 1);
    }
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
  res.send(markov(10));
});

app.get("/tony", (req, res) => {
  res.send(JSON.stringify(messagesForTony))
})

app.post("/redditor", (req, res) => {
  redditor(req.body.query).then(response => {
    res.send(response);
  });
  // redditor(winner).then((response) => {res.send(response)});
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/index.html"));
});

const chitChat = () => {
  let timer = Math.random().toFixed() * 1000,
      decider = Math.random(),
      markovian = markov(10);
  messages.push({
    username: "markov_bot",
    text: markovian,
    img: "robot-10.svg"
  })
  setTimeout(timer, () => io.emit("receive_message", messages), 200)
  if (decider >= 0.5) {
    askTheNet(markovian, messages)
  }
}

setInterval(1000, () => chitChat())

http.listen(process.env.PORT || 8080, () => console.log("on 8080"));
