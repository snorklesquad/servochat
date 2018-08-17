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
import VoteResults from './VoteResults';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class QueryGame extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      questions: [],
      questionAsked: false,
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
  }

  render() {
    const votesArray = Object.values(this.props.votes);
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
                      <strong >{this.props.winningVote.question}</strong>
                    </p>
                    <p style={{textAlign: 'center'}}>Asked by {this.props.winningVote.user}
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

          {/* {this.props.voteCast && this.props.queries.length > 0 && 
            !this.props.winningVote && (
              //show number of votes here
              <div>
                <Header style={{ textAlign: "center" }}>Vote Results</Header>
                <Item.Group>
                  {this.props.votes &&
                    Object.keys(this.props.votes).map((key, i) => (
                      <Item key={i}>
                      <Item.Content>
                        <strong>{this.props.votes[key].q.question}</strong>
                        <span style={{ float: "right" }}>
                          <Icon name="heart" color="red" />
                          {this.props.votes[key].count}
                        </span>
                        <Item.Extra>
                          Asked by {this.props.votes[key].q.user}
                        </Item.Extra>
                      </Item.Content>
                      </Item>
                    ))}
                </Item.Group>
              </div>
            )} */}
            {this.props.voteCast && this.props.queries.length > 0 && 
            !this.props.winningVote && (
              <VoteResults votes={this.props.votes} />
            )
            }
        </div>

        {this.props.queries.length <= 7 &&
          !this.props.voteCast && (
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

        <Timer time={this.props.time} auth={this.props.auth} tallyVotes={this.props.tallyVotes} />

      </div>
    );
  }
}
