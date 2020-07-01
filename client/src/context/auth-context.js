import React from "react";
export default React.createContext({
  userEmail: null,
  isAuthenticated: false,
  provider: null,
  login: () => {},
});
