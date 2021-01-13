import { Avatar, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, GlobalState } from '../../helpers/reducer';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3, 0),
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const Profile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userData = useSelector((state: GlobalState) => state.user);

    useEffect(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return (
        <div className={classes.root} data-testid="profile">
            <Avatar alt={`${userData?.firstName} ${userData?.lastName}`} src={userData?.avatarUrl} className={classes.large} />
            <h3>{`${userData?.firstName} ${userData?.lastName}`}</h3>
        </div>
    );
}

export default Profile;