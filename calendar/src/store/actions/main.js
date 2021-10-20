import moment from 'moment';
import axios from '../../js/axiosInstance';
import * as ActionTypes from './actionTypes';

let edgeStartDate = moment().startOf('day');
let edgeEndDate = moment().startOf('day');

export const getGraphInfo = payload => ({
    type: ActionTypes.GET_GRAPH_INFO,
    data: payload.data,
});

export const getEvents = payload => ({
    type: ActionTypes.GET_EVENTS,
    ...payload,
});

export const getEventsThunk = (startDate, endDate) => dispatch => {
    let reqStartDate = startDate;
    let reqEndDate = endDate;

    // 3 cases exist for startDate(SD) end endDate(ED) position relative to edgeStartDate(ESD) and edgeEndDate(EED).

    console.log('------------------------------');
    console.warn('ESD', edgeStartDate.format());
    console.warn('EED', edgeEndDate.format());
    console.log('SD', startDate.format());
    console.log('ED', endDate.format());

    // 1: [SD; ED] ∈ [ESD; EED]
    if (
        moment(edgeStartDate).diff(startDate) <= 0 &&
        moment(edgeEndDate).diff(endDate) >= 0 &&
        edgeStartDate.format() !== edgeEndDate.format()
    ) {
        dispatch(
            getEvents({
                startDate: moment(startDate),
                endDate: moment(endDate),
            }),
        );
        // 2.1: SD <= ESD
    } else {
        if (
            moment(edgeStartDate).diff(startDate) > 0 &&
            edgeStartDate.format() !== edgeEndDate.format()
        ) {
            reqEndDate = moment(edgeStartDate).add(-1, 'day');
        }

        // 2.2: EED <= ED
        if (
            moment(edgeEndDate).diff(endDate) < 0 &&
            edgeStartDate.format() !== edgeEndDate.format()
        ) {
            reqStartDate = moment(edgeEndDate).add(1, 'day');
        }

        console.log('RSD', reqStartDate.format());
        console.log('RED', reqEndDate.format());

        // 4(default): [SD; ED] ∉ (ESD; EED)
        axios
            .get(
                `/calendarevents?startDateIso=${moment(
                    reqStartDate,
                ).format()}&endDateIso=${moment(reqEndDate).format()}`,
            )
            .then(res => {
                if (moment(edgeStartDate).diff(moment(startDate)) > 0) {
                    edgeStartDate = moment(startDate).startOf('day');
                }

                if (moment(edgeEndDate).diff(moment(endDate)) < 0) {
                    edgeEndDate = moment(endDate).startOf('day');
                }

                console.warn('ESD', edgeStartDate.format());
                console.warn('EED', edgeEndDate.format());
                console.log('------------------------------');

                dispatch(
                    getEvents({
                        events: res.data,
                        startDate: moment(startDate),
                        endDate: moment(endDate),
                    }),
                );
            });
    }
};

export const getGraphInfoThunk = daysCount => dispatch => {
    const startDateIso = moment().format();
    const endDateIso = moment()
        .add(daysCount - 1, 'days')
        .format();
    axios
        .get(
            `/calendarevents/g?startDateIso=${startDateIso}&endDateIso=${endDateIso}`,
        )
        .then(res => {
            dispatch(getGraphInfo({ data: res.data }));
        });
};

export const setSelectedElementIndex = index => ({
    type: ActionTypes.SET_SELECTED_ELEMENT_INDEX,
    index,
});

export const setDaysToShow = (daysToShow, windowWidth) => ({
    type: ActionTypes.SET_DAYS_TO_SHOW,
    daysToShow,
    windowWidth,
});
