import React from 'react';
import Profile from './Profile';
import { render } from '../../tests/test.helpers';
import { screen } from '@testing-library/react';

describe('Profile Form Component', () => {
    it('component should be render', () => {
        render(<Profile />);

        expect(screen.getByTestId('profile')).toBeTruthy();
    });
});