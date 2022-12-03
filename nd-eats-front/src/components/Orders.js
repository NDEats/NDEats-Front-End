import './Orders.css'
import React from 'react';
import Button from 'react-bootstrap/Button';

function Orders(props) {
    async function handleSubmit(event){
      console.log(event['target']['id']);
    }

    if((Object.keys(props.data).length) > 0){
      const data = props.data['items'];
      var result = data.map((data)=> 
      <div className='order-info'>
        <p>Dropoff Location: {data['dropoff']}</p>
        <p>Pickup Location: {data['pickup']}</p>
        <p>Trip pay: ${data['tip']}</p>
        <p>Order ready by: {data['readyBy']}</p>
        <p>Orderer's name: {data['ordererId']['name']}</p>
        <p>Orderer's email: {data['ordererId']['email']}</p>

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