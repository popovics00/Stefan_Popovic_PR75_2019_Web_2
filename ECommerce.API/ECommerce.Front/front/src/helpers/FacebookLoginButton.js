import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from '../styles/facebookLogin.css'
import userServices from '../services/userServices';
import { Link, useNavigate } from "react-router-dom";

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    if (response.accessToken) {
      userServices.facebookLogin(response.accessToken)
      onLoginSuccess(response.accessToken);
    } else {
      navigate('/')
      onLoginFailure(response);
    }
  };

  return (
    <FacebookLogin
      appId="921223238985384"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="facebook-login-button"
        render={(renderProps) => (
            <button onClick={renderProps.onClick}>FACEBOOK LOGIN</button>
        )}
    />
  );
};

export default FacebookLoginButton;

