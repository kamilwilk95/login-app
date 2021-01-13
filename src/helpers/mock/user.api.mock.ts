import { rest } from 'msw';
import {LoginUserDto} from '../../helpers/dto';
import { LOGIN_URL, USER_DATA_URL } from '../../api/user.api';
import { LoginFormData } from '../types';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';

export class UserMockApi {

    static TOKEN = 'private_token';

    static logInUser = {
        getSuccessResponse: (): LoginUserDto => ({
            token: UserMockApi.TOKEN
        }),
        getErrorResponse: () => ({
            msg: 'Incorrect auth data'
        }),
        handle: () => rest.post(LOGIN_URL, (req, res, ctx) => {
            const {email, password} = req.body as LoginFormData;
            if (email === 'admin@admin.com' && password === 'pAssword123') {
                return res(
                    ctx.json(UserMockApi.logInUser.getSuccessResponse())
                );
            } else {
                return res(
                    ctx.status(403),
                    ctx.json(UserMockApi.logInUser.getErrorResponse())
                );
            }
        }),
        handleSuccess: () => rest.post(LOGIN_URL, (req, res, ctx) => {
            return res(
                ctx.json(UserMockApi.logInUser.getSuccessResponse())
            );
        }),
        handleError: () => rest.post(LOGIN_URL, (req, res, ctx) => {
            console.log('ERRORR!!')
            return res(
                ctx.status(403),
                ctx.json(UserMockApi.logInUser.getErrorResponse())
            );
        }),
    }

    static getUserData = {
        getSuccessResponse: () => ({
            firstName: 'Kamil',
            lastName: 'Wilk',
            avatarUrl: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg'
        }),
        getErrorResponse: () => ({
            msg: 'You must be logged'
        }),
        handle: () => rest.get(USER_DATA_URL, (req, res, ctx) => {
            if (req.headers.get('token') === UserMockApi.TOKEN) {
                return res(ctx.json(UserMockApi.getUserData.getSuccessResponse()));
            } else {
                return res(ctx.status(403), ctx.json(UserMockApi.getUserData.getErrorResponse()));
            }
        }),
        handleSuccess: () => rest.get(USER_DATA_URL, (req, res, ctx) => {
            return res(ctx.json(UserMockApi.getUserData.getSuccessResponse()));
        }),
        handleError: () => rest.get(USER_DATA_URL, (req, res, ctx) => {
            return res(ctx.status(403), ctx.json(UserMockApi.getUserData.getErrorResponse()));
        }),
    }

    static getHandlers(): RequestHandlersList {
        return [
            UserMockApi.logInUser.handle(),
            UserMockApi.getUserData.handle()
        ];
    }
}