import './App.css'
import AddOrder from './components/AddOrder'
import Orders from './components/Orders'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

function App() {
  // eslint-disable-next-line
  const [data, setData] = useState([]);

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

  return (
    <div className="App">
      <div className="orders">
        <header>
          <h1>NDeats</h1>
          <AddOrder/>
        </header>
        <Orders data={data}/>
      </div>
    </div>
  );
}

export default App;
