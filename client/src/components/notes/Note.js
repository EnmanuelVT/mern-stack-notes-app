import React, { useContext } from "react";
import { NotesContext } from "./NotesProvider";
import "./Note.css";
import axios from "axios";

function Note({ title, content, color, username, id }) {
  const [notes, setNotes] = useContext(NotesContext);

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
    changeNoteProperty("title", e);

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
    changeNoteProperty("content", e);

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
    changeNoteProperty("color", e);

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

  function changeNoteProperty(propertyName, e) {
    const newNotes = notes.slice();
    const newNote = newNotes.find((note) => note.id === id);
    newNote[propertyName] = e.target.value;
    setNotes(newNotes);
  }

  function deleteNoteInClient(id) {
    const newNotes = notes.slice();
    const filteredNotes = newNotes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  }

  return (
    <div className={`note ${color ? color.toLowerCase() : ""} `}>
      <input type="text" value={title} onChange={handleTitleChange} />
      <textarea value={content} onChange={handleContentChange}></textarea>
      <strong>{username}</strong>
      <select defaultValue={color} onChange={handleColorChange}>
        <option>Blue</option>
        <option>Orange</option>
        <option>Green</option>
        <option>Yellow</option>
        <option>Pink</option>
      </select>
      <button onClick={handleDeleteNote}>Delete</button>
    </div>
  );
}

export default Note;
