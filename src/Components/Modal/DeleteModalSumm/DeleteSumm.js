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
      <button className="btn-continue btn-d" onClick={props.deleted}>DELETE</button>
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
