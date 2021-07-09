import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function Login( { registeredData, loggedInUser } ) {
  
  console.log(registeredData);

  const [formData, setFormData] = useState({
    email: '',
    password: null
  });

  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e){
    e.preventDefault();
    
    let notAvailable = 0;

    for(let i = 0; i < registeredData.length; i++){
      if(formData.email === registeredData[i].email){
        if(formData.password === registeredData[i].password){
          loggedInUser(registeredData[i]);
          setFormData({email: '', password: ''});
        }
        else return alert('Password is incorrect, please try again');
        notAvailable = notAvailable + 1;
      }
    }

    if(notAvailable === 0) return alert('Email is not registered!, please press sign-up instead')
  }

  return (
    <div className='container'>
      <form className="form-floating" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" aria-describedby="emailHelp" type='email' name='email' placeholder='Email...' value={formData.email} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='password' name='password' placeholder='Password...' value={formData.password} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Password</label>
        </div>
        <button type='submit' className='btn btn-primary'>Login</button>
      </form>
    </div>
  );
}

export default Login;
