import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Portal from "@material-ui/core/Portal";
import axios from "axios";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    marginBottom: "3%"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginTop: 10,
    marginBottom: 12
  },
  root: {
    "& > *": {
      margin: "auto",
      width: 200,
      display: "flex"
    }
  }
});

export default function UserCard(props) {
  const initialState = {
    id: props.users.id,
    name: "",
    bio: ""
  };
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const [edit, setEdit] = useState(initialState);
  const container = React.useRef(null);

  const onSubmit = () => {
    axios
      .put(`http://localhost:8000/api/users/${props.users.id}`, edit)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const handleEdit = () => {
    setShow(!show);
  };

  const changeHandler = e => {
    e.preventDefault();
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    });
  };

  const deleteUser = id => {
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteHandler = () => {
    deleteUser(props.users.id);
    window.location.reload(false);
  };
  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.users.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {props.users.bio}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleEdit}>
            Edit User
          </Button>
          {show ? (
            <Portal container={container.current}>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  id="name"
                  name="name"
                  label="User Name"
                  variant="outlined"
                  value={edit.name}
                  onChange={changeHandler}
                />
                <TextField
                  id="bio"
                  name="bio"
                  label="User Bio"
                  variant="outlined"
                  value={edit.bio}
                  onChange={changeHandler}
                />
                <div className="btns">
                  <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                  >
                    Cancel
                  </Button>
                  <Button onClick={onSubmit} type="submit" variant="contained">
                    Edit User
                  </Button>
                </div>
              </form>
            </Portal>
          ) : null}
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={deleteHandler}
          >
            Delete User
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
