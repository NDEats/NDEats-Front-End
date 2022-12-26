import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styling/HomePage.css'
import AddOrder from './AddOrder'
import Orders from './Orders'


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
        </div>
    </div>
  );
}

export default HomePage;








