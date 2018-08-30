import React, { Component } from "react";
import { Container, Icon } from "semantic-ui-react";
export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyStreaming: true
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
      <div className="video-player">
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
            <div style={{textAlign: 'center'}}>
              {/* <video
              ref={video => {
                this.video = video;
              }}
              autoPlay
              playsInline
              style={{
                padding: "1em",
                borderRadius: 8
              }}
            /> */}
              <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                src="https://youtube.com/embed/Ea-Xb30Ekh4"
                frameBorder="0"
              />
              
            </div>
          )}

        </Container>
      </div>
    );
  }
}
