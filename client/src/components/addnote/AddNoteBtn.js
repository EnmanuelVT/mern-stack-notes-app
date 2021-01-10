import { Button } from "@material-ui/core";
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
      <Button onClick={handleAddNote} className="add-btn">
        +
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <AddNoteForm onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
}

export default AddNoteBtn;
