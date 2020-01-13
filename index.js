const express = require("express");
const port = process.env.PORT || 8000; // means: whatever is in the environment variable PORT, or 8000 if there's nothing there.//
const server = express();
const db = require("./data/db.js");

server.use(express.json()); // middelware that allows express to parse JSON //

// server.listen(8000, () => console.log("API running on port 8000"));

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log("error on GET", error);
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log("error on GET by id", error);
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(removed => {
      if (!removed) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "User has been deleted" });
      }
    })
    .catch(error => {
      console.log("error on DELETE", error);
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, bio } = req.body;
  const user = { name, bio };
  db.update(id, user)
    .then(edit => {
      if (!id) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else if (!name || !bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(200).json(edit);
      }
    })
    .catch(error => {
      console.log("error on PUT", error);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be modified." });
    });
});

// server.get("/", (req, res) => {
//   res.send({ api: "up and running..." });
// });

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };

  if (name && bio) {
    db.insert(newUser)
      .then(addedUser => {
        res.json(addedUser);
        res.status(201);
      })
      .catch(error => {
        res.render(error);
        res.render.status(500).json({
          errorMessage: "There was an error while saving the user to the database"
        });
      });
  } else {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }
});


server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  const newUser = { name, bio };

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    db.insert(newUser)
    .then(addedUser => {
      res.json(addedUser);
      res.status(201);
    })
    .catch(error => {
      res.render(error);
      res.render.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
  }
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});



