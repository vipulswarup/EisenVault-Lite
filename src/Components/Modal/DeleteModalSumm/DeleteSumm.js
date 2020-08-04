import React, { Fragment } from "react";
import "./Deletesumm.scss";

export const DeleteSummmary = props => {
  return (
    <Fragment>
      <h2 className="Dh2">Delete Documents</h2>
      <p className="content Dh3">
        Are you sure you want to delete selected files?
        <br />
        <br /> NOTE:The deleted file will be stored in trash for 30 days.
      </p>

      <button className="btn-cancel btn-c" onClick={props.clicked}>
        CANCEL
      </button>

      <button className="btn-continue btn-d" onClick={props.deleted}>
        DELETE
      </button>
    </Fragment>
  );
};

export const RestoreSummary= props =>{
  return (
    <Fragment>
      <h2 className="Dh2">Restore Documents</h2>
      <p className="content Dh3">
        Are you sure you want to Restore selected files?
      </p>
       <button className="btn-cancel btn-c" onClick={props.clicked}>
        CANCEL
      </button>
      <button className="btn-continue btn-d" onClick={props.deleted}>RESTORE</button>
    </Fragment>

  )
}

export const CreateDepartment = props =>{
  return (
    <Fragment>
       <div className="modal-header">
              <h2>Create Department</h2>
            </div>
            <div>
          <div>
           
            <div className="label-input">
              <label>Name:</label>
              <input type="text" name="name" {...props.departmentTitle}>
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
          <button onClick={props.createDept} className="btn-continue">Create</button>
          <button onClick={props.clicked} className="btn-cancel">Cancel</button>
        </div>
    </Fragment>

  )
}

export  const RenameDepartment = props =>{
  return(
    <Fragment>
      <div className="modal-header">
          <h2>Rename Department</h2>
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
          <button className="btn-continue" >Rename</button>
          <button className="btn-cancel" onClick={props.clicked}>Cancel</button>
        </div>
    </Fragment>
  )
}

export const ForgotPassword = props => {
  return(
    <Fragment>
      <div className="modal-header">
        <h2>Forgot Password</h2>
        </div>
        <div>
          <div>
            <h3>You will recieve an email link to reset password.</h3>
           
            <div className="label-input">
              <label>Username:</label>
              <input type="text" {...props.forgotPswdUserName}>
              </input>
            </div>

          </div>
        </div>

        <div id="btns">
          <button className="btn-continue-p" 
          onClick={props.resetPassword}>Email</button>
          <button onClick={props.clicked} className="btn-cancel-p">
            Cancel</button>
        </div>
    </Fragment>
  )
}

export const DeleteDepartment = (props) => {
  return(
    <Fragment>
      <div className="modal-header">
        <h2>Delete Department</h2>
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
          <button className="btn-continue">Delete Department</button>
          <button onClick={props.clicked} className="btn-cancel">Cancel</button>
        </div>
    </Fragment>
  )
}