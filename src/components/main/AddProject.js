import React, { useState } from 'react'
import db from '../../firebaseConfig';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={handleProject}>
        <Form.Group controlId="formBasic">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title" name='title' value={formData.title} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name='description' value={formData.description} onChange={handleChange} rows={3} />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name='deadline' value={formData.deadline} onChange={handleChange} />
        </Form.Group>
        <div>
          <div className="form-floating mb-3">
            <input className="form-control taskInput" id="floatingInput" type='text' name='task' placeholder='task...'></input>
            <label htmlFor="floatingInput">Task</label>
          </div>
          <button className='btn btn-primary' onClick={handleTask}>Add Task</button>
        </div>
        <button type="submit" className='btn btn-primary'>Add Project</button>
      </Form>
  );
}

export default AddProject;
