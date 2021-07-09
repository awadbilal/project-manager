import React, { useState, useEffect } from 'react';
import db from '../../firebaseConfig';
import SingleProjectPage from './SingleProjectPage';

function Projects( { loggedInUser } ) {

  const [projects, setProjects] = useState([]);
  const [isClicked, setIsClicked] = useState('');

  useEffect(() => {
    async function fetchProjects(){
      const arrOfProjects = [];

      await db.collection("projects").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        arrOfProjects.push({id: doc.id, ...doc.data()});
        //console.log(doc.id);
        });
      });
      await setProjects(arrOfProjects);
    };
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <div className="row">
      { isClicked !== '' && <SingleProjectPage data={isClicked} setIsClicked={setIsClicked} loggedInUser={loggedInUser} />}
        {projects.map(project => {
          return (
            <div className="col-4" key={project.title} onClick={() => setIsClicked(project)}>
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
