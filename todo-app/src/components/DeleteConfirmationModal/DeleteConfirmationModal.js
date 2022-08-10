import React, { useState } from "react";

import "./DeleteConfirmationModal.css";

import ModalContainer from "../ModalContainer/ModalContainer.js";
import apiCall from "../utils/apicalls";

function DeleteConfirmationModal({
  closeModal,
  taskId,
  taskHeading,
  taskType,
}) {
  const handleDelete = async () => {
    if(taskType === "TODO")
    {
        const {err}  = await apiCall("deleteToDoTask" , {taskId}) ;
        if(err)
        {
            //INCOMPLETE
            console.log(err) ;
            return ;
        }
        closeModal() ;
        window.location.reload() ;

    }
  };

  return (
    <ModalContainer>
      <div className="add_new_todo_container delete_container">
        <div className="heading">
          <h2>Delete Task</h2>
          <p>
            Are you sure you want to premanantely delete "{taskHeading}" task?
          </p>
        </div>

        <hr />

        <footer>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </footer>
      </div>
    </ModalContainer>
  );
}

export default DeleteConfirmationModal;
