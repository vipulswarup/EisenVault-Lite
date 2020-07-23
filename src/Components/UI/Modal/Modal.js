import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './Modal.scss';

import {getToken} from  "../../../Utils/Common";

const renameDepartment = () => {
    axios.get('https://systest.eisenvault.net//alfresco/api/-default-/public/alfresco/versions/1/nodes/8af19692-0daa-4355-8025-d8c471de2a51',
    {
      headers:
      {
        Authorization: `Basic ${btoa(getToken())}`
      }
      }).then((response) => {
    console.log(response)
  })
  }

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
            
          </div>
        </div>
        <div id="btns">
          <button id="btn03" onClick={renameDepartment()}>Rename</button>
          <button id="btn04" onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;