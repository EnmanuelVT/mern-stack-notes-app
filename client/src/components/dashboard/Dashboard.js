import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { PrivateRoute } from "../private-route/PrivateRoute";

function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <strong>Email: {currentUser.email}</strong>
      {error && <h2>{error}</h2>}
      <Link to="/update-profile">Update profile</Link>
      <button onClick={handleLogout}>Log Out</button>
      <button
        onClick={() =>
          currentUser.getIdToken().then((idToken) => console.log(idToken))
        }
      >
        Log id token
      </button>
    </div>
  );
}

export default Dashboard;
