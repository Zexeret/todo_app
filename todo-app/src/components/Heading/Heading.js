import React from 'react';
import "./Heading.css" ;
import torch from "../../images/torch.png"
import sunglasses from "../../images/sunglasses.png" ;
import { APP_NAME_HEADING, APP_CREATOR_NAME } from "../utils/Constant";

function Heading({ setTheme,theme }) {
  return (
    <div className="heading__body">
      <div className="heading__name" title="App Created By Shyam Rathod">
        <h1 className="app__name">{APP_NAME_HEADING}</h1>
        <h3 className="app_creator">
          By <span>{APP_CREATOR_NAME}</span>
        </h3>
      </div>
      <div
        className="heading__icons"
        onClick={() =>
          setTheme((theme) => (theme === "light" ? "dark" : "light"))
        }
      >
        {theme === "dark" ? (
          <img src={torch} alt="" />
        ) : (
          <img src={sunglasses} alt="" />
        )}
      </div>
    </div>
  );
}

export default Heading