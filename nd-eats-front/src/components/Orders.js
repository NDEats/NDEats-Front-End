import '../styling/Orders.css'
import React from 'react';
import Button from 'react-bootstrap/Button';

function Orders(props) {
  
  const getOrderData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/orders/");
      const data = await response.json();
      props.setOrderData(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(event){
    const userCredentials = {'email': props.user['email']};
    const orderId = event['target']['id'];
    try{
      var rawResponse = await fetch(`http://127.0.0.1:8000/update-order/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
      });
    }
    catch(err) {
      console.log(err);
    }

    getOrderData();

    return rawResponse;
  }

  if((Object.keys(props.orderData).length) > 0){
    var data = props.orderData['items'].sort((a,b) => a.readyBy.localeCompare(b.readyBy));
    var result = data.map((data)=> 
    <div className='order-info'>
      <p>Dropoff Location: {data['dropoff']}</p>
      <p>Pickup Location: {data['pickup']}</p>
      <p>Trip pay: ${data['tip']}</p>
      <p>Order ready by: {data['readyBy']}</p>
      <p>Orderer's name: {data['orderer_name']}</p>
      <p>Orderer's email: {data['orderer_email']}</p>

      <Button variant="success" id={data['id']} onClick={handleSubmit}>
        Take Order
      </Button>

    </div>);
  }

  return (
    <div className='all-orders'>
        {result}
    </div>
  );
}

export default Orders;
