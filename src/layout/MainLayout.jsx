import React from "react";
import { NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { reload, signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { AuthContext } from "../context/AuthContext";
import chat from "../assets/chat.svg";
import home from "../assets/home.svg";
import log from "../assets/log.svg";

const MainLayout = () => {
  const { currentLogin } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const design = {
    background: "#58536C",
  };
  const handleSignout = async () => {
    await signOut(auth);
    navigate("/login");
    localStorage.setItem("user", "null");
    location.reload();
  };

  return (
    <>
      <nav className="main_nav">
        <div className="logo_div">
          <img src={logo} alt="" />
          <h1>Open Chat</h1>
        </div>
        <hr />
        <span>
          <NavLink
            to="/"
            className="a"
            style={({ isActive }) => (isActive ? design : null)}
          >
            <span>
              <img src={home} alt="" />
              <h1>Home Page</h1>
            </span>
          </NavLink>
          <NavLink
            to="/chat"
            className="a"
            style={({ isActive }) => (isActive ? design : null)}
          >
            <span>
              <img src={chat} alt="" />
              <h1>World Chat</h1>
            </span>
          </NavLink>

          <NavLink
            to="/login"
            className="a"
            style={({ isActive }) => (isActive ? design : null)}
          >
            <span>
              <img src={log} alt="" />
              <h1>Log In</h1>
            </span>
          </NavLink>
        </span>

        <div>
          <button onClick={handleSignout} disabled={!currentLogin}>
            <span className="material-symbols-outlined">power_rounded</span>
          </button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MainLayout;
