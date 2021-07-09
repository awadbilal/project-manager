import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebaseConfig';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/header/Nav';
import Signup from './components/header/Signup';
import AddProject from './components/main/AddProject';
import Projects from './components/main/Projects';
import Login from './components/header/Login';
import Home from './components/main/Home';

function App() {

  const [registeredData, setRegisteredData] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  
  useEffect(() => {
    const arrayOfData = [];
    
    db.collection("developer").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrayOfData.push(doc.data());
      });
    });
    
    db.collection("projectManagers").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        arrayOfData.push(doc.data());
      });
    });

    setRegisteredData(arrayOfData);
  }, []);

  return (
    <div className="App">
      <div className="container"> 
        <Router>
          <Nav currentUser={loggedInUser} />
          <Route path="/projects">
            <Projects loggedInUser={loggedInUser} />
          </Route>
          <Route exact path="/">
            <Home loggedInUser={loggedInUser} />
          </Route>
          {
            loggedInUser.occupation === 'manager' && 
            <Route path="/add-project">
              <AddProject />
            </Route>
          }
          {
            loggedInUser === "" &&
            <Route path="/sign-up">
              <Signup registeredData={registeredData} loggedInUser={setLoggedInUser} />
            </Route>
          }
          {
            loggedInUser === "" &&
            <Route path="/login">
              <Login registeredData={registeredData} loggedInUser={setLoggedInUser} />
            </Route>
          }
        </Router>
      </div>
      {/* <AddProject /> */}
    </div>
  );
}

export default App;
