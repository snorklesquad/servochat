import React from "react";

const MessageList = props => (
  <div>
    {props.messages.map((message, i) => {
      return (
        <div key={i}>
          <div>{message.username}</div>
          <div>{message.text}</div>
        </div>
      );
    })}
  </div>
);

export default MessageList;
