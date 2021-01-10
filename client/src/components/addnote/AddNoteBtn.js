import { CssBaseline, Fab } from "@material-ui/core";
import React, { useState } from "react";
import Modal from "../modal/Modal";
import AddNoteForm from "./AddNoteForm";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    minHeight: "90vh",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function AddNoteBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  const fab = {
    color: "secondary",
    className: classes.fab,
    icon: <AddIcon />,
    label: "Add",
  };

  function handleAddNote() {
    setIsOpen(true);
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Fab
          color={fab.color}
          className={fab.className}
          onClick={handleAddNote}
        >
          {fab.icon}
        </Fab>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <AddNoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      </div>
    </>
  );
}

export default AddNoteBtn;
