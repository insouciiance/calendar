import React from 'react';
import moment from 'moment';

import classes from './DayEventsComparison.scss';

const DayEventsComparison = props => {
	const { dayToCompare, currentDay, ordinaryColor, compellingColor, importantColor } = props;

	if (!dayToCompare) {
		return <div className={classes.DayEventsComparison} />;
	}

	const timeDiff = moment(currentDay.date).diff(moment(dayToCompare.date));
	const diffCoeff = timeDiff / Math.abs(timeDiff);

	const ordinaryEventsDifference =
		(currentDay.ordinaryEventsCount - dayToCompare.ordinaryEventsCount) * diffCoeff;
	const compellingEventsDifference =
		(currentDay.compellingEventsCount - dayToCompare.compellingEventsCount) * diffCoeff;
	const importantEventsDifference =
		(currentDay.importantEventsCount - dayToCompare.importantEventsCount) * diffCoeff;

	let ordinaryArrow = <i className='fas fa-arrows-alt-h' />;
	if (ordinaryEventsDifference > 0) {
		ordinaryArrow = <i className='fas fa-angle-up' style={{ color: 'lightgreen' }} />;
	} else if (ordinaryEventsDifference < 0) {
		ordinaryArrow = <i className='fas fa-angle-down' style={{ color: '#dc143c ' }} />;
	}

	let compellingArrow = <i className='fas fa-arrows-alt-h' />;
	if (compellingEventsDifference > 0) {
		compellingArrow = <i className='fas fa-angle-up' style={{ color: 'lightgreen' }} />;
	} else if (compellingEventsDifference < 0) {
		compellingArrow = <i className='fas fa-angle-down' style={{ color: '#dc143c ' }} />;
	}

	let importantArrow = <i className='fas fa-arrows-alt-h' />;
	if (importantEventsDifference > 0) {
		importantArrow = <i className='fas fa-angle-up' style={{ color: 'lightgreen' }} />;
	} else if (importantEventsDifference < 0) {
		importantArrow = <i className='fas fa-angle-down' style={{ color: '#dc143c ' }} />;
	}

	return (
		<div className={classes.DayEventsComparison}>
			<p>{moment(dayToCompare.date).format('ddd DD MMM')}</p>
			<div
				className={classes.EventsTypeComparison}
				style={{ flexDirection: timeDiff > 0 ? 'row' : 'row-reverse' }}
			>
				<span style={{ color: ordinaryColor }}>{dayToCompare.ordinaryEventsCount}</span>
				{ordinaryArrow}
				<span>{Math.abs(ordinaryEventsDifference)}</span>
			</div>
			<div
				className={classes.EventsTypeComparison}
				style={{ flexDirection: timeDiff > 0 ? 'row' : 'row-reverse' }}
			>
				<span style={{ color: compellingColor }}>{dayToCompare.compellingEventsCount}</span>
				{compellingArrow}
				<span>{Math.abs(compellingEventsDifference)}</span>
			</div>
			<div
				className={classes.EventsTypeComparison}
				style={{ flexDirection: timeDiff > 0 ? 'row' : 'row-reverse' }}
			>
				<span style={{ color: importantColor }}>{dayToCompare.importantEventsCount}</span>
				{importantArrow}
				<span>{Math.abs(importantEventsDifference)}</span>
			</div>
		</div>
	);
};

export default DayEventsComparison;
