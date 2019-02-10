import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../contexts';

const ManagerRoute = ({ component: Component, ...rest }) => (
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
              // state: { from: props.location },
            }}
          />
        ))
        }
      />
    )}
  </UserContext.Consumer>
);

ManagerRoute.propTypes = {
  // location: PropTypes.objectOf(PropTypes.string).isRequired,
  component: PropTypes.func.isRequired,
};

export default ManagerRoute;
