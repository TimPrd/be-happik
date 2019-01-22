import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import NotFoundPage from './containers/404Page';
import Theme from './utils/Theme';
import './App.css';
import LoginPage from './containers/LoginPage';

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <div className="App">
        <main className="app__container">
          <Switch>
            <Route exact path="/user/create" component={AddUser} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={LoginPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
