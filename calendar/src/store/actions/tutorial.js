import * as ActionTypes from './actionTypes';

export const setTutorialStage = value => {
	return {
		value,
		type: ActionTypes.SET_TUTORIAL_STAGE
	};
};
