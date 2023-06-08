import React from 'react';
import FacebookLogin from 'react-facebook-login';
import styles from '../styles/facebookLogin.css'
const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const responseFacebook = (response) => {
    console.log(response)
    console.log(responseFacebook)
    if (response.accessToken) {
      // Prijava je uspešna
      onLoginSuccess(response.accessToken);
    } else {
      // Prijava nije uspešna
      onLoginFailure(response);
    }
  };

  return (
    <FacebookLogin
      appId="2512043105620404"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      cssClass="facebook-login-button"
        render={(renderProps) => (
            <button onClick={renderProps.onClick}>Prijavi se preko Facebook-a</button>
        )}
    />
  );
};

export default FacebookLoginButton;
