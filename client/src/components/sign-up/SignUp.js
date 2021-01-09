import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function SignUp() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.error(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <h4>{error && error}</h4>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" required ref={emailRef} placeholder="Email" />
        <input
          type="password"
          required
          ref={passwordRef}
          placeholder="Password"
        />
        <input
          type="password"
          required
          ref={confirmPasswordRef}
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          Sign Up
        </button>
      </form>
      <div>
        Already have an account?
        <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

export default SignUp;
