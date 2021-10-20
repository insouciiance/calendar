import * as ActionTypes from '../actions/actionTypes';

const initialState = {
    token: {
        value: localStorage.getItem('token'),
        expires: localStorage.getItem('expires'),
    },
    user: null,
    errorsList: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
        case ActionTypes.LOGIN_SUCCESS: {
            localStorage.setItem('token', action.token.value);
            localStorage.setItem('expires', action.token.expires);

            return {
                ...state,
                token: { ...action.token },
                user: { ...action.user },
            };
        }
        case ActionTypes.LOGOUT_SUCCESS: {
            localStorage.removeItem('token');
            localStorage.removeItem('expires');

            return {
                ...state,
                token: {
                    value: null,
                    expires: null,
                },
                user: null,
            };
        }
        case ActionTypes.REGISTER_ERROR:
        case ActionTypes.LOGIN_ERROR: {
            return {
                ...state,
                errorsList: action.errorsList,
            };
        }
        case ActionTypes.GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                user: {
                    ...action.user,
                },
            };
        }
        case ActionTypes.GET_USER_INFO_ERROR: {
            localStorage.removeItem('token');
            localStorage.removeItem('expires');

            return {
                ...state,
                user: null,
                token: {
                    value: null,
                    expires: null,
                },
            };
        }
        case ActionTypes.CLEAR_ERRORS: {
            return {
                ...state,
                errorsList: [],
            };
        }
        default:
            return state;
    }
};

export default authReducer;
