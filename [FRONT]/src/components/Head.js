import React from 'react';
import Loading from './Loading';
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Items = styled.div`

`;

class Head extends React.Component {
    state = {
        loading: true,
        user: null,
        sondageName: ""
    };

    sock = async () => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        const socket = io.connect('http://localhost:4000'); // TIP: io() with no args does auto-discovery
        socket.emit('setUserId', loggedUser.user.id);
        socket.on('notification', sondageName => {
            //socket.emit('send', 6);
            this.setState({ sondageName })
        });
        return { user: loggedUser.user, loading: false }
    };

    componentDidMount = async () => {
        const state = await this.sock();
        this.setState(state);
    };

    render() {
        const { user, loading, sondageName } = this.state;

        console.log(user);

        if (loading) return <Loading />;

        return (
            <Items>
                {sondageName ?
                    "Un nouveau sondage est disponible " : ""}
                <FontAwesomeIcon
                    icon="bell"
                    color={sondageName ? "red" : "grey"}
                    size="lg"
                />

                {' '} | {' '}
                {(user.firstName + ' ' + user.lastName) || user.email}
            </Items>
        );
    }
}


export default Head;
