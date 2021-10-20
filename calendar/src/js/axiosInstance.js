import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(req => {
    req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

    return req;
});

export default axios;
