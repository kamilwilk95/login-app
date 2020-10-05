import 'jsdom-global/register';
import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store'
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';

describe('Login Form Component', () => {
    let component: ReactWrapper | null = null;
    const initialState = {}
    const mockStore = configureStore()

    beforeEach(() => {
        const store = mockStore(initialState);

        component = mount(<Provider store={store}><LoginForm /></Provider>);
    });

    it('component should be render', () => {
        expect(component).toBeTruthy();
    });

    it('should render inputs', () => {
        const emailInput = component?.find('input[name="email"]');
        const passwordInput = component?.find('input[name="password"]');
        const button = component?.find('button[type="submit"]');

        expect(emailInput?.prop('name')).toEqual('email');
        expect(passwordInput?.prop('name')).toEqual('password');
        expect(button?.prop('disabled')).toEqual(false);
    });
});