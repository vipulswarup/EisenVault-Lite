import React, { Fragment, useState } from 'react';
import axios from 'axios';
import ModalForgetPswd from '../UI/Modal/ModalForgetPswd';
import useModal from '../UI/Modal/useModal';
import { setUserLocal } from '../../Utils/Common';
import './LoginPage.scss';

const LoginPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userName = useFormInput ('');
  const password = useFormInput ('');

  const handleLogin = () => {

    setError(null);
    setLoading(true);
 //{ userId: 'admin', password: 'Systest@987'}

    axios.post('https://systest.eisenvault.net/alfresco/api/-default-/public/authentication/versions/1/tickets', 
    { userId: userName.value, password: password.value}).then(response => {
      setLoading(false);
      setUserLocal(response.data.id, response.data.userId);
      // console.log(getToken, getUser, setUserLocal);
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
                <input type="text" {...userName} 
                id="user-name" placeholder="User Name" required/>
                  <br />
                <input type="password" {...password}
                placeholder="Password" id="pswd" required/>
            </div>

            <div id="btns_new">
                {/* <button id="btn01" type="button" onClick={handleLogin}>
                  Login</button> */}
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                <br />
                <button id="btn01" type="button" value={loading ? 'Loading...' : 'Login'} 
                onClick={handleLogin} disabled={loading}>
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