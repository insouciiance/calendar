import axios from '../../js/axiosInstance';
import * as ActionTypes from './actionTypes';

export const registerThunk = credentials => dispatch => {
	axios
		.post('/account/register', {
			...credentials
		})
		.then(res => {
			dispatch(registerSuccess(res.data));
		})
		.catch(error => {
			dispatch(registerError(error));
		});
};

export const loginThunk = credentials => dispatch => {
	axios
		.post('/account/login', { ...credentials })
		.then(res => dispatch(loginSuccess(res.data)))
		.catch(error => dispatch(loginError(error)));
};

export const logOutThunk = () => dispatch => {
	axios.post('/account/logout').then(() => {
		dispatch(logOutSuccess());
	});
};

export const getUserInfoThunk = () => dispatch => {
	axios
		.get('/account/getuser')
		.then(res => dispatch(getUserInfoSuccess(res.data)))
		.catch(() => {
			dispatch(getUserInfoError());
		});
};

export const registerSuccess = payload => {
	return {
		type: ActionTypes.REGISTER_SUCCESS,
		token: payload.token,
		user: payload.user
	};
};

export const registerError = error => {
	return {
		type: ActionTypes.REGISTER_ERROR,
		errorsList: error.response.data.errorsList
	};
};

export const loginSuccess = payload => {
	return {
		type: ActionTypes.LOGIN_SUCCESS,
		token: payload.token,
		user: payload.user
	};
};

export const loginError = error => {
	return {
		type: ActionTypes.LOGIN_ERROR,
		errorsList: error.response.data.errorsList
	};
};

export const logOutSuccess = () => {
	return {
		type: ActionTypes.LOGOUT_SUCCESS
	};
};

export const clearErrors = () => {
	return {
		type: ActionTypes.CLEAR_ERRORS
	};
};

export const getUserInfoSuccess = user => {
	return {
		type: ActionTypes.GET_USER_INFO_SUCCESS,
		user
	};
};

export const getUserInfoError = () => {
	return {
		type: ActionTypes.GET_USER_INFO_ERROR
	};
};
