const admin = require("../firebase");
const router = require("express").Router();
let User = require("../models/user.model");
let Note = require("../models/note.model");

// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error " + err));
// });

router.route("/add").post((req, res) => {
  const { email, uid } = req.body;

  const newUser = new User({ email, uid });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:uid").delete((req, res) => {
  const { uid } = req.params;

  User.findOneAndDelete({ uid: uid })
    .then((user) => {
      Note.deleteMany({ email: user.email })
        .then(() => res.json("User and notes deleted"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
