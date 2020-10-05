import axios from 'axios';
import { LoginUserDto, UserDataDto } from './dto';
import { LoginFormData } from './types';

const LOGIN_URL = '/api/login';
const USER_DATA_URL = '/api/profile';

axios.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    };

    return config;
});

export const callLogInUser = async (loginData: LoginFormData): Promise<LoginUserDto> => {
    const response = await axios.post(LOGIN_URL, loginData);
    return response.data;
};

export const callUserData = async (): Promise<UserDataDto> => {
    const response = await axios.get(USER_DATA_URL, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return response.data;
};