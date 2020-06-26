import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Authentication from "./pages/Auth";
import MainContent from "./pages/Main";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <Authentication />
        </Route>

        <Route path="/main">
          <MainContent />
        </Route>

        <Redirect to="/auth"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
