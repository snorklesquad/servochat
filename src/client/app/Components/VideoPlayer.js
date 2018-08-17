import React, { Component } from "react";
import {
  Container,
  Icon,
} from "semantic-ui-react";
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyStreaming: false
    };
    this.constraints = {
      audio: false,
      video: true
    };
  }
  componentDidMount() {
    // navigator.mediaDevices
    //   .getUserMedia(this.constraints)
    //   .then(this.handleSuccess)
    //   .catch(this.handleError);
  }

  handleSuccess = stream => {
    const videoTracks = stream.getVideoTracks();
    window.stream = stream;
    this.video.srcObject = stream;
  };

  handleError = error => {
    console.log(error);
  };

  render() {
    return (
      <div>
        {/* <Header textAlign="center">Live Stream</Header> */}
        <Container fluid>
          {!this.state.currentlyStreaming && (
            <div>
              <div style={{ textAlign: "center", marginTop: 40 }}>
                <Icon loading name="spinner" size="big" />
              </div>
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <strong>Broadcast will begin shortly...</strong>
              </div>
            </div>
          )}
          {this.state.currentlyStreaming && (
            <video
              ref={video => {
                this.video = video;
              }}
              autoPlay
              playsInline
              style={{
                padding: "1em",
                borderRadius: 8
              }}
            />
          )}
        </Container>
      </div>
    );
  }
}
