import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';

import classes from './CalendarTableBar.scss';
import { setSelectedElementIndex } from '../../../../store/actions';

const CalendarTableBar = props => {
    const { name, countryCode, importance, id } = props.event;
    const {
        eventsCount,
        onSelectElementHandler,
        index,
        color,
        wrapperWidth,
        selectEventId,
        isSelected,
    } = props;

    let eventImportanceClass = '';
    switch (importance) {
        case 0:
            eventImportanceClass = classes.Ordinary;
            break;
        case 1:
            eventImportanceClass = classes.Compelling;
            break;
        case 2:
            eventImportanceClass = classes.Important;
            break;
        default:
            eventImportanceClass = '';
    }

    let eventsCountClass = '';

    if (eventsCount === 2) {
        eventsCountClass = classes.EventsCount2;
    }

    if (eventsCount >= 3) {
        eventsCountClass = classes.EventsCount3;
    }

    const date = moment(props.event.date);

    const minutesFromMidnight = date.hours() * 60 + date.minutes();
    const datePercentage = minutesFromMidnight / (24 * 60);

    const absoluteLeft = 0.3 * wrapperWidth * datePercentage;

    return (
        <div
            className={`${
                classes.ContentWrapper
            } ${eventImportanceClass} ${eventsCountClass} ${
                isSelected ? classes.IsSelected : null
            }`}
            style={{
                left: `${absoluteLeft}px`,
                borderColor: color,
                boxShadow: `0 0 4px ${color}`,
                backgroundColor: isSelected ? color : null,
            }}
            onClick={() => {
                if (isSelected) {
                    selectEventId(null);
                } else {
                    onSelectElementHandler(index);
                    selectEventId(id);
                }
            }}>
            <div className={classes.Essentials}>{name}</div>
            <div className={classes.DateCountry}>
                <div className={classes.Date}>{date.format('HH:mm')}</div>
                <div className={classes.Country}>
                    <span className={classes.CountryName}>{countryCode}</span>
                    <ReactCountryFlag
                        countryCode={countryCode.toLowerCase()}
                        svg
                    />
                </div>
            </div>
            <div className={classes.EventsCount}>
                {eventsCount < 10 ? eventsCount : '9+'}
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectElementHandler: index =>
            dispatch(setSelectedElementIndex(index)),
    };
};

export default connect(null, mapDispatchToProps)(CalendarTableBar);
