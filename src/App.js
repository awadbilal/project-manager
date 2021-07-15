import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import NavigationBar from './components/header/NavigationBar';
import Signup from './components/header/Signup';
import AddProject from './components/main/AddProject';
import Projects from './components/main/Projects';
import Login from './components/header/Login';
import Home from './components/main/Home';
import AboutUs from './components/main/AboutUs';

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
      <div> 
        <Router>
          <NavigationBar currentUser={loggedInUser} setCurrentUser={setLoggedInUser} />
            <Route path="/projects">
              <Projects loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/">
              <Home loggedInUser={loggedInUser} />
            </Route>
            <Route exact path="/about">
              <AboutUs />
            </Route>
            {
              loggedInUser.occupation === 'manager' && 
              <Route path="/add-project">
                <AddProject />
              </Route>
            }

            <Route path="/sign-up">
              {loggedInUser === "" ?   <Signup registeredData={registeredData} loggedInUser={setLoggedInUser} /> : <Redirect to='/projects' /> }
            </Route>

            <Route path="/login">
              {loggedInUser === "" ?  <Login registeredData={registeredData} loggedInUser={setLoggedInUser} /> : <Redirect to='/projects' />  }
            </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
