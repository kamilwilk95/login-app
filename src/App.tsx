import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import MainLayout from './components/MainLayout/MainLayout';
import LoginForm from './components/LoginForm/LoginForm';
import Profile from './components/Profile/Profile';

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/profile" component={Profile} />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
