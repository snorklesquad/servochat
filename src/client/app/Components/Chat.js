import React, { Component } from "react";
import {
  Button,
  Container,
  Segment,
  Input,
  Comment,
  Header,
  Form
} from "semantic-ui-react";
import MessagesList from "./MessagesList";
import SendMessageForm from "./SendMessageForm";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(message) {
    this.props.sendMessage(message);
  }

  render() {
    return (
      <div className="room">
        <Header style={{textAlign: 'center'}}>Chatroom</Header>
        <MessagesList messages={this.props.messages} />
        <SendMessageForm user={this.props.name} submit={this.postMessage} />
      </div>
    );
  }
}
