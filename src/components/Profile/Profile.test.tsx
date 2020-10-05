import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store'
import Profile from './Profile';
import { Provider } from 'react-redux';

describe('Profile Form Component', () => {
    let component: ShallowWrapper | null = null;
    const initialState = {}
    const mockStore = configureStore()

    beforeEach(() => {
        const store = mockStore(initialState);
        component = shallow(<Provider store={store}><Profile /></Provider>);
    });

    it('component should be render', () => {
        expect(component).toBeTruthy();
    });
});