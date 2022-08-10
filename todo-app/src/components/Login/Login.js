import React, { useState } from "react";

import "./Login.css";

import ModalContainer from "../ModalContainer/ModalContainer.js";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PAGE_HEADING, SIGNUP_URL } from "../utils/Constant";
import apiCall from "../utils/apicalls";

function Login({setUserInfo }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { err ,data} = await apiCall("userLogin", { username, password });
    if (err) {
      //INCOMPLETE Show proper error dialogue
      alert(err);
      return;
    }
    else{
      setUserInfo(data.uatc);
      setUsername("") ;
      setPassword("") ;
    }
    navigate("/");
     window.location.reload();
  };


  return (
    <ModalContainer>
      <div className="add_new_todo_container login_container">
        <div className="heading">
          <h2>{LOGIN_PAGE_HEADING}</h2>
          <p></p>
        </div>

        <div className="input-form">
          <label htmlFor="user_username">Username</label>
          <input
            placeholder="Enter your Username"
            type="text"
            id="user_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="user_pass">Password</label>
          <input
            placeholder="Enter your Password"
            type="password"
            id="user_pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="login_sign_desc">
            Dont't have an accout? <Link to={SIGNUP_URL}>Sign Up</Link>
          </p>
        </div>
        <hr />

        <footer>
          <button onClick={() => navigate("/")}>Cancel</button>
          <button onClick={handleLogin}>Login</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default Login;
