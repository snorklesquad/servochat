import React, { Component } from "react";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
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

  handleSuccess = () => {
    console.log('yes!')
  };

  handleError = () => {};

  render() {
    return (
      <div>
        <div>Live Stream</div>
        {/* <Video
          source={{ uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" }} // Can be a URL or a local file.
          ref={ref => {
            this.player = ref;
          }} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onEnd={this.onEnd} // Callback when playback finishes
          onError={this.videoError} // Callback when video cannot be loaded
        /> */}
      </div>
    );
  }
}