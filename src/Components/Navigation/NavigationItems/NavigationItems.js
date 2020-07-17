import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { getUser } from '../../../Utils/Common';

function NavigationItems() {

  const user = getUser();
 const history = useHistory();

  // handle click event of logout button
  const handleLogout = () => {
    // removeUserLocal();
    history.push('/');
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
              <li><a target="_blank" rel="noopener noreferrer"
              href="https://support.eisenvault.com/portal/home">
              <FontAwesomeIcon 
              className="Icon" 
              icon={faHeadset}/>
              <p>SUPPORT</p>
              </a></li>

              <li><a target="_blank" rel="noopener noreferrer"
              href="https://systest.eisenvault.net/share/page/"> 
              <FontAwesomeIcon 
              className="Icon" 
              icon={faFileAlt}/>
              <p>&nbsp;FULL VERSION</p>
              </a>
              </li>

            </div>

            <div id="trash">
            <Link to="/trashDisplay">
                <li> <FontAwesomeIcon 
                className="Icon" 
                  icon={faTrash}/>
                  <p>TRASH</p>
                  </li></Link>

              <Link to="/changePassword">
                <li> <FontAwesomeIcon 
                className="Icon" 
                icon={faKey}/>
                <p>CHANGE PASSWORD</p>
                </li></Link>

                <li>
                <FontAwesomeIcon 
                className="Icon" 
                icon={faSignOutAlt}/>
                <input type="button" className="signOut" onClick={handleLogout} value="Logout" />
                </li>

                {user==='admin' && <ProgressBar />}
 
            </div>

          
        </ul>
      
      </div>
    </section>
  </div> 
  );
}

export default NavigationItems;