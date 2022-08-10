import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DailyTask from "../DailyTask/DailyTask";
import Heading from "../Heading/Heading";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import ToDoTask from "../ToDoTask/ToDoTask";
import "./MainComponent.css";
import {
  TODO_URL,
  DAILYTASK_URL,
  LOGIN_URL,
  SIGNUP_URL,
  PROFILE_URL,
} from "../utils/Constant.js";
import Profile from "../Profile/Profile";
import apiCall from "../utils/apicalls";

function MainComponent({ setTheme, theme, userInfo, setUserInfo }) {
  const [sectionList, setSectionList] = useState([]);
  const [todoList, setToDoList] = useState([]);
    const [dailyTaskList, setDailyTaskList] = useState([]);

  useEffect(() => {
    (async () => {
      const { err, data } = await apiCall("getAllToDoTask");
      if (err) {
        //INCOMPLETE Show proper error dialogue
        console.log(err);
        setSectionList("");
        setToDoList("");
        return;
      } else {
        setSectionList(data.sectionList);
        setToDoList(data.todoTaskObjList);
      }
    })();
  }, []);
  
  useEffect(() => {
    (async () => {
      const { err, data } = await apiCall("getDailyTasks");
      if (err) {
        //INCOMPLETE Show proper error dialogue
        console.log(err);
        return;
      }
      setDailyTaskList(data.dailyTasks);
    })();
  }, []);

  return (
    <div className="main__component">
      <Heading theme={theme} setTheme={setTheme} />

      <Routes>
        <Route
          path={TODO_URL}
          element={
            <ToDoTask
              sectionList={sectionList}
              setSectionList={setSectionList}
              todoList={todoList}
              setToDoList={setToDoList}
            />
          }
        />
        <Route
          path={DAILYTASK_URL}
          element={
            <DailyTask
              dailyTaskList={dailyTaskList}
              setDailyTaskList={setDailyTaskList}
            />
          }
        />
        <Route path={LOGIN_URL} element={<Login setUserInfo={setUserInfo} />} />
        <Route
          path={SIGNUP_URL}
          element={<Signup setUserInfo={setUserInfo} />}
        />
        <Route
          path={PROFILE_URL}
          element={
            userInfo ? (
              <Profile userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default MainComponent;
