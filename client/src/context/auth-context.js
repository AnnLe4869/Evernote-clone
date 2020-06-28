import React from "react";
export default React.createContext({
  userId: null,
  isAuthenticated: false,
  provider: null,
  login: () => {},
});
