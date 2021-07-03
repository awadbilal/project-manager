import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';

function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects(){
      const arrOfProjects = [];

      await db.collection("projects").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        arrOfProjects.push(doc.data());
        console.log(doc.id);
        });
      });
      await setProjects(arrOfProjects);
    };
    fetchProjects();
  }, []);
  
  function handleClick(projectData){
    
  }

  return (
    <div className="container">
      <div className="row">
        {projects.map(project => {
          return (
            <div className="col-4" key={project.title} onClick={() => handleClick(project)}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <h5>{project.deadline}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
