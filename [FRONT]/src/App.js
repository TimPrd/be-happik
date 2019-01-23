import React, {Component} from 'react';
import socketIOClient from 'socket.io-client'

import AddUser from './components/AddUser'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor() {
        super()

        this.state = {
            endpoint: "http://localhost:4000" // this is where we are connecting to with sockets
            ,rand : Math.floor(Math.random() * 2) //todo : will be the user id
        }
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        console.log(this.state.rand)
        socket.emit('setUserId', this.state.rand);
        socket.on('hi!', (col) => {
            alert(col);
        });
        fetch('http://localhost:4000/api/survey/validate', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Request-Headers': 'content-type'
            },
            body: JSON.stringify({teams:"JKRow"})
        })
            .then((response) => {
                console.log(response.json());
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // method for emitting a socket.io event
    send = () => {
        const socket = socketIOClient(this.state.endpoint)
        console.log(socket);
        socket.emit('connection');
    };

    render() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('hi!', (col) => {
            alert(col);
        })
        return (
            <div className="App">
                <AddUser/>
            </div>
        );
    }
}

export default App;
