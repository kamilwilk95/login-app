import * as React from 'react'
import LoginForm from './LoginForm';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render, storeForTest } from '../../tests/test.helpers';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';
import { expectRedux } from 'expect-redux';
import { LOG_IN_USER } from '../../helpers/reducer';

describe('Login Form Component', () => {
    it('component should be render', () => {
        render(<LoginForm />);

        expect(screen.getByRole('heading')).toBeTruthy();
    });

    it('should render inputs', () => {
        render(<LoginForm />);

        expect(screen.getByText('Email')).toBeTruthy();
        expect(screen.getByText('Password')).toBeTruthy();
        expect(screen.getByRole('button')).toBeTruthy();
    });

    it('should disable button', async () => {
        render(<LoginForm />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => expect(button).toBeDisabled());
    });

    it('should enabled button after input correct value', async () => {
        render(<LoginForm />);
        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => expect(button).toBeDisabled());

        fireEvent.change(screen.getByTestId('email-input'), {
            target: {
                value: 'email@email.com'
            }
        });

        fireEvent.change(screen.getByTestId('password-input'), {
            target: {
                value: 'passwordDSA123'
            }
        });
        await waitFor(() => expect(button).not.toBeDisabled());
    });

    it('should call dispatch after submit form', async () => {
        render(<LoginForm />);
        const button = screen.getByRole('button');

        fireEvent.change(screen.getByTestId('email-input'), {
            target: {
                value: 'email@email.com'
            }
        });

        fireEvent.change(screen.getByTestId('password-input'), {
            target: {
                value: 'passwordDSA123'
            }
        });
        await waitFor(() => expect(button).not.toBeDisabled());
        fireEvent.click(button);

        await waitFor(() => expectRedux(storeForTest).toDispatchAnAction().ofType(LOG_IN_USER));
    });
});