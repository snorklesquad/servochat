import React from "react";

const Users = props => (
  <div>
    <div>Users Online: {props.users.length}</div>
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
