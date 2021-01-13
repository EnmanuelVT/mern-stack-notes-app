import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [idToken, setIdToken] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  function signUp(email, password) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user);
        const { email, uid } = user;

        const newUser = {
          email: email,
          uid: uid,
        };

        axios.post("http://10.0.0.135:5000/users/add", newUser);

        history.push("/notes");
      })
      .catch((err) => {
        throw err;
      });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(() => history.push("/notes"))
      .catch((err) => {
        throw err;
      });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    currentUser.updatePassword(password);
  }

  function reauthenticateUser(email, password, isDeletingAccount) {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );

    currentUser
      .reauthenticateWithCredential(credential)
      .then(() => console.log("Reauthenticated"))
      .catch((err) => console.error(err));
  }

  function deleteAccount() {
    const { uid } = currentUser;

    currentUser
      .delete()
      .then(() => {
        axios.delete(`http://10.0.0.135:5000/users/delete/${uid}`);
      })
      .catch((err) => {
        if (err.code === "auth/requires-recent-login") {
          history.push("/reauthenticate");
        } else {
          console.error(err.code);
        }
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        const idToken = await user.getIdToken();
        setIdToken(idToken);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    deleteAccount,
    reauthenticateUser,
    idToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
