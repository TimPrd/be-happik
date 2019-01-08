import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import Theme from './utils/Theme';
import './App.css';
import NotFoundPage from './containers/404Page';

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <div className="App">
        <header className="app__header">
          {/* <NavBar /> */}
        </header>

        <main>
          <Switch>
            <Route exact path="/user/create" component={AddUser} />
            <Route exact path="/dashboard" component={Dashboard} />

            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
