import React from 'react';
import Avatar from "react-avatar";
import { getUser } from "../../Utils/Common";
import Popup from "reactjs-popup";

const profileInitials= getUser().charAt(0);

const PopupExample = () => (
    <Popup trigger={<Avatar />} position="right"
    on="click">
      <div>
        Content here
      </div>
 
    </Popup>
  );

const ProfilePic = () => (
    <Avatar className='avtarStyle'
    color='#E07050' size='3rem'
    round 
    maxInitials= {2}
    name= {profileInitials}
    title= {getUser()}
    onClick= {PopupExample()}
    /> 
    )

export default ProfilePic;