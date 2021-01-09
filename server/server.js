const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5000 || process.env.PORT;

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(port, (req, res) => {
  console.log("Hello world!");
});
