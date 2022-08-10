import React, { useState } from "react";
import "./ToDo.css";

import add from "../../images/add.png";
import sort from "../../images/sort.png";

import Task from "../Task/Task";
import AddNewToDoTask from "../AddNewToDoTask/AddNewToDoTask";
import {
  SORT_DATE,
  SORT_COMPLETION,
  SORT_DATE_ASC,
  SORT_DATE_DSC,
  SORT_BY_COMPLETION_FIRST,
  SORT_BY_COMPLETION_LAST,
} from "../utils/Constant";
import apiCall from "../utils/apicalls";

function ToDoTask({ sectionList, setSectionList, todoList, setToDoList }) {
  const [sectionMerged, setSectionMerge] = useState(false);
  const [sortByDate, setSortByDate] = useState(SORT_DATE_ASC);
  const [sortByCompletion, setSortByCompletion] = useState("");
  const [openAddNewTaskModal, setOpenAddNewTaskModal] = useState(false);

  const toggleSectionMerge = (e) => {
    if (sortByDate === SORT_DATE_DSC) {
      const reverseList = [...todoList];
      reverseList.reverse();
      setToDoList(reverseList);

      Object.entries(sectionList).forEach(([key, val]) => {
        val.taskIndexes.reverse();
      });
      setSectionList({ ...sectionList });
    }
    if (sectionMerged) setSectionMerge(false);
    else setSectionMerge(true);
    let merge_button = document.getElementById("merge_split_button");
    merge_button.classList.toggle("box-shadow-icon-button");
  };

  const manageBoxShadow = (clickedIcon) => {
    let sort_complete = document.getElementById(SORT_COMPLETION);
    let sort_date = document.getElementById(SORT_DATE);

    if (clickedIcon === SORT_COMPLETION) {
      if (!sortByCompletion) {
        setSortByCompletion(SORT_BY_COMPLETION_LAST);
        sort_complete.classList.add("border-icon-button");
      } else if (sortByCompletion === SORT_BY_COMPLETION_LAST) {
        setSortByCompletion(SORT_BY_COMPLETION_FIRST);
        sort_complete.classList.add("box-shadow-icon-button");
      } else {
        setSortByCompletion("");
        sort_complete.classList.remove(
          "border-icon-button",
          "box-shadow-icon-button"
        );
      }
    } else {
      if (sectionMerged) {
        const reverseList = [...todoList];
        reverseList.reverse();
        setToDoList(reverseList);
      } else {
        Object.entries(sectionList).forEach(([key, val]) => {
          val.taskIndexes.reverse();
        });
        setSectionList({ ...sectionList });
      }

      if (sortByDate === SORT_DATE_ASC) {
        setSortByDate(SORT_DATE_DSC);
      } else setSortByDate(SORT_DATE_ASC);

      sort_date.classList.toggle("box-shadow-icon-button");
    }
  };

  const closeAddNewTaskModal = () => {
    setOpenAddNewTaskModal(false);
  };

  const toggleToDoCompletion = async (idx) => {
    // To change a state array  you have to follow this steps! https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate
    const todo = [...todoList];
    const item = { ...todo[idx] };

    item.isTaskCompleted = !item.isTaskCompleted;
    if (item.isTaskCompleted) item.completionDate = new Date().getTime();
    else item.completionDate = "";

    todo[idx] = item;

    const { err } = await apiCall("updateToDoCompletion", {
      taskId: item._id,
      isTaskCompleted: item.isTaskCompleted,
      completionDate: item.completionDate,
    });
    if (err) {
      console.log(err);
      return;
    }

    setToDoList(todo);
  };



  const TaskSections = () => {
    if (!sectionList) return <div>No Tasks Added Yet!</div>;

    if (sectionMerged) {
      if (!sortByCompletion) {
        return (
          <div className="section_container">
            <div className="section_name">All Sections</div>
            {todoList.map((todo, idx) => {
              const data = todo;
              return (
                <Task
                  key={data["_id"]}
                  {...data}
                  taskType={"TODO"}
                  localId={idx}
                  taskId={data._id}
                  toggleCompletion={toggleToDoCompletion}
                />
              );
            })}
          </div>
        );
      } else {
        const factor =
          sortByCompletion === SORT_BY_COMPLETION_LAST ? false : true;
        return (
          <div className="section_container">
            <div className="section_name">All Sections</div>
            {todoList.map((todo, idx) => {
              const data = todo;
              if (todo.isTaskCompleted === factor) {
                return (
                  <Task
                    key={data["_id"]}
                    {...data}
                    taskType={"TODO"}
                    localId={idx}
                    taskId={data._id}
                    toggleCompletion={toggleToDoCompletion}
                  />
                );
              }
              return null;
            })}
            {todoList.map((todo, idx) => {
              const data = todo;
              if (todo.isTaskCompleted === !factor) {
                return (
                  <Task
                    key={data["_id"]}
                    {...data}
                    taskType={"TODO"}
                    localId={idx}
                    taskId={data._id}
                    toggleCompletion={toggleToDoCompletion}
                  />
                );
              }
              return null;
            })}
          </div>
        );
      }
    } else {
      if (!sortByCompletion) {
        return Object.entries(sectionList).map(([key, val]) => {
          if (val.taskIndexes.length > 0) {
            return (
              <div key={key} className="section_container">
                <div className="section_name">
                  {val.sectionName} - {val.taskIndexes.length}
                </div>
                {val["taskIndexes"].map((idx) => {
                  const data = todoList[idx];
                  return (
                    <Task
                      key={data["_id"]}
                      {...data}
                      taskType={"TODO"}
                      localId={idx}
                      taskId={data._id}
                      toggleCompletion={toggleToDoCompletion}
                    />
                  );
                })}
              </div>
            );
          }
          return null;
        });
      } else {
        const factor =
          sortByCompletion === SORT_BY_COMPLETION_LAST ? false : true;

        return Object.entries(sectionList).map(([key, val]) => {
          if (val.taskIndexes) {
            return (
              <div key={key} className="section_container">
                <div className="section_name">
                  {val.sectionName} - {val.taskIndexes.length}
                </div>
                {val["taskIndexes"].map((idx) => {
                  const data = todoList[idx];
                  if (data.isTaskCompleted === factor) {
                    return (
                      <Task
                        key={data["_id"]}
                        {...data}
                        taskType={"TODO"}
                        localId={idx}
                        taskId={data._id}
                        toggleCompletion={toggleToDoCompletion}
                      />
                    );
                  }
                  return null;
                })}
                {val["taskIndexes"].map((idx) => {
                  const data = todoList[idx];
                  if (data.isTaskCompleted === !factor) {
                    return (
                      <Task
                        key={data["_id"]}
                        {...data}
                        taskType={"TODO"}
                        localId={idx}
                        taskId={data._id}
                        toggleCompletion={toggleToDoCompletion}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            );
          }
          return null;
        });
      }
    }
  };

  return (
    <div className="content__body">
      <div className="sort_buttons">
        <button
          title="Merge/Split All sections"
          id="merge_split_button"
          onClick={(e) => toggleSectionMerge(e)}
          className=""
        >
          <span> {sectionMerged ? "Split" : "Merge"}</span>
        </button>
        <button
          title="Sort by Created Date"
          id={SORT_DATE}
          className="border-icon-button"
          onClick={() => manageBoxShadow(SORT_DATE)}
        >
          <img src={sort} alt="Sort by Date" />
          <span>Date</span>
        </button>
        <button
          title="Sort by Completion"
          id={SORT_COMPLETION}
          className=""
          onClick={() => manageBoxShadow(SORT_COMPLETION)}
        >
          <img src={sort} alt="Sort by Completion" />
          <span>Completion</span>
        </button>
      </div>

      <TaskSections />

      {/* Fixed Add Button */}
      <div
        onClick={() => setOpenAddNewTaskModal(true)}
        className="add_task_button"
        title="Add new Task"
      >
        <img src={add} alt="" />
      </div>

      {openAddNewTaskModal && (
        <AddNewToDoTask
          closeModal={closeAddNewTaskModal}
          sectionList={sectionList}
          setSectionList={setSectionList}
          setToDoList={setToDoList}
        />
      )}
    </div>
  );
}

export default ToDoTask;
