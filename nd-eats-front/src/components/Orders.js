import './Orders.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Orders(props) {
    const orders = [];
    const [show, setShow] = useState(false);
    const [obj, setObj] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (e) => {
      const currKey = e['target']['id'];
      const currVal = e['target']['value'];
      const addedKeyObj = obj;
      addedKeyObj[currKey] = currVal;
      setObj(addedKeyObj);
    }
    async function handleSubmit(obj, event){
      console.log(obj);
      console.log(event['target']['id']);
      handleClose();
    }

    for (let i = 0; i < props.data['count']; i++) {
        if(props.data['items'][i]['available']){
          orders.push(<div className='order-info'>
                    <p>Dropoff Location: {props.data['items'][i]['dropoff']}</p>
                    <p>Pickup Location: {props.data['items'][i]['pickup']}</p>
                    <p>Trip pay: ${props.data['items'][i]['tip']}</p>
                    <p>Order ready by: {props.data['items'][i]['readyBy']}</p>
                    <p>Orderer's name: {props.data['items'][i]['ordererId']['name']}</p>
                    <p>Orderer's email: {props.data['items'][i]['ordererId']['email']}</p>

                    <>
                      <Button variant="success" onClick={handleShow}>
                        Take Order
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Order Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form>
                            <Form.Group className="mb-3" controlId="currEmail">
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                                onChange={handleChange}
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="success" type="submit" onClick={(event) => handleSubmit(obj, event)}>
                                Submit
                            </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  </div>);
        }
    }

  return (
    <div className='all-orders'>
        {orders}
    </div>
  );
}

export default Orders;