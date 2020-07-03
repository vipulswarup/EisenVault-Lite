import React from 'react';
import { Link } from 'react-router-dom';
import  './NavigationItems.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '../NavigationItems/ProgressBar/ProgressBar';
import { faHome,
      faFileAlt, 
      faFolderOpen, 
      faShareAlt, 
      faShareSquare, 
      faHeadset, 
      faKey, 
      faSignOutAlt, 
      faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeUserLocal } from '../../../Utils/Common';

function NavigationItems(props) {

  // const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserLocal();
    props.history.push('/');
  }
  
  return (
    <div>
    <section className="SideNav">
      
      <div id="sidebar">
        <ul className="sidemenu">

          <div id="dashboard"> 
            <Link to="/dashboard">
              <li> <FontAwesomeIcon 
              className="Icon" 
              icon={faHome}/>
              <p>DASHBOARD</p>
              </li></Link> 
            
            </div>

          <div id="middle_bar">
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

              <Link to="/sharedWithMe">
              <li> <FontAwesomeIcon 
              className="Icon" 
              icon={faShareSquare}/>
              <p>SHARED WITH ME</p>
              </li></Link>
          </div>

          <div id="lower_bar">
              <li><a href="https://support.eisenvault.com/portal/home">
              <FontAwesomeIcon 
              className="Icon" 
              icon={faHeadset}/>
              <p>SUPPORT</p>
              </a></li>

              <li><a href="https://systest.eisenvault.net/share/page/"> 
              <FontAwesomeIcon 
              className="Icon" 
              icon={faFileAlt}/>
              <p>&nbsp;FULL VERSION</p>
              </a>
              </li>

            </div>


            <div id="trash">
              <Link to="/changePassword">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faKey}/>
                <p>CHANGE PASSWORD</p>
                </li></Link>

                <Link to="/myUploads">
                <li> 
                <FontAwesomeIcon 
                className="Icon" 
                icon={faSignOutAlt}/>
                <p>SIGN OUT</p>
                </li>
                </Link>

                {/* <input type="button" onClick={handleLogout} value="Logout" /> */}

                <Link to="/trashDisplay">
                <li> <FontAwesomeIcon 
                className="Icon" 
                  icon={faTrash}/>
                  <p>TRASH</p>
                  </li></Link>

            </div>

            <ProgressBar />
            <h5>1.8GB out of 5GB used.</h5>
          
        </ul>
      
      </div>
    </section>
  </div> 
  );
}

export default NavigationItems;