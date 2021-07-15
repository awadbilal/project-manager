import React from 'react';
import image from '../images/aboutus.jpg';
import { Image, Container } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container>
      <Image src={image} roundedCircle className='loginImage' style={{width: '70%'}} />
    </Container>
  );
}

export default AboutUs;
