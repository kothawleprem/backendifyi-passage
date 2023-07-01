import React from 'react'
import "@passageidentity/passage-elements/passage-auth";
import "./PassageLogin.css"

import NavBar from '../Components/NavBar/NavBar';

const PassageLogin = () => {
  return (
    <>
      <NavBar />
      <div className="authComp">
        <passage-auth app-id="your-app-id"></passage-auth>
      </div>
    </>
  );
}

export default PassageLogin