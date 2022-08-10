import React, { useState } from "react";

import "./AddDailyTask.css";
import ModalContainer from "../ModalContainer/ModalContainer.js";
import apiCall from "../utils/apicalls";

function AddDailyTask({ closeModal, setDailyTaskList }) {
  const [taskHeading, setTaskHeading] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddDailyTask = async () => {
    const { err, data } = await apiCall("addDailyTask", {
      taskHeading,
      taskDesc: taskDescription,
    });
    if (err) {
      //INCOMPLETE Show proper error dialogue
      console.log(err);
      return;
    } else {
      const { err, data } = await apiCall("getDailyTasks");
      if (err) {
        //INCOMPLETE Show proper error dialogue
        console.log(err);
        return;
      }
      setDailyTaskList(data.dailyTasks);
    }

    closeModal();
  };
  return (
    <ModalContainer>
      <div className="add_new_todo_container">
        <div className="heading">
          <h2>ADD DAILY TASK</h2>
          <p>
            Add new task to you To-Do List. All the fields are mandatory unless
            specified.
          </p>
        </div>

        <div className="input-form">
          <label htmlFor="new-task-heading">Task Heading</label>
          <input
            placeholder="Enter your Task Heading"
            type="text"
            id="new-task-heading"
            value={taskHeading}
            onChange={(e) => setTaskHeading(e.target.value)}
          />

          <label htmlFor="new-task-description">Task Description</label>
          <textarea
            placeholder="Enter your Task Description"
            type="text"
            id="new-task-description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <hr />

        <footer>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleAddDailyTask}>Add Task</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default AddDailyTask;
