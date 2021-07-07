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
        <div><input type='text' name='description' value={ projectData.description } onChange={handleChange}></input>
          <ul>
            {data.task.map((task, index) => {
              return(
                <>
                  <li>{task}</li>
                  <button onClick={() => handleTaskDelete(index)}>Delete</button>
                </>
              )
            })}
          </ul>
        </div>
        <div><input type='date' name='deadline' value={ projectData.deadline } onChange={handleChange}></input></div>
        <div>
          <button>Add task</button>
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
