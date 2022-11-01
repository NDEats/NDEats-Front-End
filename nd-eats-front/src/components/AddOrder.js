import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function AddOrder() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Make an order!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.Location">
              <Form.Label>Location</Form.Label>
              <Form.Select>
                  <option>Duncan Student Center</option>
                  <option>Lafortune Student Center</option>
                  <option>Hesburgh</option>
                  <option>Hammes Bookstore</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.NbrItems">
              <Form.Label>Number of Items</Form.Label>
              <Form.Control
                type="number"
                min="0"
                placeholder="1,2,3,..."
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.Pay">
              <Form.Label>Pay</Form.Label>
              <Form.Control
                min="0"
                type="number"
                placeholder="$#"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.Fullname"
            >
              <Form.Label>Full name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Jane Doe"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddOrder;