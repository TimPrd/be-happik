import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const PublicRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {user => (
      <Route {...rest} render={props => (!user ? <Component {...props} /> : <Redirect to="/" />)} />
    )}
  </UserContext.Consumer>
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
