import * as React from 'react'
import LoginForm from './LoginForm';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render, storeForTest } from '../../tests/test.helpers';
import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node'
import { expectRedux } from 'expect-redux';
import { UserMockApi } from '../../helpers/mock/user.api.mock';
import { FETCH_ERROR } from '../../helpers/reducer';

const server = setupServer(
    UserMockApi.logInUser.handleSuccess()
);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login Form Component', () => {
    it('should set isLogged to true after call', async () => {
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

        await waitFor(() => expectRedux(storeForTest).toHaveState().withSubtree(state => state.isLogged).matching(true));
    });

    it('should show error modal on error', async () => {
        server.use(UserMockApi.logInUser.handleError());

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

        await waitFor(() => expectRedux(storeForTest).toDispatchAnAction().ofType(FETCH_ERROR));
    });
});