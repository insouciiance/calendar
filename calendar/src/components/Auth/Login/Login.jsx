import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../Auth.scss';
import { loginThunk } from '../../../store/actions';
import { clearErrors } from '../../../store/actions/auth';

const Login = props => {
    const [state, setState] = useState({
        username: { value: '', error: true, touched: false },
        password: { value: '', error: true, touched: false },
    });

    const { login, errorsList, clearAuthErrors } = props;

    const onFormSubmit = e => {
        e.preventDefault();
        login({
            username: state.username.value,
            password: state.password.value,
        });
    };

    return (
        <div className={classes.Wrapper}>
            <div className={classes.FormContainer}>
                <h3>Login</h3>
                {errorsList
                    ? errorsList.map(error => (
                          <div className={classes.Error} key={error.code}>
                              <span>{error.description}</span>
                          </div>
                      ))
                    : null}
                <form action="POST" onSubmit={onFormSubmit}>
                    <div className={classes.FieldSet}>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={state.username.value}
                            onChange={e => {
                                const re =
                                    /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
                                setState({
                                    ...state,
                                    username: {
                                        value: e.target.value,
                                        error: !e.target.value.match(re),
                                        touched: true,
                                    },
                                });
                            }}
                            style={
                                state.username.error && state.username.touched
                                    ? { borderColor: 'red' }
                                    : null
                            }
                        />
                    </div>
                    <div className={classes.FieldSet}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={state.password.value}
                            onChange={e => {
                                const re =
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/;
                                setState({
                                    ...state,
                                    password: {
                                        value: e.target.value,
                                        error: !e.target.value.match(re),
                                        touched: true,
                                    },
                                });
                            }}
                            style={
                                state.password.error && state.password.touched
                                    ? { borderColor: 'red' }
                                    : null
                            }
                        />
                    </div>
                    <button
                        className={classes.SubmitButton}
                        // disabled={state.username.error || state.password.error}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <Link
                className={classes.SwitchAuthTypeLink}
                onClick={() => {
                    clearAuthErrors();
                }}
                to="/register">
                Register
            </Link>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        errorsList: state.auth.errorsList,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: credentials => dispatch(loginThunk(credentials)),
        clearAuthErrors: () => dispatch(clearErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
