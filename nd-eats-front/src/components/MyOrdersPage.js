import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../styling/MyOrdersPage.css'
import MyOrders from './MyOrders';

function MyOrdersPage(props) {
  return (
    <div className="myOrdersPage">
        <div className="myOrdersPageChildDiv">
            <header>
                <h1>My Orders</h1>
                <Link to="/">
                <Button variant="success">Home</Button>
                </Link>
            </header>
            <MyOrders user={props.user}/>
        </div>
    </div>
  );
}

export default MyOrdersPage;








