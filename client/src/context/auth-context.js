import React from "react";
export default React.createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
});
