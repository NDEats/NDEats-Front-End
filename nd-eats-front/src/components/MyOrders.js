import './Orders.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const getPersonOrders = async (the_user) => {
    const response = await fetch(`http://127.0.0.1:8000/persons/${the_user['id']}`);
    const data = await response.json();
    return data;
};


function MyOrders(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPersonOrders(props.user)
      .then(data => setData(data))
      .catch(error => {
        console.log(error)
      });
  }, [props.user]);

    if((Object.keys(data).length) > 0){
      var my_orders = data['current_orders'].sort((a,b) => b.readyby.localeCompare(a.readyby));
      //var my_past_orders = data['old_orders'].sort((a,b) => b.readyby.localeCompare(a.readyby));
      //var orders_to_deliver = data['picked_up_orders'].sort((a,b) => b.readyby.localeCompare(a.readyby));

      var result = my_orders.map((data)=> 
      <div className='order-info'>
        <p>Dropoff Location: {data['dropoff']}</p>
        <p>Pickup Location: {data['pickup']}</p>
        <p>Trip pay: ${data['tip']}</p>
        <p>Order ready by: {data['readyby']}</p>
        <p>Orderer's name: {data['orderer_name']}</p>
        <p>Orderer's email: {data['orderer_email']}</p>
        <p>Deliverer's name: {data['deliverer_name']}</p>
        <p>Deliverer's email: {data['deliverer_email']}</p>
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