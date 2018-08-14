import React from "react";
import {Header, Segment, Container} from 'semantic-ui-react';

const Users = props => (
  <div className="users">
    <Header style={{textAlign: 'center'}}>Users Online: {props.users.length}</Header>
    {props.users.map((user, i) => {
      return (
        <div key={i}>
          <div>{user.username}</div>
        </div>
      );
    })}
  </div>
);

export default Users;
