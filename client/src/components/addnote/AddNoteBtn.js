import React, { useState } from "react";
import Modal from "../modal/Modal";
import AddNoteForm from "./AddNoteForm";
import "./AddNoteBtn.css";
import { AiOutlinePlus } from "react-icons/ai";

function AddNoteBtn() {
  const [isOpen, setIsOpen] = useState(false);

  function handleAddNote() {
    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={handleAddNote} className="add-btn">
        <AiOutlinePlus style={{ fontSize: "3rem" }} />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddNoteForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export default AddNoteBtn;
