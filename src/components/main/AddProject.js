import React, { useState } from 'react';
import db from '../../firebaseConfig';
import { Form, Button, Col, Row } from 'react-bootstrap';

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
        <Row>
          {/* <Col auto><Form.Label htmlFor="floatingInput">Task</Form.Label></Col> */}
          <Col md={10}><input className="form-control taskInput" id="floatingInput" type='text' name='task' placeholder='task'></input></Col>
          <Col md='auto'><button className='btn btn-primary' onClick={handleTask}>Add Task</button></Col>
        </Row>
        <br />
        <Col>
          <ul>
            {formData.task && formData.task.map(task => <li>{task}</li>)}
          </ul>
        </Col>
        <Button variant="outline-success" type="submit" size="lg" block>Add Project</Button>
      </Form>
  );
}

export default AddProject;
