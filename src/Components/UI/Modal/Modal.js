import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
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
              <div className="label-input">
              <label>Select Input</label>
              <input id="name01">
              </input>
              </div>
              <datalist>
              <option value="Department"></option>
              </datalist>
              <br></br>
              <div className="label-input">
              <label>New Name:</label>
              <input type="text" id="name01"></input>
              </div>
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

export default Modal;