import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="setup">
      <img
        src={logo}
        alt=""
        className=" animate__animated animate__jackInTheBox"
      />
      <h1 className="animate__animated animate__zoomInDown">Chat All</h1>
      <h5 className="animate__animated animate__fadeIn">
        It is an open chat platform where you can chat until your message
        exceeds the limits of our website's terms and conditions.
      </h5>
      <Link to="/chat" className="a animate__animated animate__fadeIn">
        Get Started
      </Link>
    </div>
  );
};

export default Home;
