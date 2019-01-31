import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {user => (
      <Route
        {...rest}
        render={props => (user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        ))
        }
      />
    )}
  </UserContext.Consumer>
);

PrivateRoute.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
