import React, { useEffect } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { logInWithGoogle } from "../../redux/actions/authAction";
import { UserType } from "../../redux/type/type";

interface RootState {
  user: UserType;
}

export default function Auth() {
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const userId = useSelector((store: RootState) => store.user.id);

  const handleClick = () => {
    dispatch(logInWithGoogle());
  };

  useEffect(() => {
    if (userId) {
      history.push("/main");
    }
  }, [userId, history]);

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/login`}>
          <LogIn signIn={handleClick}></LogIn>
        </Route>
        <Route path={`${match.url}/signup`}>
          <SignUp></SignUp>
        </Route>
        <Redirect to={`${match.url}/login`}></Redirect>
      </Switch>
    </div>
  );
}
