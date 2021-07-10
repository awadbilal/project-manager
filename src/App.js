import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebaseConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './components/header/NavigationBar';
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
      <div> 
        <Router>
          <NavigationBar currentUser={loggedInUser} />
          <div className='container'>
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
          </div>
        </Router>
      </div>
      {/* <AddProject /> */}
    </div>
  );
}

export default App;
