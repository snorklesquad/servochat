import React, { Component } from "react";
import {Button, Header} from 'semantic-ui-react';
export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.time > 0 && (
          <Header>
            Time remaining this round: {this.props.time} seconds
          </Header>
        )}
      </div>
    );
  }
}
