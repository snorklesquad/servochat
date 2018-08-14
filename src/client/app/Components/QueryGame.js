import React, { Component } from "react";
import {
  Header,
  Form,
  Item,
  Icon,
  Input,
  Button,
  Segment,
  Label
} from "semantic-ui-react";

export default class QueryGame extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      questions: [],
      questionAsked: false,
      voteCast: false
    };
    this.castVote = this.castVote.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  sendQuery(e) {
    e.preventDefault();
    if (this.props.queries.length <= 7 && this.state.message.length > 4) {
      this.props.sendQuery({
        question: this.state.message,
        user: this.props.user
      });
      this.setState({ message: "" });
    }
  }

  castVote(blob) {
    this.props.castVote(blob);
  }

  render() {
    return (
      <div>
        <Segment>
          {!this.state.voteCast && (
            <div>
              <Header style={{ textAlign: "center" }}>
                Questions for Tony
              </Header>
              {!this.props.queries.length && (
                <div>
                  No questions have been asked yet. Feel free to submit a
                  question for Tony in the form below!
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
                            onClick={() =>
                              this.setState({ voteCast: true }, () =>
                                this.castVote({ q, i })
                              )
                            }
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
          )}

          {this.state.voteCast && (
            //show number of votes here
            <div>
              <Header style={{ textAlign: "center" }}>Vote Results</Header>
              <Item.Group>
                {this.props.votes &&
                  Object.keys(this.props.votes).map((key, i) => (
                    <Item.Content key={i}>
                      <strong>{this.props.votes[key].q.question}</strong>
                      <span style={{ float: "right" }}>
                      <Icon name="heart" />{this.props.votes[key].count}
                      </span>
                    </Item.Content>
                  ))}
              </Item.Group>
            </div>
          )}
        </Segment>

        {this.props.queries.length <= 7 && !this.state.voteCast && (
          <Form onSubmit={this.sendQuery}>
            <label>
              What would you like to ask our bot?
              <Input
                fluid
                type="text"
                placeholder="Type your message and click enter.."
                name="message"
                onChange={e => this.setState({ message: e.target.value })}
                value={this.state.message}
              />
            </label>
          </Form>
        )}
      </div>
    );
  }
}
