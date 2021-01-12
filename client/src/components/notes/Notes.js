import React, { useContext, useEffect } from "react";
import Note from "./Note";
import { NotesContext } from "./NotesProvider";
import axios from "axios";
import AddNoteBtn from "../addnote/AddNoteBtn";
import { useAuth } from "../../contexts/AuthContext";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

function Notes() {
  const [notes, setNotes] = useContext(NotesContext);
  const { currentUser, idToken } = useAuth();

  const classes = useStyles();

  useEffect(() => {
    async function getNotes() {
      axios.get(`http://10.0.0.135:5000/notes/${idToken}`).then((res) => {
        setNotes(res.data);
      });
    }

    getNotes();
  }, [currentUser, setNotes, idToken]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid container spacing={2} className={classes.root}>
        {notes.length > 0
          ? notes.map((note) => (
              <Note
                title={note.title}
                content={note.content}
                color={note.color}
                username={note.username}
                id={note.id}
                key={note.id}
              />
            ))
          : ""}
      </Grid>
      <AddNoteBtn />
    </div>
  );
}

export default Notes;
