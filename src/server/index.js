const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = module.exports.io = require('socket.io')(http);
app.use(bodyParser.json());

const messages = [
  {
    username: 'welcome_bot',
    text: 'Hello and welcome to the chat!'
  }
];
var users = [];
var votes = {};
var queries = [];
var winner = null;

io.on('connection', socket => {
  console.log('user connected: ', socket.id);
  socket.emit('receive_id', socket.id);
  io.emit('receive_message', messages); 
  io.emit('receive_user', users); 
  io.emit('receive_query', queries);
  io.emit('receive_votes', votes);
  io.emit('winning_query', winner);

  socket.on('send_message', data => {
    messages.push(data);
    io.emit('receive_message', messages); 
  });

  socket.on('send_user', data => {
    users.push(data);
    io.emit('receive_user', users); 
  });

  socket.on('send_query', data => {
    queries.push(data);
    io.emit('receive_query', queries);
  })

  socket.on('cast_vote', data => {
    if (votes[data.i]) {
      votes[data.i].count++;
    } else {
      votes[data.i] = {
        q: data.q,
        id: data.i,
        count: 1
      }
    }
    io.emit('receive_vote', votes);
  })

  socket.on('tally_votes', () => {
    let sortedVotes = Object.keys(votes).sort((a, b) => votes[b].count - votes[a].count);
    console.log(sortedVotes);
    let winningVote = sortedVotes[0];
    winner = votes[winningVote];
    io.emit('winning_query', winner);
    votes = [];
    queries = [];
    io.emit('receive_query', queries);
    io.emit('receive_vote', votes);
  })

  socket.on('reset_game', () => {
    winner = null;
    votes = [];
    queries = [];
    io.emit('receive_query', queries);
    io.emit('receive_vote', votes);
    io.emit('winning_query', winner);
  })

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket));
    io.emit('disconnect_user', users);
    console.log('user disconnected: ', socket.id);
  });
});

app.use(express.static(path.join(__dirname, '../client/')))

app.post('/auth', (req, res) => {
  if (req.body.pass === 'irobot') {
    res.send({result: true});
  } else {
    res.send({result: false})
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

http.listen(process.env.PORT || 8080, () => console.log('on 8080'));