import React from "react";
export default React.createContext({
  user: null,
  isAuthenticated: false,
  provider: null,
  login: () => {},
});
