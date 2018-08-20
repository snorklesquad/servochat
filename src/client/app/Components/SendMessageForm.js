import React, { Component } from "react";
import { Input, Button } from 'semantic-ui-react';
export default class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(e) {
    e.preventDefault();
    if (this.state.message) {
      let messageToPost = {
        username: this.props.user,
        text: this.state.message
      };
      this.props.submit(messageToPost);
      this.setState({ message: "" });
    }
  }

  render() {
    return (
      <form onSubmit={this.postMessage}>
        <label>
          <Input
            fluid
            type="text"
            placeholder="Type your message and click enter.."
            name="message"
            onChange={e => this.setState({ message: e.target.value })}
            value={this.state.message}
          />
        </label>
        {/* <Button type="submit" value="Submit">Submit</Button> */}
      </form>
    );
  }
}
