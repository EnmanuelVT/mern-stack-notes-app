import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

function Login() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }

    setLoading(false);
  }

  return (
    <>
      <h4>{error && error}</h4>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" required ref={emailRef} placeholder="Email" />
        <input
          type="password"
          required
          ref={passwordRef}
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          Log In
        </button>
      </form>
      <div>
        Need an account? <Link to="/sign-up">Sign Up</Link>
      </div>
      <div>
        Forgot your password? <Link to="/forgot-password"> Recover it</Link>
      </div>
    </>
  );
}

export default Login;
