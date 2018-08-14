const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = module.exports.io = require('socket.io')(http);

const messages = [
  {
    username: 'welcome_bot',
    text: 'Hello and welcome to the chat!'
  }
];
var users = [];
var votes = {};
var queries = [];

io.on('connection', socket => {
  console.log('user connected: ', socket.id);
  socket.emit('receive_id', socket.id);
  io.emit('receive_message', messages); 
  io.emit('receive_user', users); 
  io.emit('receive_query', queries);
  io.emit('receive_votes', votes);

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

  socket.on('disconnect', () => {
    io.emit('disconnect_user', socket.id);
    users.splice(users.indexOf(socket));
    console.log('user disconnected: ', socket.id);
  });
});

app.use(express.static(path.join(__dirname, '../client/')))

app.get('*', (req, res) => {
  res.redirect('/');
});

http.listen(process.env.PORT || 8080, () => console.log('on 8080'));