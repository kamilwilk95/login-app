import axios from 'axios';
import { LoginUserDto, UserDataDto } from '../helpers/dto';
import { LoginFormData } from '../helpers/types';
import { ApiUrlBuilder } from './api';

export const LOGIN_URL = ApiUrlBuilder.getBaseUrl('login');
export const USER_DATA_URL = ApiUrlBuilder.getBaseUrl('profile');

export class UserApi {
    static async logInUser(loginData: LoginFormData): Promise<LoginUserDto> {
        const response = await axios.post(LOGIN_URL, loginData);
        return response.data;
    }

    static async getUserData(): Promise<UserDataDto> {
        const response = await axios.get(USER_DATA_URL, {
            headers: {
                token: localStorage.getItem('token')
            }
        });
        return response.data;
    }
}