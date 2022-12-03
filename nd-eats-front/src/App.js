import './App.css'
import AddOrder from './components/AddOrder'
import Orders from './components/Orders'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Signup from './components/Signup';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  if(userToken)
    return userToken;
  
  return null;
}


function App() {
  // eslint-disable-next-line
  const [data, setData] = useState([]);
  const session = getToken();

  const [token, setToken] = useState({'message': 'Not Logged in yet', 'id': 2});

  const getData = async () => {
    const response = await fetch("http://127.0.0.1:8000/orders/");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    getData()
      .then(data => setData(data))
      .catch(error => {
        console.log(error)
      });
  }, []);

  if(token['id'] === 2 && !session) {
    return (<div className='credentials-page'>
              <Login setToken={setToken} />
              <Signup />
            </div>)
  }
  else if(token['id'] === 0 && !session){
    return (<div className='credentials-page'>
              <Login setToken={setToken} />
              <span style={{ color: 'red' }}>Incorrect username or password!</span>
              <Signup />
            </div>)
      
  }
  else if(!session){
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <div className="App">
          <div className="orders">
            <header>
              <h1>NDeats</h1>
              <AddOrder user={session}/>
            </header>
            <Orders data={data}/>
          </div>
        </div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
