// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
