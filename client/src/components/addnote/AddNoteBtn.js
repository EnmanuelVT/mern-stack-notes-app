import { CssBaseline, Fab } from "@material-ui/core";
import React, { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AddNoteBtn() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const fab = {
    color: "secondary",
    className: classes.fab,
    icon: <AddIcon />,
    label: "Add",
  };

  function handleAddNote() {
    setOpen(true);
  }

  return (
    <div>
      <CssBaseline />
      <Fab color={fab.color} className={fab.className} onClick={handleAddNote}>
        {fab.icon}
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
        <AddNoteForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default AddNoteBtn;
