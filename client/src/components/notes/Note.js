import React, { useContext } from "react";
import { NotesContext } from "./NotesProvider";
import axios from "axios";
import colors from "./colors";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  MenuItem,
  TextField,
  Grid,
} from "@material-ui/core";
import { blue, orange, green, yellow, pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {},
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  blue: {
    backgroundColor: blue.A100,
  },
  orange: {
    backgroundColor: orange.A100,
  },
  green: {
    backgroundColor: green.A100,
  },
  yellow: {
    backgroundColor: yellow.A100,
  },
  pink: {
    backgroundColor: pink.A100,
  },
  titleInput: {
    fontSize: "2rem",
  },
});

function Note({ title, content, color, id }) {
  const [notes, setNotes] = useContext(NotesContext);

  const classes = useStyles();

  function deleteNote(id) {
    deleteNoteInClient(id);

    axios
      .delete(`http://10.0.0.135:5000/notes/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleDeleteNote() {
    deleteNote(id);
  }

  function handleTitleChange(e) {
    changeNoteProperty("title", e.target.value);

    axios
      .patch(`http://10.0.0.135:5000/notes/${id}`, {
        title: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleContentChange(e) {
    changeNoteProperty("content", e.target.value);

    axios
      .patch(`http://localhost:5000/notes/${id}`, {
        content: e.target.value,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleColorChange(e) {
    changeNoteProperty("color", e.target.value);

    axios
      .patch(`http://localhost:5000/notes/${id}`, {
        color: e.target.value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function changeNoteProperty(propertyName, value) {
    const newNotes = notes.slice();
    const newNote = newNotes.find((note) => note.id === id);
    newNote[propertyName] = value;
    setNotes(newNotes);
  }

  function deleteNoteInClient(id) {
    const newNotes = notes.slice();
    const filteredNotes = newNotes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  }

  return (
    <Grid item>
      <Card className={`${classes.root} ${classes[color.toLowerCase()]}`}>
        <CardContent className={classes.cardContent}>
          <TextField
            margin="normal"
            value={title}
            onChange={handleTitleChange}
            variant="outlined"
            className={classes.titleTextField}
            InputProps={{
              className: classes.titleInput,
            }}
          />
          <TextField
            margin="normal"
            multiline={true}
            rows={10}
            value={content}
            onChange={handleContentChange}
            variant="outlined"
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
        </CardContent>
        <CardActions>
          <Button
            style={{ margin: "0 10px", marginBottom: "1rem" }}
            variant="contained"
            onClick={handleDeleteNote}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Note;
