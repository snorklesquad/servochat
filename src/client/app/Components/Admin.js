import React, { Component } from "react";
import { Form, Input, Button, Container } from "semantic-ui-react";

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/auth', {
      method: "POST",
      body: JSON.stringify({pass: this.state.password}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => { 
      if (res.result) { 
        this.props.handleAuth(); 
        this.props.history.push('/');
      } 
    });
  }

  render() {
    return (
      <Container style={{marginTop: '2em'}}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>
              Are you the robot? Enter the secret password below.
              <Input
                type="password"
                placeholder="Enter the secret password here"
                onChange={e => this.setState({ password: e.target.value })}
                value={this.state.password}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <Button fluid type="submit" value="Submit" primary>
              Submit
            </Button>
          </Form.Field>
        </Form>
      </Container>
    );
  }
}
