import * as ActionTypes from '../actions/actionTypes';

const initialState = -1;

const tutorialReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_TUTORIAL_STAGE: {
            return action.value;
        }
        default: {
            return state;
        }
    }
};

export default tutorialReducer;
