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
import Timer from "./Timer";
import UserQuestions from "./UserQuestions";

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

  castVote(vote) {
    this.props.castVote(vote);
    this.setState({ voteCast: true });
  }

  render() {
    return (
      <div>
        <div style={{
          margin: '1rem 0',
          padding: '1em'
        }}>
          {this.props.winningVote && (
            <div>
              <Item>
                <Item.Content>
                  <div style={{fontSize: '1.5em', textAlign: 'center', margin: '0.5em auto'}}>The winning question was:</div>
                  <Item.Description style={{margin: '1.5em auto'}}>
                    <p style={{fontSize: '1.1em', textAlign: 'center', paddingTop: '1.5em'}}>
                      <strong >{this.props.winningVote.q.question}</strong>
                    </p>
                    <p style={{textAlign: 'center'}}>Asked by {this.props.winningVote.q.user}
                    <span>
                        <Icon name="heart" style={{marginLeft: '1em'}} color="red" />
                        {this.props.winningVote.count}
                      </span>
                    </p>
                  </Item.Description>
                </Item.Content>
              </Item>
            </div>
          )}

          {!this.props.winningVote && (
            <UserQuestions
              castVote={this.castVote}
              queries={this.props.queries}
            />
          )}

          {this.state.voteCast &&
            !this.props.winningVote && (
              //show number of votes here
              <div>
                <Header style={{ textAlign: "center" }}>Vote Results</Header>
                <Item.Group>
                  {this.props.votes &&
                    Object.keys(this.props.votes).map((key, i) => (
                      <Item.Content key={i}>
                        <strong>{this.props.votes[key].q.question}</strong>
                        <span style={{ float: "right" }}>
                          <Icon name="heart" color="red" />
                          {this.props.votes[key].count}
                        </span>
                        <Item.Extra>
                          Asked by {this.props.votes[key].q.user}
                        </Item.Extra>
                      </Item.Content>
                    ))}
                </Item.Group>
              </div>
            )}
        </div>

        {this.props.queries.length <= 7 &&
          !this.state.voteCast && (
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

        <Timer auth={this.props.auth} tallyVotes={this.props.tallyVotes} />

      </div>
    );
  }
}
