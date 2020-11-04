import React from 'react';
import './App.css';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux'
import MainLayout from './components/MainLayout/MainLayout';
import LoginForm from './components/LoginForm/LoginForm';
import Profile from './components/Profile/Profile';
import store from './helpers/store';
import { clearError, GlobalState } from './helpers/reducer';
import { CircularProgress, makeStyles, Modal, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(5, 2),
    color: red[500],
    background: '#ffffff',
  },
  loader: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
  }
}));

const App = () => {
  const classes = useStyles();

  const { isLogged, error, loading } = useSelector((state: GlobalState) => ({
    isLogged: state.isLogged,
    error: state.error,
    loading: state.loading
  }));

  const dispatch = useDispatch();

  return (
    <HashRouter>
      <MainLayout>
        <Route exact={true} path="/login">
          {isLogged ? <Redirect to="/profile" /> : <LoginForm />}
        </Route>
        <Route exact={true} path="/profile">
          {isLogged ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route exact={true} path="/">
          {isLogged ? <Redirect to="/profile" /> : <Redirect to="/login" />}
        </Route>
      </MainLayout>
      <Modal
        open={!!error}
        onClose={() => dispatch(clearError())}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <p className={classes.modal}>
          {error}
        </p>
      </Modal>
      {loading && <CircularProgress className={classes.loader} />}
    </HashRouter>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
