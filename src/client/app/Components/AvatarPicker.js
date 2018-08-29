import React from "react";
import { Header, Modal, Form, Input, Button } from "semantic-ui-react";

export default class AvatarPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "robot-1.svg"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleAvatarSubmit();
  }

  handleChange(event) {
    this.setState({
      img: event.target.value
    });
    this.props.handleAvatarSelect(event.target.value);
  }

  render() {
    return (
      <div className="avatar-picker-component">
        <h1 style={{fontSize: '2em', textAlign: 'center', margin: '1em', marginTop: '3em'}}>Choose Your Bot</h1>
        <form style={{textAlign: 'center'}} onSubmit={this.handleSubmit}>
          <div className="avatar-picker">
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-1.svg"
                checked={this.state.img === "robot-1.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-1.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-2.svg"
                checked={this.state.img === "robot-2.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-2.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-3.svg"
                checked={this.state.img === "robot-3.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-3.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-4.svg"
                checked={this.state.img === "robot-4.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-4.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-5.svg"
                checked={this.state.img === "robot-5.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-5.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-6.svg"
                checked={this.state.img === "robot-6.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-6.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-7.svg"
                checked={this.state.img === "robot-7.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-7.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-8.svg"
                checked={this.state.img === "robot-8.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-8.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-9.svg"
                checked={this.state.img === "robot-9.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-9.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-10.svg"
                checked={this.state.img === "robot-10.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-10.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-11.svg"
                checked={this.state.img === "robot-11.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-11.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-12.svg"
                checked={this.state.img === "robot-12.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-12.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-13.svg"
                checked={this.state.img === "robot-13.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-13.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-14.svg"
                checked={this.state.img === "robot-14.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-14.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-15.svg"
                checked={this.state.img === "robot-15.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-15.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-16.svg"
                checked={this.state.img === "robot-16.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-16.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-17.svg"
                checked={this.state.img === "robot-17.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-17.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-18.svg"
                checked={this.state.img === "robot-18.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-18.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-19.svg"
                checked={this.state.img === "robot-19.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-19.svg")} />
            </label>
            <label className="avatar-item">
              <input
                type="radio"
                value="robot-20.svg"
                checked={this.state.img === "robot-20.svg"}
                onChange={this.handleChange}
              />
              <img src={require("../svg/robot-20.svg")} />
            </label>
          </div>
          <Button type="submit" style={{marginTop: 50}} inverted value="Submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

// const AvatarPicker = props => (
//   <div className="avatar-picker">
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-1.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-2.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-3.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-4.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-5.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-6.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-7.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-8.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-9.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-10.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-11.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-12.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-13.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-14.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-15.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-16.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-17.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-18.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-19.svg")} />
//     </label>
//     <label>
//       <input type="radio" name="fb" value="small" />
//       <img src={require("../svg/robot-20.svg")} />
//     </label>
//   </div>
// );

// export default AvatarPicker;
