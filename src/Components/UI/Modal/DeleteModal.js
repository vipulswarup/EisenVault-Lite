import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const DeleteModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <h2>Rename Department</h2>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="popup-n">
          <div className="content">
            <p>
              <label>Delete Documents</label>
              <input id="name01">
              </input>
              <datalist>
              <option value="Department"></option>
              </datalist>
              <br></br>
              <label>New Name:</label>
              <input type="text" id="name01"></input>
            </p>
          </div>
        </div>
        <div id="btns">
          <button id="btn03">Rename</button>
          <button id="btn04" onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default DeleteModal;