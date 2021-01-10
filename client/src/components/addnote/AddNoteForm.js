import React, { useContext, useRef } from "react";
import { NotesContext } from "../notes/NotesProvider";
import "./AddNoteForm.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ImCancelCircle } from "react-icons/im";
import { useAuth } from "../../contexts/AuthContext";

function AddNoteForm({ onClose }) {
  const titleRef = useRef("");
  const contentRef = useRef("");
  const colorRef = useRef("");

  const [, setNotes] = useContext(NotesContext);
  const { currentUser } = useAuth();

  function addNote(e) {
    const note = {
      email: currentUser.email,
      title: titleRef.current.value,
      content: contentRef.current.value,
      color: colorRef.current.value,
      id: uuidv4(),
    };

    setNotes((prevNotes) => [note, ...prevNotes]);

    axios
      .post("http://10.0.0.135:5000/notes", note)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  function handleAddNote() {
    addNote();
    onClose();
  }

  return (
    <form className="form">
      <div className="form__header">
        <input type="text" placeholder="Title" ref={titleRef} />
        <button onClick={onClose} className="close">
          <ImCancelCircle style={{ fontSize: "2rem" }} />
        </button>
      </div>
      <textarea placeholder="Content" ref={contentRef} />
      <select ref={colorRef}>
        <option>Blue</option>
        <option>Orange</option>
        <option>Green</option>
        <option>Yellow</option>
        <option>Pink</option>
      </select>
      <button type="submit" onClick={handleAddNote}>
        Add note
      </button>
    </form>
  );
}

export default AddNoteForm;
