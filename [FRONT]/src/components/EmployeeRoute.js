import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const EmployeeRoute = ({ component: Component, ...rest }) => (
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
              // state: { from: props.location },
            }}
          />
        ))
        }
      />
    )}
  </UserContext.Consumer>
);

EmployeeRoute.propTypes = {
  // location: PropTypes.objectOf(PropTypes.string).isRequired,
  component: PropTypes.func.isRequired,
};

export default EmployeeRoute;
