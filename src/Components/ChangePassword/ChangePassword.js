import React, { Fragment} from 'react';
import './ChangePassword.scss';
import '../../Containers/styles.scss';
import Avatar from "react-avatar";
import Search from '../SearchBar/SearchBar';;


function ChangePassword(props){
  
return(
    <Fragment>
         <div id="second_section">
          <div>
            <h2>Trash</h2>
            <Search />

            <Avatar className='avtarStyle'
                color='#E07050' size='3rem'
                round 
                name="Shayane Basu" /> 
             
      
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
                 <footer className="base-footer">

                     <p>Copyright © 2020 
                     <a href="https://www.argali.in/">
                      Argali Knowledge Services Pvt. Ltd., New Delhi, India</a></p>
                 </footer>
          </div> </Fragment>
)
    }

  export default ChangePassword;