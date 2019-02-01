import PropTypes from 'prop-types';
import React from 'react';

import client from '../api';
import { UserContext } from '../contexts';

import Loading from './Loading';

class Initiator extends React.Component {
  state = {
    loading: true,
    user: null,
  };

  fetchMe = async () => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    try {
      // const response = await client.get('/me');
      const secret = await client.get('/api/user/secret', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(secret);

      return secret.data.msg === 'You are authorized'
        ? ({ user: loggedUser, loading: false })
        : ({ user: null, loading: true });
    } catch (err) {
      return { user: null, loading: false };
    }
  };

  componentDidMount = async () => {
    const state = await this.fetchMe();

    this.setState(state);
  };

  render() {
    const { user, loading } = this.state;
    const { children } = this.props;
    console.log(user);

    if (loading) return <Loading />;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

Initiator.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Initiator;
