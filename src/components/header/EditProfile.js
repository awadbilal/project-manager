import React, { useState } from 'react';
import { Container, Row, Form, Button, Image } from 'react-bootstrap';
import db from '../../firebaseConfig';
import image from '../images/profile.jpg';

function EditProfile( { registeredData, loggedInUser, setLoggedInUser} ) {

  const [formData, setFormData] = useState(loggedInUser);
  const currentUser = registeredData.filter(user => user.email === loggedInUser.email);
  const otherUsers = registeredData.filter(user => user.email !== loggedInUser.email);

  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    
    for (let i = 0; i < otherUsers.length; i++) {
      if(otherUsers[i].username === formData.username) return alert('Username is already taken!');
      if(otherUsers[i].email === formData.email) return alert('Email is already taken!');
    }

    if (formData.occupation === '') return alert('Please select an occupation');

    if(formData.occupation === 'manager') db.collection('projectManagers').doc(currentUser.id).update(formData);
    else db.collection('developer').doc(currentUser.id).update(formData);
    setLoggedInUser(formData);

    setFormData({occupation: '', username: '', email: '', password: ''});
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <div>
          <Image src={image} roundedCircle className='loginImage' />
        </div>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name='username' value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} onChange={handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
            </Form.Group>

            <div className='col'>
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  <input className="form-check-input" id="flexRadioDefault1" type='radio' name='occupation' value='manager' onChange={handleChange}></input>
                  Project Manager
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  <input className="form-check-input" id="flexRadioDefault2" type='radio' name='occupation' value='developer' onChange={handleChange}></input>
                  Developer
                </label>
              </div>
            </div>
            <br />
            <Button variant="outline-primary" type="submit">Save Changes</Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default EditProfile;