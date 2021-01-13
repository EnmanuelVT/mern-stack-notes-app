import React from "react";
import Notes from "./components/notes/Notes";
import NotesProvider from "./components/notes/NotesProvider";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import SignUp from "./components/sign-up/SignUp";
import AuthProvider from "./contexts/AuthContext";
import Login from "./components/login/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ForgotPassword from "./components/forgot-password/ForgotPassword";
import UpdateAccount from "./components/update-account/UpdateAccount";
import Account from "./components/account/Account";
import Reauthentication from "./components/reauthentication/Reauthentication";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <NotesProvider>
          <Route exact path="/">
            <Redirect to="/notes" />
          </Route>
          <PrivateRoute path="/notes" component={Notes} />
          <PrivateRoute path="/account" component={Account} />
          <PrivateRoute path="/update-account" component={UpdateAccount} />
          <PrivateRoute path="/reauthenticate" component={Reauthentication} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </NotesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
