import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import './index.scss';
import App from './App';
import mainReducer from './store/reducers/mainReducer';
import customizationsReducer from './store/reducers/customizationsReducer';
import authReducer from './store/reducers/authReducer';
import tutorialReducer from './store/reducers/tutorialReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	main: mainReducer,
	customizations: customizationsReducer,
	auth: authReducer,
	tutorial: tutorialReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('main')
);
