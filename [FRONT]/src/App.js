import React, { Component } from 'react';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddUser/>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
