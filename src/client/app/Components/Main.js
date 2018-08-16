import React, { Component } from "react";
import io from "socket.io-client";
import { Button, Container, Segment, Menu } from "semantic-ui-react";
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
      queries: [],
      votes: [],
      winningVote: null
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
    this.socket.on('winning_query', data => this.addWinner(data));
  }

  componentDidMount() {
    if (this.props.auth) {
      this.verifyUser('tony_bot');
    }
  }

  addSocketID = data => { this.setState({ socketID: data }); };

  addMessage = data => { this.setState({ messages: data }); };

  addUser = data => { this.setState({ users: data }); };

  addQuery = data => { this.setState({queries: data}); };

  addVote = data => { this.setState({ votes: data }); };

  addWinner = data => { this.setState({ winningVote: data }); };

  sendQuery = query => { this.socket.emit('send_query', query); };

  castVote = vote => { this.socket.emit('cast_vote', vote); };

  tallyVotes = data => { this.socket.emit('tally_votes'); };

  resetGame = data => { this.socket.emit('reset_game'); };

  sendMessage = msg => { this.socket.emit("send_message", msg); };

  verifyUser = name => {
    this.socket.emit("send_user", {
      username: name,
      socket: this.state.socketID
    });
    this.setState({ name, verified: true });
  };

  disconnectUser = data => { this.setState({ users: data }); };

  render() {
    return (
      <div>
        {this.props.auth &&
          <Menu>
            <Button onClick={this.resetGame} basic primary>
              Reset the Game.
            </Button>
          </Menu>
        }
        <Container style={{ marginTop: 30 }}>
          {!this.state.verified && <Splash verifyUser={this.verifyUser} />}
          {this.state.verified && (
            <div>
              <div>
                <h1>ServoChat</h1>
              </div>
              {this.state.streaming &&
                <Segment className="game">
                  <VideoPlayer />
                  <QueryGame auth={this.props.auth} winningVote={this.state.winningVote} tallyVotes={this.tallyVotes} sendQuery={this.sendQuery} queries={this.state.queries} votes={this.state.votes} castVote={this.castVote} user={this.state.name} />
                </Segment>
              }
              {!this.state.streaming && (
                <div
                  style={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => this.setState({ streaming: true })}
                    title="Watch the Livestream"
                    primary
                    size="big"
                  >
                    Join the Game
                  </Button>
                </div>
              )}
              <Segment className="chat">
                <Users users={this.state.users} />
                <Chat
                  messages={this.state.messages}
                  sendMessage={this.sendMessage}
                  name={this.state.name}
                />
              </Segment>
              <div style={{ textAlign: 'right' }}>
                <Button onClick={() => { }} basic primary title="Tip the Robot.">
                  Tip the Robot.
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default Main;
