import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styling/HomePage.css'
import AddOrder from './AddOrder'
import Orders from './Orders'
import About from './About'


function HomePage(props) {
  return (
    <div className="homePage">
        <div className="homePageChildDiv">
            <header>
                <h1>NDeats</h1>
                <Link to="/myorders">
                <Button variant="success">My Orders</Button>
                </Link>
                <AddOrder user={props.user} setOrderData={props.setOrderData}/>
            </header>
            <Orders orderData={props.orderData} user={props.user} setOrderData={props.setOrderData}/>
            <Link to="/about">
              <p style={{textAlign: 'center'}}>About us</p>
            </Link>
        </div>
    </div>
  );
}

export default HomePage;








