import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const EmployeeRoute = ({ component: Component, ...rest }) => (
  <UserContext.Consumer>
    {user => (
      <Route
        {...rest}
        render={props => (user && user.RoleId === 1 ? (
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

EmployeeRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default EmployeeRoute;
