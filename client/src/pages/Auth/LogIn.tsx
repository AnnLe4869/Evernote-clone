import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  header: {
    marginBottom: theme.spacing(1),
  },
  instruction: {
    fontWeight: 600,
  },
  routeLink: {
    textDecoration: "none",
    "&:visited": {
      color: "#1473e6",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function LogIn({ signIn }) {
  const classes = useStyles();

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.header}>
              Sign in
            </Typography>
            <Typography
              component="h1"
              variant="subtitle2"
              className={classes.instruction}
            >
              New user?{" "}
              <Link className={classes.routeLink} to="/auth/signup">
                Create an account
              </Link>
            </Typography>
            <form className={classes.form}>
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
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ float: "right" }}
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>

            <Typography component="h1" variant="h5" align="center">
              Or
            </Typography>

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={signIn}
              className={classes.submit}
              startIcon={
                <SvgIcon>
                  <path
                    fill="currentColor"
                    d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                  />
                </SvgIcon>
              }
            >
              Continue with Google
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<TwitterIcon />}
              className={classes.submit}
            >
              Continue with Twitter
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
