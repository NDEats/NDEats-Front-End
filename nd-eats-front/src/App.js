import './styling/App.css'
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import About from './components/About'
import HomePage from './components/HomePage';
import MyOrdersPage from './components/MyOrdersPage';

function App() {
  const [orderData, setOrderData] = useState([]);

  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    if(userToken)
      return userToken;
    
    return null;
  }

  const session = getToken();

  const [token, setToken] = useState({'message': 'Not Logged in yet', 'id': 2});

  useEffect(() => {
    const getOrderData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/orders/");
        const data = await response.json();
        setOrderData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrderData();
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
        <Route path="/" element={<HomePage orderData={orderData} user={session} setOrderData={setOrderData}/>}/>
        <Route path="/myorders" element={<MyOrdersPage user={session}/>} />
        <Route path="/about" element={<About />}/>
        <Route path="*" element={<div><h1>404 Error</h1></div>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
