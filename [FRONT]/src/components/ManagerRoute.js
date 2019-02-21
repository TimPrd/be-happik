import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const ManagerRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {user => (
      <Route
        {...rest}
        render={props => (user && user.RoleId === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        ))
        }
      />
    )}
  </UserContext.Consumer>
);

ManagerRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default ManagerRoute;
