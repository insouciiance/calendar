import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import classes from './CalendarMonths.scss';
import { setSelectedElementIndex } from '../../../store/actions';

const CalendarMonths = props => {
	const { startDate, endDate, setSelectedIndex, events } = props;

	const onSelectMonthHandler = month => {
		const selectedElement = events.find(x => moment(x.date).format('MMMM') === month);
		const selectedElementIndex = events.indexOf(selectedElement);

		if (selectedElementIndex !== -1) {
			setSelectedIndex(selectedElementIndex);
		}
	};

	const firstMonth = moment(startDate).format('MMMM');
	const secondMonth = moment(endDate).format('MMMM');

	const firstMonthDays = moment(startDate).daysInMonth() - moment(startDate).date() + 1;

	if (firstMonth === secondMonth) {
		return (
			<div
				className={classes.DateLine}
				data-mon={firstMonth}
				onClick={() => onSelectMonthHandler(firstMonth)}
			/>
		);
	}

	return (
		<>
			<div
				className={classes.DateLine}
				data-mon={firstMonth}
				style={{ width: `${firstMonthDays * 20}%` }}
				onClick={() => onSelectMonthHandler(firstMonth)}
			/>
			<div
				className={classes.DateLine}
				data-mon={secondMonth}
				style={{ width: `${100 - firstMonthDays * 20}%` }}
				onClick={() => onSelectMonthHandler(secondMonth)}
			/>
		</>
	);
};

const mapStateToProps = state => {
	return {
		events: state.main.events
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setSelectedIndex: i => dispatch(setSelectedElementIndex(i))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarMonths);
