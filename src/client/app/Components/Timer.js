import React, { Component } from "react";
import {Button, Header} from 'semantic-ui-react';
export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 3,
      timerDisplay: false
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  componentDidMount() {
    this.resetTimer();
  }

  startTimer() {
    if (this.timer == 0) {
      this.setState({ timerDisplay: true });
      this.timer = setInterval(this.countdown, 1000);
    }
  }

  resetTimer() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  countdown() {
    if (this.state.seconds > 0) {
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds
      });
    } else if (this.state.seconds <= 0) {
      this.props.tallyVotes();
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({ seconds: 3, timerDisplay: false }, () =>
        this.resetTimer()
      );
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.props.auth &&
          <Button onClick={this.startTimer}>Start Timer</Button>        
        }
        
        {this.state.timerDisplay && (
          <Header>
            Time remaining this round: {this.state.time.s} seconds
          </Header>
        )}
      </div>
    );
  }
}
