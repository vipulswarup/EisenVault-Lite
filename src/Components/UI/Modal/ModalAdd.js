import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import {getToken} from  "../../../Utils/Common";
import axios from 'axios';

// const OnChangeHandler = (e) =>  {
//   const [departmentName , setDepartmentName ] = useState('');
//   setDepartmentName(e.target.value);
// }
// const UseFormInput = initialValue => {
//   const [value, setValue] = useState(initialValue);
 
//   const handleChange = e => {
//     setValue(e.target.value);
//   }
//   return {
//     value,
//     onChange: handleChange
//   }
// } 
// const CreateDepartment = () => {
//   // const departmentName = UseFormInput ('');
//   axios.post('https://systest.eisenvault.net/alfresco/api/-default-/public/alfresco/versions/1/sites',{
//     title: "Shrishti" , visibility: "private"
//   },
//   {
//     headers:
//           {
//             Authorization: `Basic ${btoa(getToken())}`
//           }
//   }).then(response => {
//     console.log(response)
//   }).catch(error => 
//     console.log(error));
// }

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
           
            <div className="label-input">
              <label>Name:</label>
              <input type="text" name="name" >
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
            
          </div>
        </div>
        <div id="btns">
          <button >Create</button>
          <button onClick={hide}>Cancel</button>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default ModalAdd;