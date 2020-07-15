import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const RestoreFile = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
<React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <h2 className="Dh2">Restore Documents</h2>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="popup-n">
          <div className="content">

            <p className="content Dh3">
              Are you sure you want to Restore?
              <br />
              <br /> NOTE:The file will be restored from trash.
            </p>
          </div>
        </div>
        <div id="btns">
          <button >Restore</button>
          <button onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default RestoreFile;