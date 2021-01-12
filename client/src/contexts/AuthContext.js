import React, { useState, useContext, useEffect } from "react";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [idToken, setIdToken] = useState();
  const [loading, setLoading] = useState(true);

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
      })
      .catch((err) => console.error(err));
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
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

  function deleteAccount() {
    const { uid } = currentUser;

    currentUser
      .delete()
      .then(() => {
        axios.delete(`http://10.0.0.135:5000/users/delete/${uid}`);
      })
      .catch((err) => console.error(err));
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
