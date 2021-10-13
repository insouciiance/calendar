import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import classes from './CalendarTable.scss';
import CalendarTableBar from './CalendarTableBar/CalendarTableBar';

class CalendarTable extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			wrapperWidth: null,
			selectedEventId: null
		};
	}

	componentDidMount() {
		this.setState({
			wrapperWidth: document.querySelector(`.${classes.ColumnWrapper}`).offsetWidth
		});

		window.addEventListener('resize', () => {
			clearTimeout(this.doit);
			this.doit = setTimeout(resizedw, 50);
		});

		const resizedw = () => {
			this.setState({
				wrapperWidth: document.querySelector(`.${classes.ColumnWrapper}`).offsetWidth
			});
		};
	}

	render() {
		const { wrapperWidth } = this.state;

		const eventsList = [...this.props.eventsList];

		if (eventsList === []) {
			return <div className={classes.ColumnWrapper} ref={this.wrapperDOM} />;
		}

		const { startDate, daysToShow } = this.props;
		const { ordinaryColor, compellingColor, importantColor } = this.props.customization;

		const datesArray = [];
		for (let i = 0; i < daysToShow; i++) {
			datesArray.push(
				moment(startDate)
					.startOf('day')
					.add(i, 'days')
					.format('YYYY-MM-DD')
			);
		}

		const allRelevantEvents = [];
		const allRelevantEventsCount = [];

		for (let i = 0; i < daysToShow; i++) {
			allRelevantEvents.push([]);
			allRelevantEventsCount.push([0, 0, 0]);
		}

		eventsList
			.filter(
				x =>
					moment(x.date) >= moment(startDate).startOf('day') &&
					moment(x.date) <
						moment(startDate)
							.add(daysToShow, 'days')
							.startOf('day')
			)
			.forEach(x => {
				const dateFormat = moment(x.date).format('YYYY-MM-DD');
				if (
					allRelevantEvents[datesArray.indexOf(dateFormat)].filter(
						checkingEvent => checkingEvent.importance === x.importance
					).length === 0
				) {
					allRelevantEvents[datesArray.indexOf(dateFormat)].push(x);
				}
				allRelevantEventsCount[datesArray.indexOf(dateFormat)][x.importance]++;
			});

		allRelevantEvents.forEach(dayEvents => {
			dayEvents.sort((a, b) => a.importance - b.importance);
		});

		return (
			<div className={classes.CalendarScheduleChartTableContent}>
				<div className={classes.CalendarScheduleChartTableContentInner}>
					{allRelevantEvents.map((dayEvents, index) => (
						<div
							key={index}
							className={classes.ColumnWrapper}
							style={{ width: `${(100 - 2 * daysToShow) / daysToShow}%` }}
						>
							{dayEvents.map(x => {
								const dateFormat = moment(x.date).format('YYYY-MM-DD');
								let fittingColor;

								switch (x.importance) {
									case 0:
										fittingColor = ordinaryColor;
										break;
									case 1:
										fittingColor = compellingColor;
										break;
									case 2:
										fittingColor = importantColor;
										break;
									default:
										fittingColor = 'transparent';
										break;
								}

								return (
									<CalendarTableBar
										event={x}
										color={fittingColor}
										key={x.id}
										isSelected={x.id === this.state.selectedEventId}
										index={eventsList.indexOf(x)}
										wrapperWidth={wrapperWidth}
										selectEventId={eventId => {
											this.setState({ selectedEventId: eventId });
										}}
										eventsCount={
											allRelevantEventsCount[datesArray.indexOf(dateFormat)][
												x.importance
											]
										}
									/>
								);
							})}
						</div>
					))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		daysToShow: state.main.daysToShow,
		customization: state.customizations.customization
	};
};

export default connect(mapStateToProps)(CalendarTable);
