import React from 'react';

class Logout extends React.Component {
    componentWillMount () {
        localStorage.clear();
        window.location.href = "/login"
    }

    render () {
        return null
    }
};

export default (Logout);