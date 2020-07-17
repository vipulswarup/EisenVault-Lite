import React from 'react';
import Avatar from "react-avatar";
import { getUser } from "../../Utils/Common";

const profileInitials= getUser().charAt(0);

const ProfilePic = () => (
    <Avatar className='avtarStyle'
    color='#E07050' size='3rem'
    round 
    maxInitials= {2}
    name= {profileInitials}
    title= {getUser()}
    /> 
    )

export default ProfilePic;