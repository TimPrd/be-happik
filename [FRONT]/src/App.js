import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import Theme from './utils/Theme';
import './App.css';

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <div className="App">
        <header className="app__header">
          {/* <NavBar /> */}
        </header>

        <main>
          <Route path="/user/create" component={AddUser} />
          <Route path="/dashboard" component={Dashboard} />
        </main>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
