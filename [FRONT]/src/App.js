import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';

import 'react-toastify/dist/ReactToastify.css';

import AddUser from './components/AddUser';
import Dashboard from './containers/Dashboard';
import NotFoundPage from './containers/404Page';
import Theme from './utils/Theme';
import './App.css';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
//import EmployeeRoute from './components/EmployeeRoute';
import ManagerRoute from './components/ManagerRoute';
import Initiator from './components/Initiator';
import AllSurveys from './containers/Survey/All';
import CreateSurveyPage from './containers/Survey/Create';
import ReplySurveyPage from './containers/Survey/Reply';
import french from './Locales';
import Collaborators from './containers/Collaborators';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import AnsweredSurveyPage from './containers/Survey/Answered';

library.add(faEnvelope,faBell, faKey);
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
`;

moment.locale('fr', french);

const App = () => (
  <ThemeProvider theme={Theme}>
    <Router>
      <Initiator>
        <div className="App">
          <GlobalStyle />
          <main className="app__container">
            <ToastContainer />
            <Switch>
              <PrivateRoute exact path="/user/create" component={AddUser} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/" component={Dashboard} />

              <PrivateRoute exact path="/surveys" component={AllSurveys} />
              <ManagerRoute exact path="/survey/create" component={CreateSurveyPage} />
              <PrivateRoute exact path="/survey/reply/:id" component={ReplySurveyPage} />
              <PrivateRoute exact path="/survey/:id/answers" component={AnsweredSurveyPage} />

              <ManagerRoute exact path="/collaborators" component={Collaborators} />

              <PublicRoute exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />

              <Route component={NotFoundPage} />
            </Switch>
          </main>
        </div>
      </Initiator>
    </Router>
  </ThemeProvider>
);

export default App;
