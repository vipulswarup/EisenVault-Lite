import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const ModalAdd = ({ isShowing1, hide }) => isShowing1 ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <h2>Create Department</h2>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>
          <div>
            <p>
              <label>Name:</label>
              <input type="text" name="name">
              </input>
              <br></br>
              <label>URL:</label>
              <input type="text" name="url"></input>
              <br></br>
            <label>Description:</label>
            <textarea row="8" col="60"></textarea>
            </p>
          </div>
        </div>
        <div id="btns">
          <button>Rename</button>
          <button onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default ModalAdd;