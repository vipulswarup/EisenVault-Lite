import React, { Fragment } from 'react';
import './ChangePassword.scss';
import ProfilePic from "../Avtar/Avtar";

import '../../Containers/styles.scss';
import Search from '../SearchBar/SearchBar';;

function ChangePassword(props){
  
return(
    <Fragment>
        <div id="second_section">
            <h2>CHANGE PASSWORD</h2>
              <div>
                <Search />

                <ProfilePic />
                
                <div id="share-details-n">
                <div id="column-1">
                    <p>Enter Old Password</p>
                    <p>Enter New Password</p>
                    <p>Confirm Password</p>
                </div>
                <div id="column-2">
                    <input type="password"></input>
                    <input type="password"></input>
                    <input type="password"></input>
                </div>
                <button className="btn01" type="button">Change</button>
                <button className="btn02" type="button">Cancel</button>
            </div>
            </div>
            </div>
                
          </Fragment>
);

    }

  export default ChangePassword;