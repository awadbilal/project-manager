import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar( { currentUser } ) {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to='/'>Home</Link></Nav.Link>
          {currentUser !== '' && <Nav.Link><Link to='/projects'> projects </Link></Nav.Link>}
          {currentUser !== '' && <Nav.Link><Link to='/add-project'> Add project </Link></Nav.Link>}
          <Nav.Link><Link to='/about'>About us</Link></Nav.Link>
        </Nav>
        <Nav>
          {currentUser === '' && <Nav.Link><Link to='/login'>Login</Link></Nav.Link>}
          {currentUser === '' && <Nav.Link><Link to='/sign-up'>Sign Up</Link></Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>
  )
}

export default NavigationBar;
