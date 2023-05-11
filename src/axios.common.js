import axios from 'axios';

export default axios.create({
  baseURL: 'https://still-basin-52234.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});
