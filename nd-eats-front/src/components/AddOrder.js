import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddOrder(props) {
  const [show, setShow] = useState(false);
  const [obj, setObj] = useState({'pickup': 'Duncan Student Center', 'email': props.user['email']});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const currKey = e['target']['id'];
    const currVal = e['target']['value'];
    const addedKeyObj = obj;
    addedKeyObj[currKey] = currVal;
    setObj(addedKeyObj);
  }

  async function handleSubmit(obj){
    const rawResponse = await fetch('http://127.0.0.1:8000/orders/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
    const content = await rawResponse.json();
    handleClose();

    const response = await fetch("http://127.0.0.1:8000/orders/");
    const data = await response.json();
    props.dataSetter(data);
    
    return content;
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Make Order!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="pickup">
              <Form.Label>Pickup</Form.Label>
              <Form.Select onChange={handleChange}>
                  <option>Chick-fil-A</option>
                  <option>Modern Market</option>
                  <option>Hagerty Family Cafe</option>
                  <option>Smashburger</option>
                  <option>Taco Bell</option>
                  <option>Starbucks</option>
                  <option>Flip Kitchen</option>
                  <option>The Noodle Nook</option>
                  <option>Au Bon Pain</option>
                  <option>Garbanzo Mediterranean Fresh</option>
                  <option>Decio Cafe</option>
                  <option>The Gilded Bean</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="readyBy">
              <Form.Label>Ready By</Form.Label>
              <Form.Control
                type="time"
                min="0"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tip">
              <Form.Label>Tip</Form.Label>
              <Form.Control
                min="0"
                type="number"
                placeholder="$#"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="dropoff"
            >
              <Form.Label>Dropoff</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Duncan Hall"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={() => handleSubmit(obj)}>
                Submit
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddOrder;