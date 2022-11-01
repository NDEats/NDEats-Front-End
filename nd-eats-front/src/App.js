import './App.css'
import AddOrder from './components/AddOrder'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <div className="orders">
        <header>
          <h1>NDeats</h1>
          <AddOrder/>
        </header>
      </div>
    </div>
  );
}

export default App;
