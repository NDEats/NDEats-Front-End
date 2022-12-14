import './Orders.css'
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const getPersonOrders = async (the_user) => {
    const response = await fetch(`http://db8.cse.nd.edu:5005/persons/${the_user['id']}`);
    const data = await response.json();
    return data;
};



function MyOrders(props) {
  const [data, setData] = useState([]);

  async function handleSubmit(event){
    const rawResponse = await fetch(`http://127.0.0.1:8000/update-order/${event['target']['id']}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    });
    const content = await rawResponse.json();
  
    getPersonOrders(props.user)
      .then(data => setData(data))
      .catch(error => {
        console.log(error)
      });
    return content;
  }

  useEffect(() => {
    getPersonOrders(props.user)
      .then(data => setData(data))
      .catch(error => {
        console.log(error)
      });
  }, [props.user]);


  if((Object.keys(data).length) > 0){
    var current_orders = data['current_orders'];
    var current_orders_result = current_orders.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyby']}</p>
      <p>Deliverer's name: {data['deliverer_name']}</p>
      <p>Deliverer's email: {data['deliverer_email']}</p>
    </div>);

    var old_orders = data['old_orders'];
    var old_orders_result = old_orders.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyby']}</p>
      <p>Deliverer's name: {data['deliverer_name']}</p>
      <p>Deliverer's email: {data['deliverer_email']}</p>
    </div>);

    var pickedup_orders = data['pickedup_orders'];
    var pickedup_orders_result = pickedup_orders.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyby']}</p>
      <p>Orderer's name: {data['orderer_name']}</p>
      <p>Orderer's email: {data['orderer_email']}</p>
      <Button variant="success" id={data['id']} onClick={handleSubmit}>
          Delivery Done!
        </Button>
    </div>);
  }


  return (
    <div className='all-orders'>
        <p className='my-orders-title'>Picked up orders</p>
        {pickedup_orders_result}
        <p className='my-orders-title'>Current orders</p>
        {current_orders_result}
        <p className='my-orders-title'>Old orders</p>
        {old_orders_result}
        <Link to="/about">
            <p style={{textAlign: 'center'}}>About us</p>
        </Link>
    </div>
  );
}

export default MyOrders;
