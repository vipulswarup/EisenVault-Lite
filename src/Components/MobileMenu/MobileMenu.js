import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '../Navigation/NavigationItems/ProgressBar/ProgressBar';
import './MobileMenu.scss';
import { faHome,
  faFileAlt, 
  faFolderOpen, 
  faShareAlt, 
  faShareSquare, 
  faHeadset, 
  faKey, 
  faSignOutAlt, 
  faTrash } from "@fortawesome/free-solid-svg-icons";

const MobileMenu = () => (
    <nav role="navigation">
        <div id="menuToggle">
        
            <input type="checkbox" />
            
            <span></span>
            <span></span>
            <span></span>

            <ul id="menu">
              <Link to="/dashboard">

                <li><FontAwesomeIcon 
                className="Icon" 
                icon={faHome}/>
                  <p>DASHBOARD</p>
                </li></Link> 

              <Link to="/documentsList">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faFileAlt}/>
                <p> &nbsp;DOCUMENTS</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faFolderOpen}/>
                <p>MY UPLOADS</p>
                </li></Link>

              <Link to="/manageShares">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faShareAlt}/>
                <p>&nbsp;MANAGE SHARES</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faShareSquare}/>
                <p>SHARED WITH ME</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faHeadset}/>
                <p>SUPPORT</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faFileAlt}/>
                <p>&nbsp;FULL VERSION</p>
                </li></Link>

              <Link to="/changePassword">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faKey}/>
                <p>CHANGE PASSWORD</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faSignOutAlt}/>
                <p>SIGN OUT</p>
                </li></Link>

              <Link to="/myUploads">
                <li> <FontAwesomeIcon 
                className="Icon" 
                  icon={faTrash}/>
                  <p>TRASH</p>
                  </li></Link>

            <ProgressBar />
            <h5>1.8GB out of 5GB used.</h5>
            </ul>
        </div>
      </nav>
);

export default MobileMenu;