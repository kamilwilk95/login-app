import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import configureStore from 'redux-mock-store'
import MainLayout from './MainLayout';
import { Provider } from 'react-redux';

describe('MainLayout Form Component', () => {
    let component: ShallowWrapper | null = null;
    const initialState = {}
    const mockStore = configureStore()

    beforeEach(() => {
        const store = mockStore(initialState);
        component = shallow(<Provider store={store}><MainLayout><div id="children">Children</div></MainLayout></Provider>);
    });

    it('component should be render', () => {
        expect(component).toBeTruthy();
    });
});