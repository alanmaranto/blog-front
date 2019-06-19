import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';
import ROUTES from './Routes';
//import Navbar from './components/Navbar/Navbar'

class App extends Component {

  render () {
    return (
      <div>
        <Router>
          <>
            <Navbar/>
            {ROUTES}
          </>
        </Router>
      </div>
    );
  }
}

export default App;
