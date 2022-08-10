import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import todo from "../../images/todo.png";
import user from "../../images/user.png";
import dailytask from "../../images/dailytask.png";
import info from "../../images/info.png";
import { Link } from "react-router-dom";
import { TODO_URL, DAILYTASK_URL, PROFILE_URL,LOGIN_URL } from "../utils/Constant.js";

function Sidebar({
  userInfo,
  setUserInfo
}) {

  const [menuOpen , setMenuOpen] = useState(false) ;

  useEffect(() => {
    if(menuOpen)
    {
          let elem = document.getElementById("sidebar_menu_id");
          elem.classList.add("menu_hamburger_right");

          let sidebar_body = document.getElementById("sidebar_body_id");
          sidebar_body.classList.add("mob_sidebar_body");

          let feature_names = document.querySelectorAll(".feature__name");
          feature_names.forEach((feature_name) => {
            feature_name.classList.add("mob_feature_name");
          });
    }
    else{
      let elem = document.getElementById("sidebar_menu_id");
      elem.classList.remove("menu_hamburger_right");

      let sidebar_body = document.getElementById("sidebar_body_id");
      sidebar_body.classList.remove("mob_sidebar_body");

      let feature_names = document.querySelectorAll(".feature__name");
      feature_names.forEach((feature_name) => {
        feature_name.classList.remove("mob_feature_name");
      });
    }
  }, [menuOpen]);


  return (
    <>
      <div
        id="sidebar_menu_id"
        className="menu_hamburger"
        onClick={() =>
          setMenuOpen((menuOpen) => (menuOpen === true ? false : true))
        }
      >
        <div className="hamburger_line line1"></div>
        <div className="hamburger_line line2"></div>
        <div className="hamburger_line line3"></div>
      </div>
      <div id="sidebar_body_id" className="sidebar__body">
        <div className="grid_menu">
          <Link to={userInfo ? PROFILE_URL:LOGIN_URL}>
            <div className="sidebar__feature">
              <div className="img_container">
                <img src={user} alt="" />
              </div>
              {userInfo ? (
                <p className="feature__name">Profile</p>
              ) : (
                <p className="feature__name">Login</p>
              )}
            </div>
          </Link>
        </div>

        <div className="grid_menu">
          <Link to={TODO_URL}>
            <div className="sidebar__feature">
              <div className="img_container">
                <img src={todo} alt="" />
              </div>

              <p className="feature__name">To Do List</p>
            </div>
          </Link>
          <Link to={DAILYTASK_URL}>
            <div className="sidebar__feature">
              <div className="img_container">
                <img src={dailytask} alt="" />
              </div>

              <p className="feature__name">Daily Tasks</p>
            </div>
          </Link>
        </div>

        <div className="grid_menu">
          <div className="sidebar__feature">
            <div className="img_container">
              <img src={info} alt="" />
            </div>
            <p className="feature__name">App Info</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
