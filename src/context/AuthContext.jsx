import React, { useEffect } from "react";
import Authred from "./AuthRed";

const INIT_STATE = {
  currentLogin: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = React.createContext(INIT_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(Authred, INIT_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentLogin));
  }, [state.currentLogin]);

  return (
    <AuthContext.Provider
      value={{ currentLogin: state.currentLogin, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
