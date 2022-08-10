import React, { useState } from "react";
import "./Task.css";
// import edit from "../../images/edit.png" ;
import deleteicon from "../../images/delete.png" ;
import tick from "../../images/tick.png" ;
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";




function Task({
  isTaskCompleted,
  taskHeading,
  taskDescription,
  createdDate,
  completionDate,
  taskType,
  localId,
  taskId,
  toggleCompletion,
}) {
  const [descOpen, setDescOpen] = useState(false);
  const [deleteModalOpen,setDeleteModalOpen] =useState(false) ;

  const toggleDesc = () => {
    if (descOpen) setDescOpen(false);
    else setDescOpen(true);
  };

  const manageTaskHeadingClick = (e) => {
    toggleDesc();
  };

  const handleCompletion = async () => {
    if (taskType === "TODO" || taskType === "DailyTask") {
      toggleCompletion(localId);
    }
  };

  return (
    <div className="task_container ">
      <div className="task_grid ">
        <div
          className={`half_circle_left ${
            isTaskCompleted ? "task_completed" : "task_pending"
          } `}
        ></div>
        <div
          className={`task_info ${
            isTaskCompleted ? "task_completed" : "task_pending"
          }`}
        >
          <div className="task_checkbox_container ">
            <div className="task_checkbox" onClick={handleCompletion}>
              {isTaskCompleted ? <img src={tick} alt="Task Complete" /> : ""}
            </div>
          </div>
          <div
            className="task_heading"
            onClick={(e) => manageTaskHeadingClick(e)}
          >
            {taskHeading}
          </div>

          {/* Paused this functionality until needed, just increase grid-template column when needed to this 
          <button>
            <img src={edit} alt="Edit Task" />
          </button> */}

          <button onClick={() => setDeleteModalOpen(true)}>
            <img src={deleteicon} alt="Delete Task" />
          </button>
        </div>
        <div
          className={`half_circle_right ${
            isTaskCompleted ? "task_completed" : "task_pending"
          } `}
        ></div>
      </div>

      <div className={`task_description ${!descOpen ? "" : "desc-open"} }`}>
        <div className="task_desc_content">{taskDescription}</div>
        <div className="task_date">
          {isTaskCompleted
            ? `Completed on ${new Date(completionDate).toUTCString()}`
            : `Created on ${new Date(createdDate).toUTCString()}`}
        </div>
      </div>

      {deleteModalOpen && (
        <DeleteConfirmationModal
          closeModal={() => setDeleteModalOpen(false)}
          taskHeading={taskHeading}
          taskId={taskId}
          taskType={taskType}
        />
      )}
    </div>
  );
}

export default Task;
