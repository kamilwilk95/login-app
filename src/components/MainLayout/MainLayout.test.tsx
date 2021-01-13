import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store'
import MainLayout from './MainLayout';
import { Provider } from 'react-redux';
import { render } from '../../tests/test.helpers';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('MainLayout Form Component', () => {
    it('component should be render', () => {
        render(<BrowserRouter><MainLayout><h1>Children</h1></MainLayout></BrowserRouter>);

        expect(screen.getByTestId('app-bar')).toBeTruthy();
    });
});