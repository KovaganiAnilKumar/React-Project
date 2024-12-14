import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

function FacebookLoginComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const responseFacebook = (response) => {
    console.log('Login Success:', response);
    if (response.name) {
      setUserName(response.name);
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <FacebookLogin
          appId="1716284479212667" // Replace with your actual App ID
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      ) : (
        <h2>Welcome {userName}</h2>
      )}
    </>
  );
}

export default FacebookLoginComponent;
