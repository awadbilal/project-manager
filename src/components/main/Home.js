import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Container } from 'react-bootstrap';

function Home( { loggedInUser } ) {

  const renderButtons = (
      <Row className="justify-content-md-center">
        <Col xs lg="2"><Link to='/login'><Button variant="outline-primary">Login now!</Button></Link></Col>
        <Col xs lg="2"><Link to='/sign-up'><Button variant="outline-success">Signup now!</Button></Link></Col>
      </Row> )

  return (
    <Container>
      <Col className="justify-content-md-center">
        <Row> <h1>Welcome to <strong>Project Handler</strong></h1> </Row>
        <Row> <p>Small Description About the website</p> </Row>
        { loggedInUser === '' && renderButtons }
      </Col>
    </Container>
  );
}

export default Home;