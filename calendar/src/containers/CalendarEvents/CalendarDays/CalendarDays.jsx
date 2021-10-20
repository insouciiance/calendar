import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import classes from './CalendarDays.scss';
import { setSelectedElementIndex } from '../../../store/actions';

const CalendarDays = props => {
    const { startDate, endDate, setSelectedIndex, events } = props;

    const onSelectDayHandler = day => {
        const selectedElement = events.find(
            x => moment(x.date).format('D') === day,
        );
        const selectedElementIndex = events.indexOf(selectedElement);

        if (selectedElementIndex !== -1) {
            setSelectedIndex(selectedElementIndex);
        }
    };

    const optionsArray = [];
    const daysDiff = moment(endDate)
        .startOf('day')
        .diff(moment(startDate).startOf('day'), 'days');

    for (let i = 0; i <= daysDiff; i++) {
        optionsArray.push(moment(startDate).add(i, 'days').format('D'));
    }

    return (
        <div className={classes.CalendarDays}>
            {optionsArray.map(x => (
                <div
                    key={x}
                    style={{
                        width: `${
                            daysDiff > 0 ? (100 - daysDiff * 2) / daysDiff : 98
                        }%`,
                    }}
                    data-date={x}
                    onClick={() => onSelectDayHandler(x)}
                />
            ))}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        events: state.main.events,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectedIndex: i => {
            dispatch(setSelectedElementIndex(i));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDays);
