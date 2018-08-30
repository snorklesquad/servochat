import React, { Component } from "react";
import { Form, Item, Icon, Input, Button } from "semantic-ui-react";
import Timer from "./Timer";
import UserQuestions from "./UserQuestions";
import VoteResults from "./VoteResults";

export default class QueryGame extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      questions: []
    };
    this.castVote = this.castVote.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  sendQuery(e) {
    e.preventDefault();
    if (this.props.queries.length <= 5 && this.state.message.length > 4) {
      this.props.sendQuery({
        question: this.state.message,
        user: this.props.user
      });
      this.setState({ questionAsked: true, message: "" });
    }
  }

  castVote(vote) {
    this.props.castVote(vote);
  }

  render() {
    return (
      <div style={{ "padding-left": "2em", "padding-right": "2em" }}>
        <div style={{ marginTop: ".75em" }}>
          {this.props.winningVote && (
            <div>
              <Item>
                <Item.Content>
                  <div
                    style={{
                      fontSize: "1.5em",
                      textAlign: "center",
                      margin: "0.5em auto"
                    }}
                  >
                    The winning question was:
                  </div>
                  <Item.Description style={{ margin: "1.5em auto" }}>
                    <p
                      style={{
                        fontSize: "1.5em",
                        textAlign: "center",
                        paddingTop: "1.5em"
                      }}
                    >
                      <strong>{this.props.winningVote.question}</strong>
                    </p>
                    <p style={{ textAlign: "center" }}>
                      Asked by {this.props.winningVote.user}
                      <span>
                        <Icon
                          name="heart"
                          style={{ marginLeft: "1em" }}
                          color="red"
                        />
                        {this.props.winningVote.count}
                      </span>
                    </p>
                  </Item.Description>
                </Item.Content>
              </Item>
            </div>
          )}

          {!this.props.winningVote &&
            !this.props.voteCast && (
              <UserQuestions
                castVote={this.castVote}
                queries={this.props.queries}
              />
            )}

          {this.props.voteCast &&
            this.props.queries.length > 0 &&
            !this.props.winningVote && <VoteResults votes={this.props.votes} />}
        </div>

        {this.props.queries.length <= 5 &&
          !this.props.voteCast &&
          !this.props.questionAsked && (
            <div>
              <div style={{ textAlign: "center", fontSize: '1.1em' }}>
                What would you like to ask our bot?
              </div>
              <Form
                className="send-message-form"
                onSubmit={this.sendQuery}
                style={{ marginTop: ".7em", margin: ".4em auto" }}
              >
                <label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Type your question and press enter..."
                    name="message"
                    onChange={e => this.setState({ message: e.target.value })}
                    value={this.state.message}
                  />
                </label>
                <Button type="submit" value="Submit">
                  Submit
                </Button>
              </Form>
            </div>
          )}

        <Timer
          time={this.props.time}
          auth={this.props.auth}
          tallyVotes={this.props.tallyVotes}
        />
      </div>
    );
  }
}
