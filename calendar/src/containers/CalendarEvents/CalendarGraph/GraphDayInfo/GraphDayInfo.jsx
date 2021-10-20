import React from 'react';
import moment from 'moment';

import DayEventsComparison from './DayEventsComparison/DayEventsComparison';

import classes from './GraphDayInfo.scss';

const SelectedDayInfo = props => {
    const {
        ordinaryColor,
        compellingColor,
        importantColor,
        selectedGraphDay,
        dayAfterSelected,
        dayBeforeSelected,
    } = props;
    return (
        <div className={classes.GraphDayInfo}>
            <h2>
                {moment(selectedGraphDay.date).format('dddd, MMMM DD, YYYY')}
            </h2>
            <h3>
                {selectedGraphDay.ordinaryEventsCount +
                    selectedGraphDay.compellingEventsCount +
                    selectedGraphDay.importantEventsCount}{' '}
                events
            </h3>
            <div className={classes.SelectedDayInfo}>
                <DayEventsComparison
                    currentDay={selectedGraphDay}
                    dayToCompare={dayBeforeSelected}
                    ordinaryColor={ordinaryColor}
                    compellingColor={compellingColor}
                    importantColor={importantColor}
                />
                <div className={classes.GraphDayEvents}>
                    <div>
                        <p style={{ color: ordinaryColor }}>Ordinary</p>
                        <div
                            className={classes.EventsTypeCount}
                            data-count={selectedGraphDay.ordinaryEventsCount}
                            style={{ backgroundColor: ordinaryColor }}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                color: compellingColor,
                            }}>
                            Compelling
                        </p>
                        <div
                            className={classes.EventsTypeCount}
                            data-count={selectedGraphDay.compellingEventsCount}
                            style={{ backgroundColor: compellingColor }}
                        />
                    </div>
                    <div>
                        <p
                            style={{
                                color: importantColor,
                            }}>
                            Important
                        </p>
                        <div
                            className={classes.EventsTypeCount}
                            data-count={selectedGraphDay.importantEventsCount}
                            style={{ backgroundColor: importantColor }}
                        />
                    </div>
                </div>
                <DayEventsComparison
                    currentDay={selectedGraphDay}
                    dayToCompare={dayAfterSelected}
                    ordinaryColor={ordinaryColor}
                    compellingColor={compellingColor}
                    importantColor={importantColor}
                />
            </div>
        </div>
    );
};

export default SelectedDayInfo;
