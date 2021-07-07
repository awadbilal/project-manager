
import React, { useState } from 'react'
import db from '../../firebaseConfig';

function AddProject() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    task: []
  });

  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleTask(e){
    e.preventDefault();
    const inputValue = document.querySelector('.taskInput').value;
    setFormData({
      ...formData, 
      task: [...formData.task, inputValue]
    });
    document.querySelector('.taskInput').value='';
  }

  function handleProject(e){
    e.preventDefault();
    db.collection('projects').add(formData);
    setFormData({title: '', description: '', deadline: '', tasks: []});
  }
  
  return (
    <div className="container">
      <form className="form-floating" onSubmit={handleProject}>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='text' name='title' value={formData.title} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='textarea' name='description' value={formData.description} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Description</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" id="floatingInput" type='date' name='deadline' value={formData.deadline} onChange={handleChange} required></input>
          <label htmlFor="floatingInput">Deadline</label>
        </div>
        <div>
          <div className="form-floating mb-3">
            <input className="form-control taskInput" id="floatingInput" type='text' name='task' placeholder='task...'></input>
            <label htmlFor="floatingInput">Task</label>
          </div>
          <button className='btn btn-primary' onClick={handleTask}>Add Task</button>
        </div>
        <button type="submit" className='btn btn-primary'>Add Project</button>
      </form>
    </div>
  );
}

export default AddProject;
