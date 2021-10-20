import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Layout.scss';
import { logOutThunk, setTutorialStage } from '../../store/actions';
import TutorialBackdrop from '../../components/TutorialBackdrop/TutorialBackdrop';

const Layout = props => {
    const { user, logOut, setTutorialIndex, tutorialStageIndex } = props;

    let backdrop = null;
    if (tutorialStageIndex === 0) {
        backdrop = (
            <TutorialBackdrop
                nextTutorialIndex={1}
                auxBdStyle={{ position: 'fixed', border: 'none' }}
                auxFullBdStyle={{ backgroundColor: 'navy' }}
                isUnscrollable>
                <h1>Welcome to the tutorial</h1>
                <p>Click anywhere to continue</p>
            </TutorialBackdrop>
        );
    } else if (tutorialStageIndex === 1) {
        backdrop = (
            <TutorialBackdrop
                nextTutorialIndex={2}
                auxBdStyle={{ position: 'fixed', border: 'none' }}
                auxFullBdStyle={{ backgroundColor: 'navy' }}
                isUnscrollable>
                <p>
                    This is the app which helps keep track of upcoming events
                    worldwide
                </p>
                <p>Now you&apos;ll be shown all features</p>
            </TutorialBackdrop>
        );
    } else if (tutorialStageIndex === 6) {
        backdrop = (
            <TutorialBackdrop
                nextTutorialIndex={-1}
                auxBdStyle={{ position: 'fixed', border: 'none' }}
                auxFullBdStyle={{ backgroundColor: 'navy' }}
                isUnscrollable>
                <h1>That&apos;s all. Good luck!</h1>
            </TutorialBackdrop>
        );
    }

    return (
        <div>
            <div className={classes.HeaderInfo}>
                {user ? (
                    <>
                        <button onClick={setTutorialIndex.bind(null, 0)}>
                            Tutorial
                        </button>
                        <header>
                            <div className={classes.UserInfo}>
                                Hello, <span>{user.username}</span>
                                <NavLink to="/" onClick={logOut}>
                                    Log out
                                </NavLink>
                            </div>
                        </header>
                    </>
                ) : null}
            </div>
            {props.children}
            {backdrop}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        tutorialStageIndex: state.tutorial,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(logOutThunk());
        },
        setTutorialIndex: index => {
            dispatch(setTutorialStage(index));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
