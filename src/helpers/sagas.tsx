import { call, put, takeEvery } from 'redux-saga/effects'
import { callLogInUser, callUserData } from './api-service';
import { LoginUserDto, UserDataDto } from './dto';
import { fetchError, fetchStart, fetchSuccessfully, FETCH_USER_DATA, loggedSuccessfully, LogInUser, LOG_IN_USER, LOG_OUT_USER, removeUserData, saveUserData } from './reducer';

function* fetchLogin(action: LogInUser) {
    try {
        yield put(fetchStart());
        const response: LoginUserDto = yield call(callLogInUser, action.payload);
        
        localStorage.setItem('token', response.token);
        yield put(loggedSuccessfully());
        yield put(fetchSuccessfully());
    } catch (e) {
        yield put(fetchError("Something doesn't work :("));
    }
}

function* fetchGetProfileData() {
    try {
        yield put(fetchStart());
        const response: UserDataDto = yield call(callUserData);
        yield put(saveUserData(response));
        yield put(fetchSuccessfully());
    } catch (e) {
        yield put(fetchError("Something doesn't work :("));
    }
}

function* fetchLogOut() {
    localStorage.removeItem('token');
    yield put(removeUserData());
}

function* rootSaga() {
    yield takeEvery(LOG_IN_USER, fetchLogin);
    yield takeEvery(LOG_OUT_USER, fetchLogOut);
    yield takeEvery(FETCH_USER_DATA, fetchGetProfileData);
}

export default rootSaga;