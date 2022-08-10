import React, { useState } from "react";

import "./Profile.css";

import ModalContainer from "../ModalContainer/ModalContainer.js";
import { useNavigate } from "react-router-dom";
import apiCall from "../utils/apicalls";

function Profile({ userInfo,setUserInfo }) {

  const navigate = useNavigate();
  const handleLogOut = async () => {
    const { err, data } = await apiCall("userLogOut");

    if (err) {
      //INCOMPLETE Show proper error dialogue
      alert(err);
      return;
    } else {
      setUserInfo("");
    }
    navigate("/");
    window.location.reload();
    };

  return (
    <ModalContainer>
      <div className="add_new_todo_container profile_container">
        <div className="heading">
          <h2>Profile</h2>
          <p></p>
        </div>

        <div className="input-form">
          <label htmlFor="user-full-name">Full Name</label>
          <input
            placeholder="Enter your Task Heading"
            type="text"
            id="user-full-name"
            value={userInfo.fullname}
            disabled={true}
          />

          <label htmlFor="user-username">Username</label>
          <input
            placeholder="Enter your Task Heading"
            type="text"
            id="user-username"
            value={userInfo.username}
            disabled={true}
          />

        </div>
        <hr />

        <footer>
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button onClick={handleLogOut}>Log Out</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default Profile;
