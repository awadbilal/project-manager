import React from 'react';
import { Link } from "react-router-dom";

function Nav( { currentUser } ) {
  return (
    <>
      <nav className='navbar navbar-default nav-lower'>
        <div className='container'>
          <div>
          </div>
          <div className='col-4'>
            <Link to='/'>Home</Link>
            {currentUser !== '' && <Link to='/projects'> projects </Link>}
            {currentUser.occupation === 'manager' && <Link to='/add-project'> Add project </Link>}
            <Link to='/about'>About us</Link>
          </div>
          <div className='col-4'>
            {currentUser === '' && <Link to='/login'>Login</Link>}
            {currentUser === '' && <Link to='/sign-up'>Sign Up</Link>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
