import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, 
  faPlus, 
  faTrashAlt } 
  from "@fortawesome/free-solid-svg-icons";

import "./IconBar.scss";

import {getUser} from  "../../Utils/Common";

const IconBar = (props) => {
  const user = getUser();
  return(
  <div className="icons">
    <h3 className="departments">My Departments</h3>
    {/* <div>
      <FontAwesomeIcon icon={faPen} onClick={props.toggleedit} className="icon-item"/>
    </div> */}

    <div >
    { user === 'admin' &&
      <FontAwesomeIcon icon={faPlus} onClick={props.toggleadd} className="icon-item"/>}
    </div>
    
  </div>
)}

export default IconBar;

