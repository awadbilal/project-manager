import React, { useState } from 'react';
import db from '../../firebaseConfig';

function SingleProjectPage( { data, setIsClicked, loggedInUser } ) {

  const [projectData, setProjectData] = useState(data);

  function handleTaskDelete(index){
    const tasksArr = projectData.task;
    tasksArr.splice(index, 1);
    setProjectData({
      ...projectData,
      task: tasksArr
    });
  }

  function handleChange(e){
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    });
  }

  function handleTask(e){
    e.preventDefault();
    const tasksArr = projectData.task;
    const inputValue = document.querySelector('.taskInput').value;
    tasksArr.push(inputValue);
    setProjectData({
      ...projectData,
      task: tasksArr
    });
    document.querySelector('.taskInput').value='';
  }

  function handleDelete(){
    db.collection('projects').doc(projectData.id).delete();
  }

  function handleProjectChange(){
    db.collection('projects').doc(projectData.id).set(projectData);
  }

  console.log(projectData);

  if(loggedInUser.occupation === 'manager'){
    return (
      <div className='container shown SingleProjectPage'>
        <div>
          <div><input type='text' name='title' value={ projectData.title } onChange={handleChange}></input></div>
          <div><button onClick={() => setIsClicked('')}>X</button></div>
        </div>
        <div><input type='text' name='description' value={ projectData.description } onChange={handleChange}></input></div>
        <div>
          {data.task.map((task, index) => {
            return(
              <div>
                <h5>{task}</h5>
                <button onClick={() => handleTaskDelete(index)}>Delete</button>
              </div>
            )
          })}
        </div>
        <div>
          <div className="form-floating mb-3">
            <input className="form-control taskInput" id="floatingInput" type='text' name='task' placeholder='task...'></input>
            <label htmlFor="floatingInput">Task</label>
          </div>
          <button className='btn btn-primary' onClick={handleTask}>Add Task</button>
        </div>
        <div><input type='date' name='deadline' value={ projectData.deadline } onChange={handleChange}></input></div>
        <div>
          <button type='submit' onClick={handleProjectChange}>Submit Changes</button>
          <button onClick={handleDelete}>Delete Project</button>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className='container SingleProjectPage'>
        <div>
          <div>{ projectData.title }</div>
          <div><button onClick={() => setIsClicked('')}>X</button></div>
        </div>
        <div>{ projectData.description }</div>
          <ul>
            {data.task.map(task => <li>{task}</li>)}
          </ul>
        <div>{ projectData.deadline }</div>
      </div>
    );
  }
}

export default SingleProjectPage;
