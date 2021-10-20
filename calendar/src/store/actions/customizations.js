import axios from '../../js/axiosInstance';

import * as ActionTypes from './actionTypes';

export const setCustomizations = customization => ({
    type: ActionTypes.SET_CUSTOMIZATIONS,
    customization,
});

export const deletePresetThunk = presetId => dispatch => {
    dispatch({ type: ActionTypes.DELETE_PRESET_START });
    axios.delete(`/presets/${presetId}`).then(res => {
        dispatch({
            type: ActionTypes.DELETE_PRESET,
            updatedPresets: res.data,
        });
    });
};

export const loadPresetsThunk = () => dispatch => {
    dispatch({ type: ActionTypes.GET_PRESETS_START });
    axios.get('/presets').then(res => {
        dispatch({ type: ActionTypes.GET_PRESETS, presetsList: res.data });
    });
};
