import React from "react";
import { Header, Modal, Form, Input, Button } from "semantic-ui-react";
import AvatarPicker from "./AvatarPicker";

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameSubmitted: false,
      img: "robot-1.svg"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatarSelect = this.handleAvatarSelect.bind(this);
    this.handleAvatarSubmit = this.handleAvatarSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name) {
      this.setState({ nameSubmitted: true });
    }
  }

  handleAvatarSelect(img) {
    this.setState({ img });
  }

  handleAvatarSubmit() {
    if (this.state.name) {
      this.props.verifyUser(this.state.name, this.state.img);
    }
  }

  render() {
    return (
      <div className="splash-outer">
        {!this.state.nameSubmitted && (
          <div className="splash-inner">
            <div>
              <h1 className="splash-header">ServoChat</h1>
              <div className="splash-form">
                <div style={{ textAlign: "center", fontSize: '1.3em', marginBottom: 10, color: '#98C379' }}>
                  Welcome! What would you like your nickname to be?
                </div>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>
                      <Input
                        type="text"
                        placeholder="Enter your nickname here"
                        name="name"
                        onChange={e => this.setState({ name: e.target.value })}
                        value={this.state.name}
                      />
                    </label>
                  </Form.Field>
                  <Form.Field>
                    <Button fluid type="submit" inverted value="Submit">
                      Submit
                    </Button>
                  </Form.Field>
                </Form>
              </div>
            </div>
          </div>
        )}
        {this.state.nameSubmitted && this.state.name && (
          <AvatarPicker
            handleAvatarSelect={this.handleAvatarSelect}
            handleAvatarSubmit={this.handleAvatarSubmit}
          />
        )}
      </div>
    );
  }
}

const styles = {
  header: {}
};
