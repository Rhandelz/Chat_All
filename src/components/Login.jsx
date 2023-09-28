import React from "react";
import google from "../assets/google.png";
import logo from "../assets/logo.svg";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider, auth } from "../config/firebase.config";
import { AuthContext } from "../context/AuthContext";
import { useLoaderData, useNavigate } from "react-router-dom";

export function loader() {
  const currentLogin = JSON.parse(localStorage.getItem("user"));

  return currentLogin;
}

const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { currentLogin } = React.useContext(AuthContext);
  const loader = useLoaderData();

  const [pic, setPic] = React.useState("");
  const navigate = useNavigate();
  const authGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/chat");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.customData.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="login">
      {currentLogin ? (
        <div className="done">
          <span class="material-symbols-outlined">check_circle</span>
          <h1>You are Log In</h1>
        </div>
      ) : (
        <div action="">
          <img src={logo} alt="" />
          <span>
            <h1>Welcome to </h1>
            <h1>Chat All</h1>
          </span>
          <button onClick={authGoogle}>
            <img src={google} alt="" />
            <h1>Sign in with Google</h1>
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
