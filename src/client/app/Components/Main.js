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
      img: "",
      verified: false,
      streaming: true,
      users: [],
      messages: [],
      queries: [],
      votes: [],
      winningVote: null,
      voteCast: false,
      questionAsked: false
    };
    this.verifyUser = this.verifyUser.bind(this);
    this.castVote = this.castVote.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.socket = io({
      transports: ['websocket'], 
      upgrade: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 99999
    });
    this.socket.on("receive_message", data => this.addMessage(data));
    this.socket.on("receive_user", data => this.addUser(data));
    this.socket.on("receive_id", data => this.addSocketID(data));
    this.socket.on("disconnect_user", data => this.disconnectUser(data));
    this.socket.on('receive_vote', data => this.addVote(data));
    this.socket.on('receive_query', data => this.addQuery(data));
    this.socket.on('winning_query', data => this.addWinner(data));
    this.socket.on('receive_time', data => this.setTime(data));
    this.socket.on('game_reset', data => this.setState({voteCast: false, questionAsked: false}));
  }

  componentDidMount() {
    if (this.props.auth) {
      this.verifyUser('tony_bot', 'robot-10.svg');
    }
  }

  addSocketID = data => { this.setState({ socketID: data }); };

  addMessage = data => { this.setState({ messages: data }); };

  addUser = data => { this.setState({ users: data }); };

  addQuery = data => { this.setState({queries: data}); };

  addVote = data => { this.setState({ votes: data }); };

  addWinner = data => { this.setState({ winningVote: data }); };

  setTime = time => { this.setState({ time }); };

  castVote = vote => { 
    this.socket.emit('cast_vote', vote);
    this.setState({voteCast: true}); 
  };

  tallyVotes = data => { this.socket.emit('tally_votes'); };

  resetGame = data => { this.socket.emit('reset_game'); };

  sendQuery = query => { 
    this.socket.emit('send_query', query);
    this.setState({questionAsked: true}) 
  };

  startTimer = time => { this.socket.emit('start_timer'); };

  sendMessage = msg => { this.socket.emit("send_message", msg); };

  verifyUser = (name, img) => {
    this.socket.emit("send_user", {
      username: name,
      socket: this.state.socketID,
      img
    });
    this.setState({ name, img, verified: true });
  };

  disconnectUser = data => { this.setState({ users: data }); };

  render() {
    return (
      <div className="main-container">
        {this.props.auth &&
          <Menu>
            <Button onClick={this.startTimer} basic primary>Start Timer</Button>        
            <Button onClick={this.resetGame} basic primary>
              Reset the Game.
            </Button>
          </Menu>
        }
        <div className="container">
          {!this.state.verified && <Splash verifyUser={this.verifyUser} />}
          {this.state.verified && (
            <div>
              {/* <div>
                <h1 className="top-title">ServoChat</h1>
              </div> */}
              {this.state.streaming &&
                <Segment className="game query-game">
                  <VideoPlayer />
                  <QueryGame questionAsked={this.state.questionAsked} voteCast={this.state.voteCast} time={this.state.time} auth={this.props.auth} winningVote={this.state.winningVote} tallyVotes={this.tallyVotes} sendQuery={this.sendQuery} queries={this.state.queries} votes={this.state.votes} castVote={this.castVote} user={this.state.name} />
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
              <Segment className="chat query-game">
                <Users users={this.state.users} />
                <Chat
                  messages={this.state.messages}
                  sendMessage={this.sendMessage}
                  name={this.state.name}
                  img={this.state.img}
                />
              </Segment>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
