import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: "0 auto",
      width: 300,
      display: "flex",
      marginBottom: "3%"
    }
  }
}));

const AddUser = () => {
  const classes = useStyles();
  const [newUser, setUser] = useState({ name: "", bio: "" });

  const changeHandler = e => {
    e.preventDefault();
    setUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };
  const addUser = user => {
    axios
      .post("http://localhost:8000/api/users", user)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const submitHandler = e => {
    addUser(newUser);
    setUser({ name: "", bio: "" });
  };

  return (
    <>
      <form
        onSubmit={submitHandler}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        {" "}
        <label>
          <h1>New User Form</h1>
        </label>
        <TextField
          id="name"
          name="name"
          label="User Name"
          variant="outlined"
          value={newUser.name}
          onChange={changeHandler}
        />
        <TextField
          id="bio"
          name="bio"
          label="User Bio"
          variant="outlined"
          value={newUser.bio}
          onChange={changeHandler}
        />
        <Button type="submit" variant="contained" color="primary">
          Add User
        </Button>
      </form>
    </>
  );
};

export default AddUser;
