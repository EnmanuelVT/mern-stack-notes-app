import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function UpdateProfile() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <h4>{error && error}</h4>
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          defaultValue={currentUser.email}
          ref={emailRef}
          placeholder="Email"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password (Leave blank to keep it)"
        />
        <input
          type="password"
          required
          ref={confirmPasswordRef}
          placeholder="Password (Leave blank to keep it)"
        />
        <button disabled={loading} type="submit">
          Update
        </button>
      </form>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}

export default UpdateProfile;
