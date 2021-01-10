import React, { useContext, useRef, useState } from "react";
import { NotesContext } from "../notes/NotesProvider";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../contexts/AuthContext";

import { Button, Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const colors = ["Blue", "Orange", "Green", "Yellow", "Pink"];

function AddNoteForm({ onClose }) {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const [color, setColor] = useState("Blue");

  const classes = useStyles();

  const [, setNotes] = useContext(NotesContext);
  const { currentUser } = useAuth();

  const handleColorChange = (e) => setColor(e.target.value);

  function addNote(e) {
    const note = {
      email: currentUser.email,
      title: titleRef.current.value,
      content: contentRef.current.value,
      color: color,
      id: uuidv4(),
    };

    setNotes((prevNotes) => [note, ...prevNotes]);

    axios
      .post("http://10.0.0.135:5000/notes", note)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  function handleSubmit() {
    handleAddNote();
  }

  function handleAddNote() {
    addNote();
    onClose();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          color="primary"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Title"
          name="email"
          autoComplete="email"
          autoFocus
          inputRef={titleRef}
        />
        <TextField
          variant="outlined"
          color="primary"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Content"
          name="email"
          autoComplete="email"
          autoFocus
          multiline={true}
          rows={12}
          inputRef={contentRef}
        />
        <TextField
          margin="normal"
          select
          fullWidth
          label="Color"
          value={color}
          onChange={handleColorChange}
          variant="outlined"
        >
          {colors.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          className={classes.submit}
          fullWidth
        >
          Add note
        </Button>
      </form>
    </Container>
  );
}

export default AddNoteForm;
