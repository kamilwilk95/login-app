import React from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux'
import MainLayout from './components/MainLayout/MainLayout';
import LoginForm from './components/LoginForm/LoginForm';
import Profile from './components/Profile/Profile';
import store from './helpers/store';
import { GlobalState } from './helpers/reducer';

const App = () => {
  const isLogged = useSelector((state: GlobalState) => state.isLogged);
  return (
      <BrowserRouter>
        <MainLayout>
          <Route exact path="/login">
            {isLogged ? <Redirect to='/profile' /> : <LoginForm />}
          </Route>
          <Route exact path="/profile">
            {isLogged ? <Profile /> : <Redirect to='/login' />}
          </Route>
          <Route exact path="/">
            {isLogged ? <Redirect to='/profile' /> : <Redirect to='/login' />}
          </Route>
        </MainLayout>
      </BrowserRouter>
  );
}

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
