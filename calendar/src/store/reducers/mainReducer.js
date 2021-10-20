import moment from 'moment';
import * as ActionTypes from '../actions/actionTypes';

const windowWidth = window.innerWidth;

let daysToShow = 5;
if (windowWidth < 1150) {
    daysToShow = 3;
}
if (windowWidth < 650) {
    daysToShow = 1;
}

const initialState = {
    daysToShow,
    startDate: moment(),
    endDate: moment()
        .startOf('day')
        .add(daysToShow - 1, 'days'),
    events: [],
    graphInfo: [],
    selectedElementIndex: 0,
    windowWidth: window.innerWidth,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.GET_EVENTS: {
            let events;
            if (action.events) {
                events = [...state.events, ...action.events].sort(
                    (a, b) => moment(a) - moment(b),
                );

                return {
                    ...state,
                    startDate: action.startDate,
                    endDate: action.endDate,
                    events,
                };
            }
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
            };
        }
        case ActionTypes.SET_SELECTED_ELEMENT_INDEX: {
            return {
                ...state,
                selectedElementIndex: action.index,
            };
        }
        case ActionTypes.SET_DAYS_TO_SHOW: {
            return {
                ...state,
                daysToShow: action.daysToShow,
                windowWidth: action.windowWidth,
                endDate: moment(state.startDate).add(
                    action.daysToShow - 1,
                    'days',
                ),
            };
        }
        case ActionTypes.GET_GRAPH_INFO: {
            return {
                ...state,
                graphInfo: action.data,
            };
        }
        default:
            return state;
    }
};

export default mainReducer;
