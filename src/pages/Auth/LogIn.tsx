import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
import { useDispatch } from "react-redux";
import {
  logInWithGithub,
  logInWithGoogle,
  logInWithTwitter,
} from "../../redux/actions/authAction";
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

export default function LogIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleGoogleLogIn = () => {
    dispatch(logInWithGoogle());
  };
  const handleTwitterLogIn = () => {
    dispatch(logInWithTwitter());
  };
  const handleGithubLogIn = () => {
    dispatch(logInWithGithub());
  };

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

            {/* Google sign in */}
            <Button
              type="submit"
              variant="outlined"
              color="default"
              fullWidth
              onClick={handleGoogleLogIn}
              className={classes.submit}
              startIcon={
                <SvgIcon
                  viewBox="0 0 256 262"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </SvgIcon>
              }
            >
              Continue with Google
            </Button>
            {/* Twitter sign in */}
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              fullWidth
              startIcon={<TwitterIcon />}
              className={classes.submit}
              onClick={handleTwitterLogIn}
            >
              Continue with Twitter
            </Button>
            {/* GitHub sign in */}
            <Button
              type="submit"
              variant="outlined"
              color="default"
              fullWidth
              onClick={handleGithubLogIn}
              className={classes.submit}
              startIcon={<GitHubIcon />}
            >
              Continue with GitHub
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
