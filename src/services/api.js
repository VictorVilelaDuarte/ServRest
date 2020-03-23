import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.15.15:3000',
  // baseURL: 'http://192.168.0.253:3000',
  timeout: 5000,
});

export default api;
