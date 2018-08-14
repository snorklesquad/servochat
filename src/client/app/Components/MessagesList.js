import React from "react";
import {Comment, Container} from 'semantic-ui-react';

const MessageList = props => (
  <Comment.Group>
    {props.messages.map((message, i) => {
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
);

export default MessageList;
