import React from 'react';

import classes from './Spinner.scss';

const Spinner = () => {
    return (
        <div className={classes.LoaderBackdrop}>
            <div className={classes.Loader}>Loading...</div>
        </div>
    );
};

export default Spinner;
