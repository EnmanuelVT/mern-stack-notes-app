import React from "react";
import ReactDom from "react-dom";

import "./Modal.css";

export default function Modal({ isOpen, children, onClose }) {
  if (!isOpen) {
    document.querySelector("#root").classList.remove("blur");
    return null;
  } else {
    document.querySelector("#root").classList.add("blur");
  }

  return ReactDom.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("portal")
  );
}
