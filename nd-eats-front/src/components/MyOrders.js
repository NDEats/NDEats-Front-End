import './Orders.css'
import React from 'react';
import { Link } from "react-router-dom";


function MyOrders(props) {

    if((Object.keys(props.data).length) > 0){
      var data = props.data['items'].filter(dict => dict.ordererId.id ===  props.user['id']).sort((a,b) => b.readyBy.localeCompare(a.readyBy));

      var result = data.map((data)=> 
      <div className='order-info'>
        <p>Dropoff Location: {data['dropoff']}</p>
        <p>Pickup Location: {data['pickup']}</p>
        <p>Trip pay: ${data['tip']}</p>
        <p>Order ready by: {data['readyBy']}</p>
        <p>Orderer's name: {data['ordererId']['name']}</p>
        <p>Orderer's email: {data['ordererId']['email']}</p>
      </div>);
    }

  return (
    <div className='all-orders'>
        {result}
        <Link to="/about">
            <p style={{textAlign: 'center'}}>About us</p>
        </Link>
    </div>
  );
}

export default MyOrders;