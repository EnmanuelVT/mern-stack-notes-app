import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormHelperText } from "@material-ui/core";

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
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Notes App Emmanuel "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function UpdateProfile() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();

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

  {
    /* return ( */
  }
  {
    /*   <> */
  }
  {
    /*     <h4>{error && error}</h4> */
  }
  {
    /*     <h2>Update Account</h2> */
  }
  {
    /*     <form onSubmit={handleSubmit}> */
  }
  {
    /*       <input */
  }
  {
    /*         type="email" */
  }
  {
    /*         defaultValue={currentUser.email} */
  }
  {
    /*         ref={emailRef} */
  }
  {
    /*         placeholder="Email" */
  }
  {
    /*       /> */
  }
  {
    /*       <input */
  }
  {
    /*         type="password" */
  }
  {
    /*         ref={passwordRef} */
  }
  {
    /*         placeholder="Password (Leave blank to keep it)" */
  }
  {
    /*       /> */
  }
  {
    /*       <input */
  }
  {
    /*         type="password" */
  }
  {
    /*         required */
  }
  {
    /*         ref={confirmPasswordRef} */
  }
  {
    /*         placeholder="Password (Leave blank to keep it)" */
  }
  {
    /*       /> */
  }
  {
    /*       <button disabled={loading} type="submit"> */
  }
  {
    /*         Update */
  }
  {
    /*       </button> */
  }
  {
    /*     </form> */
  }
  {
    /*     <div> */
  }
  {
    /*       <Link to="/">Cancel</Link> */
  }
  {
    /*     </div> */
  }
  {
    /*   </> */
  }
  {
    /* ); */
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Account
        </Typography>
        <FormHelperText>{error && error}</FormHelperText>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
            defaultValue={currentUser.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Repeat password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={confirmPasswordRef}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Update Account
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/account" variant="body2">
                Cancel
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default UpdateProfile;
