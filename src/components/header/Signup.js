import React, { useState } from "react";
import db from '../../firebaseConfig';

function Signup({ registeredData, loggedInUser }){

  const [formData, setFormData] = useState({
    occupation: '',
    username: '',
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
    
    for (let i = 0; i < registeredData.length; i++) {
      if(registeredData[i].username === formData.username) return alert('Username is registered');
      if(registeredData[i].email === formData.email) return alert('Email is registered');
    }

    if (formData.occupation === '') return alert('Please choose an occupation');

    if(formData.occupation === 'manager') db.collection('projectManagers').doc(formData.username).set(formData);
    else db.collection('developer').doc(formData.username).set(formData);
    loggedInUser(formData);

    setFormData({occupation: '', username: '', email: '', password: ''});
  }

  return (
    <div className='container'>
      <form className="form-floating" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='text' name='username' placeholder='Username...' value={formData.username} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" aria-describedby="emailHelp" type='email' name='email' placeholder='Email...' value={formData.email} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Email Address</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='password' name='password' placeholder='Password...' value={formData.password} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Password</label>
        </div>
        <div className='row'>
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
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}

export default Signup;