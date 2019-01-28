import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import NotFoundPage from './containers/404Page';
import Theme from './utils/Theme';
import './App.css';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <div className="App">
        <GlobalStyle />
        <main className="app__container">
          <ToastContainer />
          <Switch>
            <Route exact path="/user/create" component={AddUser} />
            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />

            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  </ThemeProvider>
);

export default App;
