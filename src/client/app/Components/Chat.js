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
      <div >
        <Header className="section-header" style={{textAlign: 'center', 'margin-top': '5px', 'margin-bottom': 0}}>Chatroom</Header>
        <MessagesList messages={this.props.messages} />
        <SendMessageForm user={this.props.name} img={this.props.img} submit={this.postMessage} />
      </div>
    );
  }
}
