import React, { useState } from "react";
import "./DailyTask.css";
import Task from "../Task/Task";
import add from "../../images/add.png";
import AddDailyTask from "../AddDailyTask/AddDailyTask";
import apiCall from "../utils/apicalls";

function DailyTask({ dailyTaskList, setDailyTaskList }) {
  const [openAddDailyTaskModal, setOpenAddDailyTaskModal] = useState(false);

  const closeAddDailyTaskModal = () => {
    setOpenAddDailyTaskModal(false);
  };

  const toggleDailyTaskCompletion = async (idx) => {
    const dailyTaskCopy = [...dailyTaskList];
    const item = { ...dailyTaskCopy[idx] };

    item.isTaskCompleted = !item.isTaskCompleted;
    if (item.isTaskCompleted) item.completionDate = new Date().getTime();
    else item.completionDate = "";

    dailyTaskCopy[idx] = item;

    const { err } = await apiCall("updateDailyTaskCompletion", {
      taskId: item._id,
      isTaskCompleted: item.isTaskCompleted,
      completionDate: item.completionDate,
    });
    if (err) {
      //INCOMPLETE
      console.log(err);
      return;
    }

    setDailyTaskList(dailyTaskCopy);
  };

  const handleReset = async () => {
    const { err } = await apiCall("updateDailyTaskCompletion", {
      isResetInitiated: true,
    });
    if (err) {
      //INCOMPLETE
      console.log(err);
      return;
    }

    setDailyTaskList((dailyTask) =>
      dailyTask.map((task) => {
        return { ...task, isTaskCompleted: false, completionDate: "" };
      })
    );
  };

  return (
    <div className="daily_task_container">
      <div className="daily_task_top_row">
        <h2 className="daily_task_heading">DAILY TASKS</h2>
        <button className="daily_task_reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="daily_tasks_section">
        {dailyTaskList.map((dailytask, idx) => (
          <Task
            key={dailytask._id}
            {...dailytask}
            taskType={"DailyTask"}
            localId={idx}
            toggleCompletion={toggleDailyTaskCompletion}
          />
        ))}
      </div>

      {/* Fixed Add Button */}
      <div
        onClick={() => setOpenAddDailyTaskModal(true)}
        className="add_task_button"
        title="Add new Task"
      >
        <img src={add} alt="" />
      </div>

      {openAddDailyTaskModal && (
        <AddDailyTask
          closeModal={closeAddDailyTaskModal}
          setDailyTaskList={setDailyTaskList}
        />
      )}
    </div>
  );
}

export default DailyTask;
