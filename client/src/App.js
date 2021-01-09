import React from "react";
import "./App.css";
import Notes from "./components/notes/Notes";
import NotesProvider from "./components/notes/NotesProvider";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./components/sign-up/SignUp";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import UpdateProfile from "./components/update-profile/UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <NotesProvider>
          <PrivateRoute path="/notes" component={Notes}></PrivateRoute>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
