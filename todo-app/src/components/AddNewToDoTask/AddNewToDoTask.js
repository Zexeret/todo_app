import React, { useState } from "react";

import "./AddNewToDoTask.css";

import ModalContainer from "../ModalContainer/ModalContainer.js";
import apiCall from "../utils/apicalls";

function AddNewToDoTask({
  closeModal,
  sectionList,
  setSectionList,
  setToDoList,
}) {
  const [taskHeading, setTaskHeading] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskSection, setTaskSection] = useState("");
  const [isNewSectionCreated, setIsNewSectionCreated] = useState(false);

  const handleSectionChange = async (e) => {
    setTaskSection(e.target.value);
  };

  const handleAddToDoTask = async () => {
    const { err } = await apiCall("addtodotask", {
      taskHeading,
      taskDesc: taskDescription,
      section: taskSection,
      isNewSectionCreated,
    });
    if (err) {
      //INCOMPLETE Show proper error dialogue
      console.log(err);
      return;
    } else {
      const { err, data } = await apiCall("getAllToDoTask");
      if (err) {
        //INCOMPLETE Show proper error dialogue
        console.log(err);
        return;
      } else {
        setToDoList(data.todoTaskObjList);
        setSectionList(data.sectionList);
      }

      closeModal();
    }
  };

  return (
    <ModalContainer>
      <div className="add_new_todo_container">
        <div className="heading">
          <h2>ADD TO-DO TASK</h2>
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

          <label htmlFor="new-task-section">Task Section</label>
          {isNewSectionCreated ? (
            <input
              placeholder="Enter your Task Section Name"
              type="text"
              id="new-task-section"
              value={taskSection}
              onChange={(e) => setTaskSection(e.target.value)}
            />
          ) : (
            <select
              id="new-task-section"
              value={taskSection}
              onChange={(e) => handleSectionChange(e)}
            >
              <option value="" disabled={true}>
                Select Task Section
              </option>
              {sectionList &&
                Object.entries(sectionList).map(([key, val]) => (
                  <option key={val._id} value={val._id}>
                    {val.sectionName}
                  </option>
                ))}
            </select>
          )}

          <div className="input_checkbox">
            <input
              type="checkbox"
              id="new-section-name"
              value={isNewSectionCreated}
              onClick={() =>
                setIsNewSectionCreated((isNewSectionCreated) =>
                  isNewSectionCreated ? false : true
                )
              }
            />
            <label htmlFor="new-section-name">Create New Section</label>
          </div>
        </div>
        <hr />

        <footer>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleAddToDoTask}>Add Task</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default AddNewToDoTask;
