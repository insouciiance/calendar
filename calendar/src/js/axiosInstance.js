import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44330/api';

axios.interceptors.request.use(req => {
	req.headers.authorization = `Bearer ${localStorage.getItem('token')}`;

	return req;
});

export default axios;
