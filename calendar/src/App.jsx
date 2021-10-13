import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import moment from 'moment';

import Layout from './hoc/Layout/Layout';
import classes from './App.scss';
import CalendarEvents from './containers/CalendarEvents/CalendarEvents';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import { getUserInfoThunk } from './store/actions';

class App extends Component {
	componentDidMount() {
		if (
			!localStorage.getItem('token') ||
			!localStorage.getItem('expires') ||
			moment(localStorage.getItem('expires')) - moment() < 0
		) {
			localStorage.removeItem('token');
			localStorage.removeItem('expires');
		} else {
			this.props.getUserInfo();
		}
	}

	render() {
		const { token } = this.props;
		return (
			<div className={classes.Wrapper}>
				<Layout>
					{token && token.value && token.expires && moment(token.expires) > moment() ? (
						<>
							<Switch>
								<Route path='/' exact component={CalendarEvents} />
								<Redirect to='/' />
							</Switch>
						</>
					) : (
						<>
							<Switch>
								<Route path='/register' component={Register} exact />
								<Route path='/login' component={Login} exact />
								<Redirect to='/login' />
							</Switch>
						</>
					)}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getUserInfo: () => dispatch(getUserInfoThunk())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
