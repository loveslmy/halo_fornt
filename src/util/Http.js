import axios from 'axios'
axios.defaults.timeout = 10000
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    });
export default axios;