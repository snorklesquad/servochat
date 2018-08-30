import React from "react";
import { Header, Segment, Container, Image } from "semantic-ui-react";

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="users">
        <Header className="section-header" style={{ textAlign: "center" }}>
          Users Online: {this.props.users.length}
        </Header>
        <div style={{'margin-left': '1em'}}>
          {this.props.users.map((user, i) => {
            return (
              <div style={{ margin: ".8em auto" }} key={i}>
                <span>
                  <img
                    src={require("../svg/" + user.img)}
                    width={"30px"}
                    height={"30px"}
                  />
                </span>
                <span style={{ fontSize: "1.2em", marginLeft: "15px" }}>
                  {user.username}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// const Users = props => (
//   <div className="users">
//     <Header className="section-header" style={{ textAlign: "center" }}>
//       Users Online: {props.users.length}
//     </Header>
//     {props.users.map((user, i) => {
//       return (
//         <div style={{ margin: ".75em auto" }} key={i}>
//           <span>
//             <img
//               src={require("../svg/robot-10.svg")}
//               width={"30px"}
//               height={"30px"}
//             />
//           </span>
//           <span style={{ fontSize: "1.1em", marginLeft: "10px" }}>
//             {user.username}
//           </span>
//         </div>
//       );
//     })}
//   </div>
// );

export default Users;
