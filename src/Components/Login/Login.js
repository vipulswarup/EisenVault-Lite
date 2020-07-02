import React, { Fragment, useState } from 'react';
import axios from 'axios';
import ModalForgetPswd from '../UI/Modal/ModalForgetPswd';
import useModal from '../UI/Modal/useModal';
import { setUserSession } from '../../Utils/Common';
import './LoginPage.scss';

const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://systest.eisenvault.net/alfresco/api/-default-/public/authentication/versions/1/tickets', 
    { userId: 'admin', password: 'Systest@987' }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const {isShowing: isShowing1,toggle: toggle1} = useModal();

    return(

      <Fragment>
              <ModalForgetPswd isShowing = {isShowing1} hide={toggle1}/>

        <div id="bg-bar">

        <div className="login-box">
            <div className="login-details">
                <input type="text" id="user-name" placeholder="User Name" />
                  <br />
                <input type="password" placeholder="Password" id="pswd" />
            </div>

            <div id="btns_new">
                <button id="btn01" type="button" onClick={handleLogin}>
                  Login</button>
                <br />
                                
                  <button id="btn02" type="button" onClick={toggle1}>
                    Forgot Password?</button>
                    
            </div> 
        </div>  
        </div>
    </Fragment>
);
  
}

// const useFormInput = initialValue => {
//   const [value, setValue] = useState(initialValue);
 
//   const handleChange = e => {
//     setValue(e.target.value);
//   }
//   return {
//     value,
//     onChange: handleChange
//   }
// }

export default LoginPage;