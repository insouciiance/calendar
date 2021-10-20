import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './CalendarGraph.scss';
import { getGraphInfoThunk } from '../../../store/actions/index';
import GraphDayInfo from './GraphDayInfo/GraphDayInfo';
import TutorialBackdrop from '../../../components/TutorialBackdrop/TutorialBackdrop';

class CalendarGraph extends Component {
    daysInfos;
    daysCount;
    xDiff;
    gradient;
    ctx;

    constructor(props) {
        super(props);
        this.state = {
            selectedGraphDay: null,
        };

        this.graphHeight = 250;
        this.daysCount = Math.floor(window.innerWidth / 40);
        this.CanvasGraph = React.createRef();
        this.CanvasGraphWrapperDOM = React.createRef();
        this.daysInfos = [];
    }

    componentDidMount() {
        this.props.getGraphInfo(this.daysCount);

        const resizedw = () => {
            const newDaysCount = Math.floor(window.innerWidth / 40);
            if (this.daysCount !== newDaysCount) {
                this.daysCount = newDaysCount;
                this.props.getGraphInfo(this.daysCount);
            }
        };

        let doit;
        window.addEventListener('resize', () => {
            clearTimeout(doit);
            this.forceUpdate();
            doit = setTimeout(resizedw, 500);
        });

        this.ctx = this.CanvasGraph.current.getContext('2d');
        this.ctx.canvas.addEventListener('mousemove', this.mouseMoveHandler);
        this.ctx.canvas.addEventListener('mousedown', this.mouseClickHandler);
        this.ctx.canvas.addEventListener('mouseleave', () =>
            this.updateCanvas(),
        );
    }

    componentDidUpdate() {
        const { graphInfo } = this.props;

        this.daysInfos = [];

        const graphWidth = this.CanvasGraphWrapperDOM.current.clientWidth - 40; // padding

        this.xDiff = graphWidth / (graphInfo.length - 1);

        const maxEventsInDay = Math.max(
            ...graphInfo.map(
                x => x.ordinaryEvents + x.compellingEvents + x.importantEvents,
            ),
        );

        for (let i = 0; i < graphInfo.length; i++) {
            const dayInfo = graphInfo[i];
            const yPos =
                this.graphHeight -
                ((dayInfo.ordinaryEvents +
                    dayInfo.compellingEvents +
                    dayInfo.importantEvents) /
                    maxEventsInDay) *
                    this.graphHeight *
                    0.9;
            const xPos = i * this.xDiff;
            this.daysInfos.push({
                xPos,
                yPos,
                ordinaryEventsCount: graphInfo[i].ordinaryEvents,
                compellingEventsCount: graphInfo[i].compellingEvents,
                importantEventsCount: graphInfo[i].importantEvents,
                date: graphInfo[i].date,
            });
        }

        this.ctx = this.CanvasGraph.current.getContext('2d');
        this.ctx.canvas.width = graphWidth;

        this.updateCanvas();
    }

    mouseMoveHandler = e => {
        const { ordinaryColor, compellingColor, importantColor } =
            this.props.customization;
        const { ctx } = this;
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;

        this.updateCanvas();

        this.daysInfos.forEach(day => {
            if (Math.abs(x - day.xPos) < this.xDiff / 2) {
                ctx.beginPath();
                ctx.fillStyle = importantColor;
                ctx.arc(day.xPos, day.yPos, 7, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = compellingColor;
                ctx.arc(day.xPos, day.yPos, 4, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = ordinaryColor;
                ctx.arc(day.xPos, day.yPos, 3, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();
            }
        });
    };

    mouseClickHandler = e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;

        const selectedDay = { ...this.state.selectedGraphDay };

        this.daysInfos.forEach((day, index) => {
            if (Math.abs(x - day.xPos) < this.xDiff / 2) {
                this.setState({
                    selectedGraphDay:
                        selectedDay.date !== day.date ? day : null,
                    dayBeforeSelected:
                        index > 0 ? this.daysInfos[index - 1] : null,
                    dayAfterSelected:
                        index < this.daysInfos.length - 1
                            ? this.daysInfos[index + 1]
                            : null,
                });
            }
        });
    };

    updateCanvas() {
        const { selectedGraphDay } = this.state;
        const { ordinaryColor, compellingColor, importantColor } =
            this.props.customization;

        const { ctx } = this;
        let { gradient } = this;

        const { width, height } = ctx.canvas;

        ctx.clearRect(0, 0, width, ctx.canvas.height);

        // draw background
        ctx.beginPath();
        ctx.moveTo(0, height);
        this.daysInfos.forEach(day => {
            ctx.lineTo(day.xPos, day.yPos);
        });
        ctx.lineTo(width, height);
        ctx.fillStyle = '#313131';
        ctx.fill();
        ctx.closePath();

        // outline vertical graph lines with linear gradient
        ctx.setLineDash([2, 2]);
        ctx.lineWidth = 1;

        this.daysInfos.forEach(day => {
            if (selectedGraphDay && day.date === selectedGraphDay.date) return;

            const eventsInDay =
                day.ordinaryEventsCount +
                day.compellingEventsCount +
                day.importantEventsCount;

            if (eventsInDay > 0) {
                const ordinaryEventsColorStop = day.ordinaryEventsCount
                    ? 0
                    : null;

                let compellingEventsColorStop = null;
                if (
                    day.compellingEventsCount &&
                    day.ordinaryEventsCount &&
                    day.importantEventsCount
                ) {
                    compellingEventsColorStop =
                        day.ordinaryEventsCount / eventsInDay +
                        day.compellingEventsCount / eventsInDay / 2;
                } else if (day.compellingEventsCount) {
                    compellingEventsColorStop =
                        day.ordinaryEventsCount / eventsInDay +
                        day.compellingEventsCount / eventsInDay;
                }

                const importantEventsColorStop = day.importantEventsCount
                    ? 1
                    : null;

                gradient = ctx.createLinearGradient(0, day.yPos, 0, height);
                if (ordinaryEventsColorStop !== null) {
                    gradient.addColorStop(
                        ordinaryEventsColorStop,
                        ordinaryColor,
                    );
                }
                if (compellingEventsColorStop !== null) {
                    gradient.addColorStop(
                        compellingEventsColorStop,
                        compellingColor,
                    );
                }
                if (importantEventsColorStop !== null) {
                    gradient.addColorStop(
                        importantEventsColorStop,
                        importantColor,
                    );
                }

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.moveTo(day.xPos, day.yPos);
                ctx.lineTo(day.xPos, height);
                ctx.stroke();
                ctx.closePath();
            }
        });

        ctx.setLineDash([]);

        // outline graph curve
        ctx.beginPath();
        ctx.lineWidth = 2;

        gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, ordinaryColor);
        gradient.addColorStop(0.5, compellingColor);
        gradient.addColorStop(1, importantColor);

        this.daysInfos.forEach(day => {
            ctx.lineTo(day.xPos, day.yPos);
            ctx.moveTo(day.xPos, day.yPos);
        });
        ctx.strokeStyle = gradient;
        ctx.stroke();
        ctx.closePath();

        // draw circles

        this.daysInfos.forEach(day => {
            if (selectedGraphDay && day.date === selectedGraphDay.date) {
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 3;

                ctx.beginPath();
                ctx.strokeStyle = 'white';
                ctx.moveTo(day.xPos, 0);
                ctx.lineTo(day.xPos, height);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = importantColor;
                ctx.arc(day.xPos, day.yPos, 8, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = compellingColor;
                ctx.arc(day.xPos, day.yPos, 5, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = ordinaryColor;
                ctx.arc(day.xPos, day.yPos, 2, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.closePath();

                ctx.setLineDash([2, 2]);
                ctx.lineWidth = 1;
            } else {
                ctx.beginPath();
                ctx.moveTo(day.xPos, day.yPos);
                ctx.arc(day.xPos, day.yPos, 4, 0, 2 * Math.PI, false);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.closePath();
            }
        });
    }

    render() {
        const { selectedGraphDay, dayBeforeSelected, dayAfterSelected } =
            this.state;
        const { ordinaryColor, compellingColor, importantColor } =
            this.props.customization;
        const { tutorialIndex } = this.props;

        const backdrop =
            tutorialIndex === 3 ? (
                <TutorialBackdrop nextTutorialIndex={4}>
                    <p>
                        Right here you&apos;re able to see all the events in a
                        simple graph
                    </p>
                    <p>
                        The number of days in the graph depends on the width of
                        the screen
                    </p>
                    <p>Every day is also clickable!</p>
                </TutorialBackdrop>
            ) : null;

        return (
            <div
                className={classes.CalendarGraphWrapper}
                ref={this.CanvasGraphWrapperDOM}>
                <p className={classes.Forecast}>
                    {this.daysCount}-day Forecast
                </p>
                <div className={classes.CanvasWrapper}>
                    <canvas ref={this.CanvasGraph} height={this.graphHeight} />
                </div>
                {selectedGraphDay ? (
                    <GraphDayInfo
                        ordinaryColor={ordinaryColor}
                        compellingColor={compellingColor}
                        importantColor={importantColor}
                        selectedGraphDay={selectedGraphDay}
                        dayBeforeSelected={dayBeforeSelected}
                        dayAfterSelected={dayAfterSelected}
                    />
                ) : null}
                {backdrop}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        graphInfo: state.main.graphInfo,
        customization: state.customizations.customization,
        tutorialIndex: state.tutorial,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGraphInfo: daysCount => dispatch(getGraphInfoThunk(daysCount)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarGraph);
