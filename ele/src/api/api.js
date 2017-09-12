/*
* http配置
*/

import axios from 'axios'
// 调用element 

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://192.168.10.103:8080/api';
// http request 拦截器
axios.interceptors.request.use(
 config => {
   return config;
 },
 err => {
   return Promise.reject(err);
 });

// http response 拦截器
axios.interceptors.response.use(
 response => {
   return response;
 },
 error => {
   return Promise.reject(error)
 });

export default axios;