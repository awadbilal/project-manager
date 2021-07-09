import React from 'react';
import { Link } from 'react-router-dom';

function Home( { loggedInUser } ) {

  const renderButtons = (
      <div>
        <Link to='/login'>Login now!</Link>
        <Link to='/sign-up'>Signup now!</Link>
      </div> )

  return (
    <div className='container'> 
      <h1>Welcome to the.... well you continue.</h1>
      { loggedInUser === '' && renderButtons }
    </div>
  );
}

export default Home;