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
      const me = await client.get('/api/user/me', {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
          'Content-Type': 'application/json',
        },
      });

      /*const socket = await io.connect('htt://happik.herokuapp.com/'); // TIP: io() with no args does auto-discovery
      await socket.on('welcome', () => {
        console.log('We are connected');
        socket.emit('setUserId', loggedUser.id);
        socket.emit('send', loggedUser.id);
        socket.on('notification', msg => console.log(msg));
      });*/
      // setInterval(async function(){ await client.post('/api/survey/validate',{}); }, 3000);


      return me.data.msg !== 'You are not authorize'
        ? ({ user: me.data, loading: false })
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
