import React from "react";
import { Comment, Container } from "semantic-ui-react";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    return (
      <div
        className="room"
        ref={div => {
          this.messageList = div;
        }}
      >
        <Comment.Group style={{ padding: "0 1em" }}>
          {this.props.messages.map((message, i) => {
            return (
              <Comment key={i}>
                <Comment.Content>
                  <Comment.Author>{message.username}</Comment.Author>
                  <Comment.Text>{message.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            );
          })}
        </Comment.Group>
      </div>
    );
  }
}

export default MessageList;
