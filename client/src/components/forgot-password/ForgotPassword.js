import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ForgotPassword() {
  const emailRef = useRef("");
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further information");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <h4>{error && error}</h4>
      <h4>{message && message}</h4>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" required ref={emailRef} placeholder="Email" />
        <button disabled={loading} type="submit">
          Reset password
        </button>
      </form>
      <div>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
      <div>
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default ForgotPassword;
