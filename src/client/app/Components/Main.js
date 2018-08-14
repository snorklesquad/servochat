import React, { Component } from "react";
import io from "socket.io-client";
import { Button, Container, Input, Modal, Form, Grid, Segment } from "semantic-ui-react";
import Splash from "./Splash";
import Chat from "./Chat";
import VideoPlayer from "./VideoPlayer";
import Users from "./Users";
import QueryGame from './QueryGame';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      verified: false,
      streaming: false,
      users: [],
      messages: [],
      queries: []
    };
    this.verifyUser = this.verifyUser.bind(this);
    this.castVote = this.castVote.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.socket = io("http://localhost:8080");
    this.socket.on("receive_message", data => this.addMessage(data));
    this.socket.on("receive_user", data => this.addUser(data));
    this.socket.on("receive_id", data => this.addSocketID(data));
    this.socket.on("disconnect_user", data => this.disconnectUser(data));
    this.socket.on('receive_vote', data => this.addVote(data));
    this.socket.on('receive_query', data => this.addQuery(data));
  }

  componentDidMount() {}

  addSocketID = data => {
    this.setState({ socketID: data });
  };

  addMessage = data => {
    this.setState({ messages: data });
  };

  addUser = data => {
    this.setState({
      users: data
    });
  };

  addQuery = data => {
    this.setState({queries: data});
  }

  addVote = data => {
    this.setState({
      votes: data
    })
  }

  sendQuery = query => {
    this.socket.emit('send_query', query);
  }

  castVote = vote => {
    this.socket.emit('cast_vote', vote);
  }

  verifyUser = name => {
    this.socket.emit("send_user", {
      username: name,
      socket: this.state.socketID
    });
    this.setState({ name, verified: true });
  };

  disconnectUser = data => {
    this.setState({
      users: this.state.users.filter(user => user.socket !== data)
    });
  };

  sendMessage = msg => {
    this.socket.emit("send_message", msg);
  };

  render() {
    return (
      <Container style={{marginTop: 30}}>
        {!this.state.verified && <Splash verifyUser={this.verifyUser} />}
        {this.state.verified && (
          <div>
            <div>
              <h1>ServoChat</h1>
            </div>
            {this.state.streaming && 
            <Segment className="game">
              <VideoPlayer />
              <QueryGame sendQuery={this.sendQuery} queries={this.state.queries} votes={this.state.votes} castVote={this.castVote} user={this.state.name}/>
            </Segment>
            }
            {!this.state.streaming && (
              <Button
                onClick={() => this.setState({ streaming: true })}
                title="Watch the Livestream"
              >
                Watch the Livestream
              </Button>
            )}
            <Segment className="chat">
            <Users users={this.state.users} />
            <Chat
              messages={this.state.messages}
              sendMessage={this.sendMessage}
              name={this.state.name}
            />
            </Segment>
            <div>What would you like to ask our bot?</div>
            <Button onClick={() => {}} color="primary" title="Tip the Robot.">
              Tip the Robot.
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default Main;
