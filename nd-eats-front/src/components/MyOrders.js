import '../styling/MyOrders.css'
import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';



function MyOrders(props) {
  const [userOrderData, setUserOrderData] = useState([]);
  const [submitCounter, setSubmitCounter] = useState(0);


  async function handleSubmit(event){
    try{
      const orderId = event['target']['id'];
      var rawResponse = await fetch(`http://127.0.0.1:8000/update-order/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      });
    }
    catch(err){
      console.log(err);
    }
    setSubmitCounter(submitCounter + 1);

    return rawResponse;
  }

  useEffect(() => {
    const getPersonOrders = async (user) => {
      try{
      const response = await fetch(`http://127.0.0.1:8000/persons/${user['id']}`);
      const userOrders = await response.json();
      setUserOrderData(userOrders);
      }
      catch(err){
        console.log(err);
      }
    }
    
    getPersonOrders(props.user);

  }, [submitCounter, props.user]);


  if((Object.keys(userOrderData).length) > 0){
    var current_orders = userOrderData['current_orders'];
    var current_orders_result = current_orders.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyby']}</p>
      <p>Deliverer's name: {data['deliverer_name']}</p>
      <p>Deliverer's email: {data['deliverer_email']}</p>
    </div>);

    var old_orders = userOrderData['old_orders'];
    var old_orders_result = old_orders.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyby']}</p>
      <p>Deliverer's name: {data['deliverer_name']}</p>
      <p>Deliverer's email: {data['deliverer_email']}</p>
    </div>);

    var pickedup_orders = userOrderData['pickedup_orders'];
    var pickedup_orders_result = pickedup_orders.map((data)=> 
    <div className='my-order-info'>
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
    <div className='all-my-orders'>
        <p className='my-orders-title'>Picked up orders</p>
        {pickedup_orders_result}
        <p className='my-orders-title'>Current orders</p>
        {current_orders_result}
        <p className='my-orders-title'>Old orders</p>
        {old_orders_result}
    </div>
  );
}

export default MyOrders;
