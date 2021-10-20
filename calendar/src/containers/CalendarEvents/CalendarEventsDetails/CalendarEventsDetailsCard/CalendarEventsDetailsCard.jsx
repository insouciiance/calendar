import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';

import classes from './CalendarEventsDetailsCard.scss';
import { setSelectedElementIndex } from '../../../../store/actions';

const CalendarEventDetailsCard = props => {
    const { isSelected, onSelectElementHandler, index, color } = props;
    const { name, date, importance, countryCode } = props.event;

    let importanceClass = '';

    switch (importance) {
        case 0:
            importanceClass = classes.Ordinary;
            break;
        case 1:
            importanceClass = classes.Compelling;
            break;
        case 2:
            importanceClass = classes.Important;
            break;
        default:
            importanceClass = '';
    }

    const millisecondsLeft = moment.duration(
        moment(date).diff(moment()),
        'milliseconds',
    );
    const timeLeftHumanized =
        millisecondsLeft > 0 ? millisecondsLeft.humanize() : 'Finished';

    const wrapperClasses = isSelected
        ? `${classes.CalendarEventDetailsCard} ${classes.IsSelected}`
        : classes.CalendarEventDetailsCard;

    return (
        <div
            className={wrapperClasses}
            onClick={() => onSelectElementHandler(index)}>
            <div className={classes.CalendarEventDetailsCardName}>{name}</div>
            <div className={classes.CalendarEventDetailsCardDate}>
                <div>{moment(date).format('MMM DD HH:mm')}</div>
                <div>{`Left: ${timeLeftHumanized}`}</div>
            </div>
            <div className={classes.CalendarEventDetailsCardCountryImportance}>
                <div className={classes.CalendarEventDetailsCardCountry}>
                    <div
                        className={classes.CalendarEventDetailsCardCountryCode}>
                        {countryCode}
                    </div>
                    <ReactCountryFlag
                        countryCode={countryCode.toUpperCase()}
                        svg
                    />
                </div>
                <div
                    className={`${classes.CalendarEventDetailsCardImportance} ${importanceClass}`}>
                    <div style={{ backgroundColor: color }} />
                </div>
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

export default connect(null, mapDispatchToProps)(CalendarEventDetailsCard);
