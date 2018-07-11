import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import { CredentialsState } from './';
import { KnownAction } from './Actions';

const unloadedState: CredentialsState = {
    isLoading: false,
    loginCredentials: null,
    apiCallError: null,
    error: null,
};

export const reducer: Reducer<CredentialsState> = (state: CredentialsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_LOGIN_RESULTS':
            return {
                ...state,
                isLoading: false
            };
        case 'LOGOUT':
            return {
                ...state,
            };
        case 'REGISTER':
            return {
                ...state,
                isTrailersLoading: true
            };
        case 'SET_API_CALL_ERROR':
            return {
                ...state,
                apiCallError: action.payload.error,
            };
        case 'CLEAR_API_CALL_ERROR':
            return {
                ...state,
                apiCallError: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload.error
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };

        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};