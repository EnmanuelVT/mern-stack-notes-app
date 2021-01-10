import React, { useState } from "react";
import Modal from "../modal/Modal";
import AddNoteForm from "./AddNoteForm";

function AddNoteBtn() {
  const [isOpen, setIsOpen] = useState(false);

  function handleAddNote() {
    setIsOpen(true);
  }

  return (
    <div>
      <button onClick={handleAddNote} className="add-btn">
        +
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddNoteForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export default AddNoteBtn;
