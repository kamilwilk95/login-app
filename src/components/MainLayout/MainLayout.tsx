import React from 'react';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState, logOutUser } from '../../helpers/reducer';

const useStyles = makeStyles((theme) => ({
    toolbar: {
      justifyContent: 'flex-end'
    }
  }));

type MainLayoutProps = {
    children: React.ReactNode,
}

const MainLayout = ({children}: MainLayoutProps) => {
    const classes = useStyles();
    const logged = useSelector((state: GlobalState) => state.isLogged);
    const dispatch = useDispatch();

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    {logged ? <Button onClick={() => dispatch(logOutUser())} color="inherit">Logout</Button>
                    : <Button component={Link} to="/login" color="inherit">Login</Button>}
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}

export default MainLayout;