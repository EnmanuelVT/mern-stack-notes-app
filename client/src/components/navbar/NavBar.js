import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/notes">Notes</Link>
        </li>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
