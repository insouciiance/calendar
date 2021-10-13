import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setTutorialStage } from '../../store/actions';
import classes from './TutorialBackdrop.scss';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const TutorialBackdrop = props => {
	const {
		nextTutorialIndex,
		setTutorialIndex,
		auxBdStyle,
		auxFullBdStyle,
		isUnscrollable,
		scrollToTop
	} = props;

	useEffect(() => {
		if (isUnscrollable) {
			document.body.style.overflowY = 'hidden';
			document.documentElement.overflowY = 'hidden';
		}
		if (scrollToTop) {
			document.documentElement.scrollTop = 0;
		}
		return () => {
			if (isUnscrollable) {
				document.body.style.overflowY = 'visible';
				document.documentElement.style.overflowY = 'visible';
			}
		};
	}, []);

	return (
		<Auxiliary>
			<div
				className={classes.FullPageBackdrop}
				onClick={() => {
					setTutorialIndex(nextTutorialIndex);
				}}
				style={{ ...auxFullBdStyle }}
			/>
			<div className={classes.Backdrop} style={{ ...auxBdStyle }}>
				<div className={classes.BackdropContents}>{props.children}</div>
			</div>
			<button
				className={classes.ExitButton}
				onClick={() => {
					setTutorialIndex(-1);
				}}
			>
				Exit
			</button>
		</Auxiliary>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		setTutorialIndex: index => {
			dispatch(setTutorialStage(index));
		}
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(TutorialBackdrop)
);
