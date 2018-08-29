import React, { Component } from "react";

import { Header, Item, Button, Icon } from "semantic-ui-react";

export default class UserQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{ padding: "0 1em" }}>
        <Header className="section-header" style={{ textAlign: "center" }}>Questions for Tony</Header>
        {!this.props.queries.length && (
          <div style={{ textAlign: "center" }}>
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
                      style={{backgroundColor: 'rgb(241, 97, 109)', color: 'white'}}
                      icon
                    >
                      <Icon name="heart" />
                      Vote
                    </Button>
                  </Button>

                  <Item.Extra style={{color: 'rgba(156, 156, 156, 0.9)'}}>Asked by {q.user}</Item.Extra>
                </Item.Content>
              </Item>
            ))}
        </Item.Group>
      </div>
    );
  }
}
