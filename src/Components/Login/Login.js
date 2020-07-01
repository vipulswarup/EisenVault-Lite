import React, { Fragment, useState } from 'react';
import axios from 'axios';
import ModalForgetPswd from '../UI/Modal/ModalForgetPswd';
import useModal from '../UI/Modal/useModal';
import { setUserSession } from '../../Utils/Common';

const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://systest.eisenvault.net/alfresco/api/-default-/public/authentication/versions/1/tickets', 
    { username: username.value, password: password.value }).then(response => {
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

        <body id="bg-bar">

        <div class="login-box">
            <div class="login-details">
                <input type="text" id="user-name" placeholder="User Name" />
                  <br />
                <input type="password" placeholder="Password" id="pswd" />
            </div>

            <div id="btns_new">
              <a href="#"> 
                <button id="btn01" type="button">Login</button></a>
                <br />
                <a href="#">                
                  <button id="btn02" type="button" onClick={toggle1}>
                    Forgot Password?</button>
                </a>

                    {/* <div id="popup2" class="overlay">
                        <div class="popup-new">
                            <h3>Reset Password Dialog</h3>
                            <a class="close" href="#">&times;</a>
                            <div class="content">
                                <p>
                                  <label>Username:</label><br />
                                  <input type="text" id="name" name="name" />
                                  <br />
                                </p>
            
                                <div id="btns">
                                    <button id="btn03" type="button">Reset</button>
                                    <button id="btn04" type="button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
            </div> 
        </div>  
        </body>
    </Fragment>
);
  
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default LoginPage;