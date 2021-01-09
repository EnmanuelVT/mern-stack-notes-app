import React, { useContext, useEffect } from "react";
import Note from "./Note";
import { NotesContext } from "./NotesProvider";
import "./Notes.css";
import axios from "axios";
import AddNoteBtn from "../addnote/AddNoteBtn";
import { useAuth } from "../../contexts/AuthContext";

function Notes() {
  const [notes, setNotes] = useContext(NotesContext);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function getNotes() {
      const idToken = await currentUser.getIdToken();

      axios.get(`http://10.0.0.135:5000/notes/${idToken}`).then((res) => {
        setNotes(res.data);
      });
    }

    getNotes();
  }, [currentUser, setNotes]);

  return (
    <>
      <div className="notes">
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
      </div>
      <AddNoteBtn />
    </>
  );
}

export default Notes;
