
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';

function App() {

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "236909895094-tk0l98a0nak3cq1ceidrk7iv2efo5978.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, []); //useEffect only runs again if [] changes
  return (
    <div className="App">
      <div id = "signInDiv"></div>
    </div>
  );
}

export default App;


