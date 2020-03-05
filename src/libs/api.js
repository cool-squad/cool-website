import axios from 'axios';
import url from './config';

axios.defaults.baseURL = url.localUrl;

// 拦截器
axios.interceptors.request.use((req) => {
  req.headers.Authorization = '';
  return req;
});

axios.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error.response),
);

export default axios;
