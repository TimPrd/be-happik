import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import NotFoundPage from './containers/404Page';
import SideBar from './containers/SideBar';
import NavBar from './containers/NavBar';
import Theme from './utils/Theme';
import './App.css';

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <div className="App">
        <aside className="app__sideBar">
          <SideBar />
        </aside>

        <header className="app__header">
          <NavBar />
        </header>
        <main className="app__container">
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
