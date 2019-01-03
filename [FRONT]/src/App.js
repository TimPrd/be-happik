import React, { Component } from 'react';

import AddUser from './components/AddUser'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddUser/>
      </div>
    );
  }
}

export default App;
