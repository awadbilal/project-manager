import React from 'react';
import Signup from './Signup';
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import Projects from '../main/Projects';

function Nav( { currentUser } ) {
  return (
    <>
      <nav className='nav'>
        <div>
          <div>
          </div>
          <div>
            <Link to='/'>Home</Link>
            <Link to='/projects'> projects </Link>
            {currentUser.occupation === 'manager' && <Link to='/add-project'> Add project </Link>}
            <Link to='/about'>About us</Link>
          </div>
          <div>
            {currentUser === '' && <Link to='/sign-up'>Sign Up</Link>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
