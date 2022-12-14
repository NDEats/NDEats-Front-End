import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Signup() {
  const [show, setShow] = useState(false);
  const [signUpForm, setsignUpForm] = useState({});

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  
  const handleChange = (e) => {
    const currKey = e['target']['id'];
    const currVal = e['target']['value'];
    const currSignUpForm = signUpForm;
    currSignUpForm[currKey] = currVal;
    setsignUpForm(currSignUpForm);
  }

  async function handleSubmit(obj){
    try{
      var rawResponse = await fetch('http://127.0.0.1:8000/persons/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpForm)
      });
    }
    catch(err){
      console.log(err);
    }

    const userInfo = await rawResponse.json();

    if(userInfo['id'] === 0){
      alert("An account already exists with this email.");
      return userInfo;
    }

    handleClose();
    
    alert("Successfully signed up!")
    return userInfo;
  }

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Sign up!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="name"
            >
              <Form.Label>Full name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Jane Doe"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="venmo"
            >
              <Form.Label>Venmo</Form.Label>
              <Form.Control 
                type="text"
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

export default Signup;
