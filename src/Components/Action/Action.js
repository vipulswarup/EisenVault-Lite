import React, { useState } from "react";
import Modal from "react-modal";
import "./Action.scss";
// import "../../css/styles.css";
function Action(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  
  return (
    <div>
      <label>Action </label>
      <select
        id="action-t"
         onChange={() => {
           setmodalIsOpen(true);
         }}
      >
        <option id="option" value="delete-a">Delete All</option>
        <option id="option" value="delete-s">Delete Selected</option>
      </select>
      
       <Modal
        className="Modal"
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setmodalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor:"rgba(0, 0, 0, 0.6)"
          }
        }}
        ariaHideApp={false}
      >
        <h2 className="Dh2">Delete Documents</h2>
        <p className="content Dh3">
          Are you sure you want to delete selected files?
          <br />
          <br /> NOTE:The deleted file will be stored in trash for 30 days.
        </p>

        <button
          className="btn-cancel btn-c"
          onClick={() => setmodalIsOpen(false)}>
          CANCEL
        </button>
        <button className="btn-continue btn-d" onClick={props.deleted}>DELETE</button>
      </Modal>
    </div>
    
  );
  
}
export default Action;
