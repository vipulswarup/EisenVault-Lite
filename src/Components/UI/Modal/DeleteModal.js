import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import axios from 'axios';
import {getToken} from "../../../Utils/Common"

//for calling delete Api
export function DeleteApiRequest(){
   useEffect(()=>{
    axios.delete(`https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/nodes/f2cb61a1-9b66-4b1c-89a8-5b9a55d63c8a`, 
     {headers:{
       Authorization: `Basic ${btoa(getToken())}`
        }
      }).then((response) => {
        console.log(response.data)}
        ).catch(error=>console.error(error));
     },[]);
    
}

const DeleteModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
        <h2 className="Dh2">Delete Documents</h2>
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="popup-n">
          <div className="content">

            <p className="content Dh3">
              Are you sure you want to delete?
              <br />
              <br /> NOTE:The deleted file will be stored in trash for 30 days.
            </p>
          </div>
        </div>
         <div id="btns">
          <button onClick={DeleteApiRequest()}>Delete</button>
          <button onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default DeleteModal;