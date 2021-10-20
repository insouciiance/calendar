import * as ActionTypes from '../actions/actionTypes';
import customizations from '../../js/customizations';

const initialState = {
    customization: {
        ...customizations.getCustomizations(),
    },
    presetsList: [],
    presetsLoading: false,
};

const customizationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_CUSTOMIZATIONS: {
            return {
                ...state,
                customization: {
                    ...state.customization,
                    ...action.customization,
                },
            };
        }
        case ActionTypes.DELETE_PRESET_START:
        case ActionTypes.GET_PRESETS_START: {
            return {
                ...state,
                presetsLoading: true,
            };
        }
        case ActionTypes.DELETE_PRESET: {
            return {
                ...state,
                presetsList: action.updatedPresets,
                presetsLoading: false,
            };
        }
        case ActionTypes.GET_PRESETS: {
            return {
                ...state,
                presetsLoading: false,
                presetsList: action.presetsList,
            };
        }
        default:
            return state;
    }
};

export default customizationsReducer;
