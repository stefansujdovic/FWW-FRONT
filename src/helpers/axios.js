import axios from 'axios';

const myAxios = axios.create({
  baseURL: process.env.API + '/api',
});

export default myAxios;