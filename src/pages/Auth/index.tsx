import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { StoreType } from "../../redux/type/globalType";
import LogIn from "./LogIn";

export default function Auth() {
  const history = useHistory();
  const match = useRouteMatch();
  const userId = useSelector((store: StoreType) => store.user.id);

  useEffect(() => {
    if (userId) {
      history.push("/main");
    }
  }, [userId, history]);

  return (
    <div>
      <Switch>
        <Route path={`${match.url}/login`}>
          <LogIn></LogIn>
        </Route>
        <Redirect to={`${match.url}/login`}></Redirect>
      </Switch>
    </div>
  );
}
