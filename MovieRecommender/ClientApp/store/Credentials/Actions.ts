import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';
import axios from 'axios';
import { ApiConstants, SharedConstants } from '../../constants/constants';

interface LoginAction {
    type: 'LOGIN';
    payload: any;
}

interface ReceiveLoginResultsAction {
    type: 'RECEIVE_LOGIN_RESULTS',
    payload: any
}

interface LogoutAction {
    type: 'LOGOUT';
    payload: any;
}

interface RegisterAction {
    type: 'REGISTER';
    payload: any;
}

interface SetApiCallErrorAction {
    type: 'SET_API_CALL_ERROR';
    payload: any;
}

interface ClearApiCallErrorAction {
    type: 'CLEAR_API_CALL_ERROR';
}

interface SetErrorAction {
    type: 'SET_ERROR';
    payload: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = LoginAction | ReceiveLoginResultsAction | LogoutAction
    | RegisterAction
    | SetApiCallErrorAction | ClearApiCallErrorAction | SetErrorAction | ClearErrorAction;

// ACTION CREATORS
export const actionCreators = {
    login: (user: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const timeout = ApiConstants.API_CALL_TIMEOUT;
        const token = localStorage.getItem(SharedConstants.REQUEST_VERIFICATION_TOKEN);
        const httpClient = axios.create();
        httpClient.defaults.timeout = timeout;

        const data = {
            // TODO
        };
        const headers = {
            'Content-Type': 'application/json',
            [SharedConstants.REQUEST_VERIFICATION_TOKEN]: token
        };
        let loginPost = httpClient.post(`api/Authentication/Login`, data, { headers })
            .then((res) => {
                console.log(res)
                return res.data;
            })
            .catch((error) => {
                if (error.code === 'ECONNABORTED') {
                    //console.log('Connection timed out... ', error)
                    dispatch({ type: 'SET_API_CALL_ERROR', payload: {error: 'Connection timed out... ' + error }});
                }
                else
                    dispatch({ type: 'SET_API_CALL_ERROR', payload: { error: 'Something went wrong with the external API call... ' + error }});
            });

        addTask(loginPost);
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', payload: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    },

};