const admin = require("../firebase");
const router = require("express").Router();
let Note = require("../models/note.model");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("error " + err));
});

router.route("/:idToken").get(async (req, res) => {
  const idToken = req.params.idToken;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(async (decodedToken) => {
      const uid = decodedToken.uid;
      const user = await User.findOne({ uid: uid });

      console.log(`
        USER: ${user}
        UID: ${uid}
      `);

      Note.find({ email: user.email })
        .then((notes) => {
          res.json(notes);
        })
        .catch((err) => res.status(400).json("error " + err));
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
});

router.route("/").post((req, res) => {
  const { email, title, content, color, id } = req.body;

  const newNote = new Note({
    email,
    title,
    content,
    color,
    id,
  });

  newNote
    .save()
    .then(() => res.json("Note added!"))
    .catch((err) => res.status(400).json("error: " + err));
});

router.route("/:id").patch((req, res) => {
  Note.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { upsert: true },
    (err, docs) => {
      if (err) {
        res.status(400).send("Error: " + err);
      } else {
        res.send(req.body.title);
      }
    }
  );
});

router.route("/:id").delete((req, res) => {
  Note.findOneAndDelete({ id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json("Note deleted " + docs);
    }
  });
});

module.exports = router;
