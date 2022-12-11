import './Orders.css'
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

function Orders(props) {
    async function handleSubmit(event){
      const the_dict = {'email': props.user['email']};
      const rawResponse = await fetch(`http://127.0.0.1:8000/update-order/${event['target']['id']}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(the_dict)
      });
      const content = await rawResponse.json();

      const response = await fetch("http://127.0.0.1:8000/orders/");
      const data = await response.json();
      props.dataSetter(data);
      return content;
    }

    if((Object.keys(props.data).length) > 0){
      var data = props.data['items'].sort((a,b) => b.readyBy.localeCompare(a.readyBy));
      
      var result = data.map((data)=> 
      <div className='order-info'>
        <p>Dropoff Location: {data['dropoff']}</p>
        <p>Pickup Location: {data['pickup']}</p>
        <p>Trip pay: ${data['tip']}</p>
        <p>Order ready by: {data['readyBy']}</p>
        <p>Orderer's email: {data['ordererId']['email']}</p>

        <Button variant="success" id={data['id']} onClick={handleSubmit}>
          Take Order
        </Button>

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

export default Orders;