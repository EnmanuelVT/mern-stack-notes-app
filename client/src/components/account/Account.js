import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  toBottom: {
    marginTop: theme.spacing(16),
  },
}));

function Account() {
  const [error, setError] = useState("");
  const { currentUser, logout, deleteAccount } = useAuth();
  const history = useHistory();

  const classes = useStyles();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  async function handleDeleteAccount() {
    deleteAccount();
  }

  const toUpdateAccount = () => history.push("/update-account");

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account
        </Typography>
        <Typography component="h2" variant="h6">
          {currentUser.email}
        </Typography>
        {error && <h2>{error}</h2>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.toBottom}
          onClick={toUpdateAccount}
        >
          Update Account
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </Container>
  );
}

export default Account;
