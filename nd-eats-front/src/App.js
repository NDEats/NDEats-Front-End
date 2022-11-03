
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';

function App() {
  const [user, setUser] = useState({});

  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential)
    var userObject = jwt_decode(response.credential);

    console.log(userObject);
    setUser(userObject);

   if (userObject.email_verified) { //user is valid
    //user attributes to be inserted into db
      var email = userObject.email;
      var firstName = userObject.given_name;
      var lastName = userObject.family_name;
      var picture = userObject.picture;
    }

    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event){
    setUser({}); //becomes empty object
    document.getElementById("signInDiv").hidden = false;
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

  //no user, want sign in button
  //if there is a user, show sign out button

  return (
    <div className="App">
      <header className="App-header">
      <h1> Welcome to NDeats</h1>
        <div id="signInDiv"></div>
      { Object.keys(user).length != 0 &&
        < button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }
      {user &&
        <div>
          <img src = {user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
        </header>
    </div>
  );
}

export default App;


