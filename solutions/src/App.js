import React from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserList />
      <AddUser />
    </div>
  );
}

export default App;
