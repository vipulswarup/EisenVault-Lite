import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, 
  faPlus, 
  faTrashAlt } 
  from "@fortawesome/free-solid-svg-icons";

import "./IconBar.scss";

const iconBar = (props) => {
  return(
  <div className="icons">
    <div>
      <FontAwesomeIcon icon={faPen} onClick={props.toggle1}/>
    </div>

    <div >
      <FontAwesomeIcon icon={faPlus} onClick={props.toggle2}/>
    </div>

    <div>
      <FontAwesomeIcon icon={faTrashAlt} onClick={props.toggle3}/>
    </div>
    
  </div>
)}

export default iconBar;
