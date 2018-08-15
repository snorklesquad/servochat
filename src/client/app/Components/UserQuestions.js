import React, { Component } from "react";

import {Header, Item, Button, Icon} from 'semantic-ui-react'

export default class UserQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header style={{ textAlign: "center" }}>Questions for Tony</Header>
        {!this.props.queries.length && (
          <div>
            No questions have been asked yet. Feel free to submit a question for
            Tony in the form below!
          </div>
        )}
        <Item.Group>
          {this.props.queries &&
            this.props.queries.map((q, i) => (
              <Item key={i}>
                <Item.Content verticalAlign="middle">
                  <strong>{q.question}</strong>
                  <Button
                    color="red"
                    floated="right"
                    as="div"
                    labelPosition="right"
                  >
                    <Button
                      onClick={() => this.props.castVote({ q, i })}
                      color="red"
                      icon
                    >
                      <Icon name="heart" />
                      Vote
                    </Button>
                  </Button>

                  <Item.Extra>Asked by {q.user}</Item.Extra>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </div>
    );
  }
}
