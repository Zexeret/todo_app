import React from 'react';
import "./ModalContainer.css";

function ModalContainer({children}) {
  return (
    <div className="modal_container">
      {children}
    </div>
  );
}

export default ModalContainer;