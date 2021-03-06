import axios from 'axios';
import authHeader from './auth-header';
import { store } from '../store'


export const Axios = axios.create({

    baseURL: 'http://localhost/task/public/api/',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-with': 'XMLHttpRequest'
    }
})

Axios.interceptors.response.use(response => {

    return response;
}, function (error) {
    
    if(error.response.status === 401){
        localStorage.clear()
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

Axios.interceptors.request.use(req => {

    const token = store.getState().user.token

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }  
    return req;
}, error => {

    // Do something with request error
    return Promise.reject(error);
});