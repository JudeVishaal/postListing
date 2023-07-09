import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Router } from 'react-router-dom';
import {Routes} from './Routes'
const { createBrowserHistory } = require('history');

const useClasses = () => ({
  backgroundColor: {
    background: "blueviolet"
  }
})

const history = createBrowserHistory();

function App() {
  const classes = useClasses();
  return (
    <div className="App" style={classes.backgroundColor}>
      <Router history={history}>
        <BrowserRouter>
          <Routes/>
        </BrowserRouter>
      </Router>
    </div>
  );
}

export default App;
