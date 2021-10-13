import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './CalendarEvents.scss';
import Spinner from '../../components/Spinner/Spinner';
import CalendarDays from './CalendarDays/CalendarDays';
import CalendarTable from './CalendarTable/CalendarTable';
import CalendarMonths from './CalendarMonths/CalendarMonths';
import CalendarEventsDetails from './CalendarEventsDetails/CalendarEventsDetails';
import Customization from './Customization/Customization';
import customizations from '../../js/customizations';
import CalendarGraph from './CalendarGraph/CalendarGraph';
import TutorialBackdrop from '../../components/TutorialBackdrop/TutorialBackdrop';

class CalendarEvents extends Component {
	constructor(props) {
		super(props);

		customizations.checkCustomizations();

		this.state = {
			isScrolling: false
		};

		this.CurrentDateTimeDOM = React.createRef();
	}

	componentDidMount() {
		this.props.getEvents(this.props.startDate, this.props.endDate);

		this.timeInterval = setInterval(() => {
			const currentTime = moment().format('LL (dddd) LTS');
			this.CurrentDateTimeDOM.current.innerHTML = `Currently: ${currentTime}`;
		}, 1000);

		window.addEventListener('resize', () => {
			const { windowWidth } = this.props;
			if (window.innerWidth < 650 && windowWidth >= 650) {
				this.props.setDays(1, window.innerWidth);
			} else if (
				window.innerWidth >= 650 &&
				window.innerWidth < 1150 &&
				(windowWidth < 650 || windowWidth > 1150)
			) {
				this.props.setDays(3, window.innerWidth);
			} else if (window.innerWidth >= 1150 && windowWidth < 1150) {
				this.props.setDays(5, window.innerWidth);
			}
		});
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.startDate !== prevProps.startDate &&
			this.props.endDate !== prevProps.endDate
		) {
			this.removeScrollAnimation();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timeInterval);
	}

	scrollHandler = scrollDirection => {
		if (this.state.isScrolling) return;

		this.setState({
			isScrolling: true,
			framesTrantision: `translateX(${-100 * scrollDirection}%)`
		});

		this.timeout = setTimeout(() => {
			const { startDate, endDate, daysToShow } = this.props;
			if (scrollDirection > 0) {
				this.props.getEvents(
					moment(endDate)
						.startOf('day')
						.add(1, 'days'),
					moment(endDate)
						.startOf('day')
						.add(daysToShow, 'days')
				);
			} else {
				this.props.getEvents(
					moment(startDate)
						.startOf('day')
						.add(-daysToShow, 'days'),
					moment(startDate)
						.startOf('day')
						.add(-1, 'days')
				);
			}
		}, this.props.customization.upperPanelScrollSpeed);
	};

	removeScrollAnimation = () => {
		this.setState({ isScrolling: false, framesTrantision: 'translateX(0)' });
	};

	render() {
		const { framesTrantision, isScrolling } = this.state;

		const { events, startDate, endDate, customization, daysToShow, tutorialIndex } = this.props;

		const backdrop =
			tutorialIndex === 2 ? (
				<TutorialBackdrop nextTutorialIndex={3}>
					<p>This is the events table section</p>
					<p>
						Here all the events are shown as a simple table with name, time and country
						of origin
					</p>
					<p>You can use left/right buttons to scroll</p>
				</TutorialBackdrop>
			) : null;

		const calendarScheduleChartContent = (
			<>
				<div className={classes.CalendarScheduleChartTable}>
					<div className={classes.CalendarScheduleChartContentWrapper}>
						<div
							className={classes.PointerLeft}
							onClick={() => {
								this.scrollHandler(-1);
							}}
						>
							&#8249;
						</div>
						<div className={classes.CalendarScheduleChartEventsContainer}>
							<div
								className={classes.CalendarScheduleChartContentFrames}
								style={{
									transition: isScrolling
										? `${customization.upperPanelScrollSpeed}ms`
										: '0s',
									transform: framesTrantision
								}}
							>
								<div className={classes.CalendarScheduleChartContent}>
									<CalendarMonths
										startDate={moment(startDate).add(-daysToShow, 'days')}
										endDate={moment(startDate).add(-1, 'days')}
									/>
									<CalendarTable
										startDate={moment(startDate).add(-daysToShow, 'days')}
										endDate={moment(startDate).add(-1, 'days')}
										eventsList={events}
									/>
									<CalendarDays
										startDate={moment(startDate).add(-daysToShow, 'days')}
										endDate={moment(startDate).add(-1, 'days')}
									/>
								</div>
								<div className={classes.CalendarScheduleChartContent}>
									<CalendarMonths startDate={startDate} endDate={endDate} />
									<CalendarTable
										startDate={startDate}
										endDate={endDate}
										eventsList={events}
									/>
									<CalendarDays startDate={startDate} endDate={endDate} />
								</div>
								<div className={classes.CalendarScheduleChartContent}>
									<CalendarMonths
										startDate={moment(endDate).add(1, 'days')}
										endDate={moment(endDate).add(daysToShow, 'days')}
									/>
									<CalendarTable
										startDate={moment(endDate).add(1, 'days')}
										endDate={moment(endDate).add(daysToShow, 'days')}
										eventsList={events}
									/>
									<CalendarDays
										startDate={moment(endDate).add(1, 'days')}
										endDate={moment(endDate).add(daysToShow, 'days')}
									/>
								</div>
							</div>
						</div>
						<div
							className={classes.PointerRight}
							onClick={() => {
								this.scrollHandler(1);
							}}
						>
							&#8250;
						</div>
						{backdrop}
					</div>
				</div>
				<div className={classes.CalendarGraph}>
					<CalendarGraph />
				</div>
				<div className={classes.CalendarEventsDetails}>
					<CalendarEventsDetails />
				</div>
			</>
		);

		return (
			<div
				className={classes.CalendarScheduleWrapper}
				style={{ fontFamily: customization.fontFamily }}
			>
				{events.length === 0 ? <Spinner /> : null}
				<div className={classes.CalendarScheduleChart}>
					<div className={classes.UpperBar}>
						<div className={classes.CurrentDateTime} ref={this.CurrentDateTimeDOM}>
							Currently: {moment().format('LL (dddd) LTS')}
						</div>
					</div>
					<Customization />
					{calendarScheduleChartContent}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		startDate: state.main.startDate,
		endDate: state.main.endDate,
		events: state.main.events,
		customization: state.customizations.customization,
		daysToShow: state.main.daysToShow,
		windowWidth: state.main.windowWidth,
		tutorialIndex: state.tutorial
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getEvents: (startDate, endDate, includePassedEvents) =>
			dispatch(actions.getEventsThunk(startDate, endDate, includePassedEvents)),
		setSelectedElementIndex: index => dispatch(actions.setSelectedElementIndex(index)),
		setDays: (daysToShow, windowWidth) =>
			dispatch(actions.setDaysToShow(daysToShow, windowWidth))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CalendarEvents);
