import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import { MovieDetailsPageState } from './';
import { KnownAction } from './Actions';

const unloadedState: MovieDetailsPageState = {
    selectedMovie: null,
    isLoading: false,
    error: null
};

export const reducer: Reducer<MovieDetailsPageState> = (state: MovieDetailsPageState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'GET_MOVIE_DETAILS':
            console.log('GET_MOVIE_DETAILS')
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_MOVIE_DETAILS':
            console.log('RECEIVE_MOVIE_DETAILS')
            return {
                ...state,
                selectedMovie: action.selectedMovie,
                isLoading: false
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.error
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