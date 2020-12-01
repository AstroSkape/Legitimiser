import React from 'react';
import Navbar from './components/views/Navbar';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Uploads from './components/pages/Upload/Upload';
import Graphs from './components/pages/Graphs/Graphs';
import Issues from './components/pages/Issues/Issues';
import SignOut from './components/pages/SignOut';




function App() {
  return (
    <>
      <Router>
        <Navbar />
         <Switch>
           <Route path ='/' exact component ={Home}/>
           <Route path='/uploads' exact component={Uploads}/>
           <Route path='/graphs' exact component={Graphs}/>
           <Route path='/issues' exact component={Issues}/>
           <Route path='/sign-out' exact component={SignOut}/>
         </Switch>
      </Router>  
    </>
  );
}

export default App;
