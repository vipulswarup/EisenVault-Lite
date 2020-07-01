import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const ModalForgetPswd = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <p>
            <label>Username:</label><br />
            <input type="text" id="name" name="name" />
            <br />
        </p>          
        
        <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
        <div id="btns">
          <button id="btn03">Reset</button>
          <button id="btn04" onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default ModalForgetPswd;