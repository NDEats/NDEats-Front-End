import { useState } from 'react';
import '../styling/Login.css';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function loginUser(credentials) {
    return fetch('http://127.0.0.1:8000/persons/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
        <div>
          <Button variant="success" type="submit">Submit</Button>
        </div>
        </div>
      </form>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
