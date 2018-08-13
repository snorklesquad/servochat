import React, { Component } from "react";
import io from "socket.io-client";
import Splash from "./Splash";
import Chat from './Chat';
import VideoPlayer from './VideoPlayer';
import Users from './Users';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      verified: false,
      streaming: false,
      users: [],
      messages: []
    };
    this.socket = io("http://localhost:8080");
    this.socket.on("receive_message", data => this.addMessage(data));
    this.socket.on("receive_user", data => this.addUser(data));
    this.socket.on("receive_id", data => this.addSocketID(data));
    this.socket.on("disconnect_user", data => this.disconnectUser(data));
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

  verifyUser = e => {
    e.preventDefault();
    this.socket.emit("send_user", {
      username: this.state.name,
      socket: this.state.socketID
    });
    this.setState({ verified: true });
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
      <div>
        {!this.state.verified && (
          <div>
            <Splash />
            <form onSubmit={this.verifyUser}>
              <label>
                <input
                  type="text"
                  placeholder="Enter a name here"
                  name="name"
                  onChange={e => this.setState({ name: e.target.value })}
                  value={this.state.name}
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )}
        {this.state.verified && (
          <div>
            {this.state.streaming && 
            <VideoPlayer />
            }
            <Chat
              messages={this.state.messages}
              sendMessage={this.sendMessage}
              name={this.state.name}
            />
            <Users users={this.state.users} />
            <div>What would you like to ask our bot?</div>
            <button onClick={() => {}} title="Tip the Robot." />
          </div>
        )}
      </div>
    );
  }
}
