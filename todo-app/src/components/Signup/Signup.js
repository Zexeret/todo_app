import React, { useState } from "react";

import "./Signup.css";

import ModalContainer from "../ModalContainer/ModalContainer.js";
import { Link, useNavigate } from "react-router-dom";
import apiCall from "../utils/apicalls";

function Signup({ setUserInfo }) {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUp = async () => {
    const { err, data } = await apiCall("userSignUp", {
      fullname,
      username,
      password,
    });

    if (err) {
      //INCOMPLETE Show proper error dialogue
      alert(err);
      return;
    } else {
      setUserInfo(data.uatc);
    }
    navigate("/");
  };

  return (
    <ModalContainer>
      <div className="add_new_todo_container signup_container">
        <div className="heading">
          <h2>SIGN UP</h2>
          <p></p>
        </div>

        <div className="input-form">
          <label htmlFor="login_name">Full Name</label>
          <input
            placeholder="Your Full Name"
            type="text"
            id="login_name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />

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
            Already have an accout? <Link to="/user/login">Log In</Link>
          </p>
        </div>
        <hr />

        <footer>
          <button onClick={() => navigate("/")}>Cancel</button>
          <button onClick={handleSignUp}>Sign Up!</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default Signup;
