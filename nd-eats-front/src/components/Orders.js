import React from 'react';
import './Orders.css'


function Orders(props) {
    const orders = [];

    for (let i = 0; i < props.data['count']; i++) {
        if(props.data['items'][i]['available'])
      orders.push(<div className='order-info'>
                    <p>Dropoff Location: {props.data['items'][i]['dropoff']}</p>
                    <p>Pickup Location: {props.data['items'][i]['pickup']}</p>
                    <p>Trip pay: ${props.data['items'][i]['tip']}</p>
                    <p>Order ready by: {props.data['items'][i]['readyBy']}</p>
                    <p>Orderer's name: {props.data['items'][i]['delivererId']['name']}</p>
                    <p>Orderer's email: {props.data['items'][i]['delivererId']['email']}</p>
                    <button id={props.data['items'][i]['id']}>
                        Take Order
                    </button>
                  </div>);
    }

  return (
    <div className='all-orders'>
        {orders}
    </div>
  );
}

export default Orders;