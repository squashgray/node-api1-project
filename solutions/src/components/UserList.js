import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="userlist">
      <h1>User List</h1>
      {users.map(user => (
        <UserCard key={user.id} users={user} setUsers={setUsers} />
      ))}
    </div>
  );
};

export default UserList;
