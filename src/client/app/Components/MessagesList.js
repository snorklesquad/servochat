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
        <div className="comment-group" style={{ padding: "0 1em" }}>
          {this.props.messages.map((message, i) => {
            return (
              <div className="comment" key={i}>
                <div className="chat-comment">
                  <span className="chat-item">
                    {message.img &&
                      <img width={'35px'} style={{textAlign: 'center'}} src={require("../svg/" + message.img)} />
                    }
                  </span>
                  <span style={{'margin-left': '.75em'}} className="chat-item">
                    <strong className="comment-author">{message.username}</strong>
                    <br />
                    {message.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MessageList;
