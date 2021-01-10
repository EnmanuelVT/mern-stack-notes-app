import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

function NavBar() {
  const classes = useStyles();

  const history = useHistory();

  const toLogin = () => history.push("/login");
  const toSignUp = () => history.push("/sign-up");
  const toNotes = () => history.push("/notes");
  const toAccount = () => history.push("/account");

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={toNotes} variant="h6" className={classes.title}>
            Notes App
          </Typography>
          <Button onClick={toLogin} color="inherit">
            Login
          </Button>
          <Button onClick={toSignUp} color="inherit">
            Sign Up
          </Button>
          <Button onClick={toAccount} color="inherit">
            Account
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
