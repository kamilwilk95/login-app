import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('App should be render', () => {
  const component = shallow(<App />);

  expect(component).toBeTruthy();
});