import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../Auth.scss';
import { registerThunk } from '../../../store/actions';

const Register = props => {
	const [state, setState] = useState({
		username: { value: '', error: true, touched: false },
		email: { value: '', error: true, touched: false },
		password: { value: '', error: true, touched: false },
		passwordConfirm: { value: '', error: true, touched: false }
	});

	const { register, errorsList } = props;

	const onFormSubmit = e => {
		e.preventDefault();
		register({
			username: state.username.value,
			email: state.email.value,
			password: state.password.value,
			passwordConfirm: state.passwordConfirm.value
		});
	};

	return (
		<div className={classes.Wrapper}>
			<div className={classes.FormContainer}>
				<h3>Register</h3>
				{errorsList
					? errorsList.map(error => (
							<div className={classes.Error} key={error.code}>
								<span>{error.description}</span>
							</div>
					  ))
					: null}
				<form action='POST' onSubmit={onFormSubmit}>
					<div className={classes.FieldSet}>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							type='text'
							value={state.username.value}
							onChange={e => {
								const re = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
								setState({
									...state,
									username: {
										value: e.target.value,
										error: !e.target.value.match(re),
										touched: true
									}
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
						<label htmlFor='email'>Email</label>
						<input
							id='email'
							type='text'
							value={state.email.value}
							onChange={e => {
								const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
								setState({
									...state,
									email: {
										value: e.target.value,
										error: !e.target.value.match(re),
										touched: true
									}
								});
							}}
							style={
								state.email.error && state.email.touched
									? { borderColor: 'red' }
									: null
							}
						/>
					</div>
					<div className={classes.FieldSet}>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							type='password'
							value={state.password.value}
							onChange={e => {
								const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/;
								setState({
									...state,
									password: {
										value: e.target.value,
										error: !e.target.value.match(re),
										touched: true
									},
									passwordConfirm: {
										...state.passwordConfirm,
										error: e.target.value !== state.passwordConfirm.value
									}
								});
							}}
							style={
								state.password.error && state.password.touched
									? { borderColor: 'red' }
									: null
							}
						/>
					</div>
					<div className={classes.FieldSet}>
						<label htmlFor='passwordConfirm'>Confirm password</label>
						<input
							id='passwordConfirm'
							type='password'
							value={state.passwordConfirm.value}
							onChange={e => {
								setState({
									...state,
									passwordConfirm: {
										value: e.target.value,
										error: e.target.value !== state.password.value,
										touched: true
									}
								});
							}}
							style={
								state.passwordConfirm.error && state.passwordConfirm.touched
									? { borderColor: 'red' }
									: null
							}
						/>
					</div>
					<button
						className={classes.SubmitButton}
						disabled={
							state.username.error ||
							state.email.error ||
							state.password.error ||
							state.passwordConfirm.error
						}
					>
						Submit
					</button>
				</form>
			</div>
			<Link className={classes.SwitchAuthTypeLink} to='/login'>
				Login
			</Link>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		errorsList: state.auth.errorsList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		register: credentials => dispatch(registerThunk(credentials))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
