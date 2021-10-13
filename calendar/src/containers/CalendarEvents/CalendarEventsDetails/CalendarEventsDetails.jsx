import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CalendarEventsDetails.scss';
import CalendarEventDetailsCard from './CalendarEventsDetailsCard/CalendarEventsDetailsCard';
import TutorialBackdrop from '../../../components/TutorialBackdrop/TutorialBackdrop';

class CalendarEventsDetails extends Component {
	constructor(props) {
		super(props);

		this.leftDistance = 0;
		this.scrollAmount = this.props.customization.bottomPanelScrollDistance;

		this.CalendarEventsDetailsInnerDOM = React.createRef();
		this.CalendarEventsDetailsInnerFlexDOM = React.createRef();
		this.DistanceBarDOM = React.createRef();
	}

	componentDidMount() {
		this.DistanceBarDOM.current.style.width = `${((this.props.selectedElementIndex + 1) /
			this.props.eventsList.length) *
			100}%`;
	}

	componentDidUpdate(prevProps) {
		console.log('CalendarEventsDetails updated');
		this.scrollAmount = this.props.customization.bottomPanelScrollDistance;

		if (this.props.selectedElementIndex !== prevProps.selectedElementIndex) {
			if (prevProps.eventsList !== this.props.eventsList) {
				this.leftDistance = 0;
			} else {
				const supposedLeftDistance =
					240 * this.props.selectedElementIndex +
					35 -
					(this.CalendarEventsDetailsInnerDOM.current.clientWidth / 2 - 120);

				this.leftDistance = supposedLeftDistance >= 0 ? supposedLeftDistance : 0;
			}

			this.CalendarEventsDetailsInnerFlexDOM.current.style.transform = `translateX(-${this.leftDistance}px)`;
		}
	}

	onLeftPointerClickHandler = () => {
		if (this.leftDistance >= this.scrollAmount) {
			this.CalendarEventsDetailsInnerFlexDOM.current.style.transform = `translateX(-${this
				.leftDistance - this.scrollAmount}px)`;

			this.leftDistance -= this.scrollAmount;
		} else {
			this.CalendarEventsDetailsInnerFlexDOM.current.style.transform = 'translateX(0)';
			this.leftDistance = 0;
		}

		this.DistanceBarDOM.current.style.width = `${((this.props.selectedElementIndex + 1) /
			this.props.eventsList.length) *
			100}%`;
	};

	onRightPointerClickHandler = () => {
		if (
			this.leftDistance <
			this.CalendarEventsDetailsInnerFlexDOM.current.clientWidth - this.scrollAmount * 2
		) {
			this.CalendarEventsDetailsInnerFlexDOM.current.style.transform = `translateX(-${this
				.leftDistance + this.scrollAmount}px)`;

			this.leftDistance += this.scrollAmount;
		} else {
			this.CalendarEventsDetailsInnerFlexDOM.current.style.transform = `translateX(-${this
				.CalendarEventsDetailsInnerFlexDOM.current.clientWidth -
				240 -
				70}px)`;

			this.leftDistance =
				this.CalendarEventsDetailsInnerFlexDOM.current.clientWidth - 240 - 70;
		}

		this.DistanceBarDOM.current.style.width = `${((this.props.selectedElementIndex + 1) /
			this.props.eventsList.length) *
			100}%`;
	};

	render() {
		const { eventsList, selectedElementIndex, tutorialIndex } = this.props;
		const { ordinaryColor, compellingColor, importantColor } = this.props.customization;

		const backdrop =
			tutorialIndex === 4 ? (
				<TutorialBackdrop nextTutorialIndex={5}>
					<p>Here all the events that are shown in the event table are listed</p>
					<p>You can use left/right buttons to move the element</p>
				</TutorialBackdrop>
			) : null;

		return (
			<div
				className={classes.CalendarEventsDetailsInner}
				ref={this.CalendarEventsDetailsInnerDOM}
			>
				<div className={classes.PointerLeft} onClick={this.onLeftPointerClickHandler}>
					&#8249;
				</div>
				<div
					className={classes.CalendarEventsDetailsInnerFlex}
					ref={this.CalendarEventsDetailsInnerFlexDOM}
					style={{ transition: `${this.props.customization.bottomPanelScrollSpeed}ms` }}
				>
					{eventsList.map((x, index) => {
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
							<CalendarEventDetailsCard
								color={fittingColor}
								key={x.id}
								event={x}
								index={index}
								isSelected={selectedElementIndex === index}
							/>
						);
					})}
				</div>
				<div className={classes.PointerRight} onClick={this.onRightPointerClickHandler}>
					&#8250;
				</div>
				<div
					className={classes.DistanceBar}
					ref={this.DistanceBarDOM}
					style={{
						backgroundImage: `linear-gradient(to right, ${ordinaryColor}, ${compellingColor}, ${importantColor})`,
						width: `${((selectedElementIndex + 1) / eventsList.length) * 100}%`
					}}
				/>
				{backdrop}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		customization: state.customizations.customization,
		eventsList: state.main.events,
		selectedElementIndex: state.main.selectedElementIndex,
		tutorialIndex: state.tutorial
	};
};

export default connect(
	mapStateToProps,
	null
)(CalendarEventsDetails);
