import axios from 'axios';

const loggedUser = JSON.parse(localStorage.getItem('user'));

const header = loggedUser && {
  Authorization: `Bearer ${loggedUser.token}`,
  'Content-Type': 'application/json',
};

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://happik.herokuapp.com/",
  headers: header,
});

export default client;
