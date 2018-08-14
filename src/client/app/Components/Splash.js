import React from "react";
import { Header, Modal, Form, Input, Button } from "semantic-ui-react";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.verifyUser(this.state.name);
  }

  render() {
    return (
      <div>
        <Modal centered={false} size="tiny" open={!this.props.verified}>
          <Modal.Header>
            Welcome to Servo Chat! 
            <div>What would you like your nickname to be?</div>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label>
                    <Input
                      type="text"
                      placeholder="Enter your name here"
                      name="name"
                      onChange={e => this.setState({ name: e.target.value })}
                      value={this.state.name}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <Button fluid type="submit" value="Submit">
                    Submit
                  </Button>
                </Form.Field>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}


