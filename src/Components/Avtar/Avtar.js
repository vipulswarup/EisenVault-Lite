import React, {useState , useEffect} from 'react';
import Avatar from "react-avatar";
import { getUser } from "../../Utils/Common";

const ProfilePic = () => {
    const [profileInitials, setProfileInitials] = useState(null);

    useEffect(() => {
        setProfileInitials (getUser() ? getUser().charAt(0) : "");
    }, [])

    return( 
        <Avatar className='avtarStyle'
        color='#E07050' size='3rem'
        round 
        maxInitials= {2}
        name= { profileInitials } 
        title= { getUser() }
        /> 
    )
}

export default ProfilePic;