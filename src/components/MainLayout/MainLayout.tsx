import React from 'react';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

    return (
        <>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    <Button component={Link} to='/login' color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {children}
        </>
    );
}

export default MainLayout;