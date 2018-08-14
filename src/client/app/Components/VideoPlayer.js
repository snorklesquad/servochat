import React, { Component } from "react";
import {Container, Segment, Header} from 'semantic-ui-react';
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.constraints = {
      audio: false,
      video: true
    };
  }
  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia(this.constraints)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  handleSuccess = (stream) => {
    const videoTracks = stream.getVideoTracks();
    window.stream = stream; // make variable available to browser console
    this.video.srcObject = stream;
  };

  handleError = (error) => {
    console.log(error)
  };

  render() {
    return (
      <div>
        <Header style={{textAlign: 'center'}}>Live Stream</Header>
        <Container fluid>
        <video
          ref={(video) => { this.video = video; }}
          autoPlay
          playsInline
          style={{
            padding: '1em',
            borderRadius: 8
          }}
        ></video>
        </Container>
      </div>
    );
  }
}