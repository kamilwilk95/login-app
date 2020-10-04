import { LoginFormData } from './types';

export type GlobalState = {
    loading: boolean;
    error?: string;
    user?: UserData | null;
    isLogged: boolean;
};

type UserData = {
    firstName: string;
    lastName: string;
    avatarUrl: string;
};

const initialState: GlobalState = {
    loading: false,
    isLogged: !!localStorage.getItem('token')
};

//actions
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESSFULLY = 'FETCH_SUCCESSFULLY';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
export const LOG_IN_USER = 'LOG_IN_USER';
export const LOGGED_SUCCESSFULLY = 'LOGGED_SUCCESSFULLY';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';

interface FetchStart {
    type: typeof FETCH_START
}

interface FetchSuccessfully {
    type: typeof FETCH_SUCCESSFULLY
}

interface LogOutUser {
    type: typeof LOG_OUT_USER
}

interface RemoveUserData {
    type: typeof REMOVE_USER_DATA
}

interface FetchError {
    type: typeof FETCH_ERROR,
    payload: string
}

interface SaveUserData {
    type: typeof SAVE_USER_DATA,
    payload: UserData
}

export interface LogInUser {
    type: typeof LOG_IN_USER,
    payload: LoginFormData
}

export interface FetchUserData {
    type: typeof FETCH_USER_DATA
}

export interface LoggedSuccessfully {
    type: typeof LOGGED_SUCCESSFULLY
}

type ActionType = FetchStart | FetchSuccessfully | FetchError | SaveUserData | LoggedSuccessfully | RemoveUserData;

export const fetchStart = (): FetchStart => ({
    type: FETCH_START,
});

export const fetchError = (error: string): FetchError => ({
    type: FETCH_ERROR,
    payload: error
});

export const fetchSuccessfully = (): FetchSuccessfully => ({
    type: FETCH_SUCCESSFULLY
});

export const saveUserData = (data: UserData): SaveUserData => ({
    type: SAVE_USER_DATA,
    payload: data
});

export const logOutUser = (): LogOutUser => ({
    type: LOG_OUT_USER
});

export const removeUserData = (): RemoveUserData => ({
    type: REMOVE_USER_DATA
});

export const logInUser = (loginData: LoginFormData): LogInUser => ({
    type: LOG_IN_USER,
    payload: loginData
});

export const fetchUserData = () => ({
    type: FETCH_USER_DATA
});

export const loggedSuccessfully = () => ({
    type: LOGGED_SUCCESSFULLY
});

const globalReducer = (state: GlobalState = initialState, action: ActionType): GlobalState => {
    switch (action.type) {
        case FETCH_START: {
            return {
                ...state,
                loading: true
            };
        }
        case FETCH_SUCCESSFULLY: {
            return {
                ...state,
                loading: false
            };
        }

        case FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        }

        case SAVE_USER_DATA: {
            return {
                ...state,
                user: action.payload
            };
        }

        case REMOVE_USER_DATA: {
            return {
                ...state,
                user: null,
                isLogged: false
            };
        }

        case LOGGED_SUCCESSFULLY: {
            return {
                ...state,
                isLogged: true,
            };
        }

        default:
            return state;
    }
}

export default globalReducer;