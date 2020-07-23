import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const ModalTrash = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <h2>Delete Department</h2>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>
          <div>
            <h3>Please select the department you want to delete</h3>
           
            <div className="label-input">
              <label>Departments:</label>
              <input type="text" name="name">
              </input>
              </div>
              <br></br>
              <div className="label-input">
              <label>URL:</label>
              <input type="text" name="url"></input>
              </div>
              <br></br>
              <div className="label-input">
            <label>Description:</label>
            <textarea row="8" col="60"></textarea>
            </div>
            
            <div className="label-input">
            <input type="checkbox"></input>
            <label>Please confirm whether you want to delete the department and all its contents.</label>
            </div>
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

export default ModalTrash;