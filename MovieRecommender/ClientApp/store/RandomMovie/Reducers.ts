import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import { RandomMovieState } from './';
import { KnownAction } from './Actions';

const unloadedState: RandomMovieState = {
    randomMovie: {},
    movieSearchCriteria: { genre: '', year: null, rating: null },
    isLoading: false,
    error: null
};

export const reducer: Reducer<RandomMovieState> = (state: RandomMovieState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_RANDOM_MOVIE':
            return {
                ...state,
                movieSearchCriteria: action.movieSearchCriteria,
                randomMovie: state.randomMovie,
                isLoading: true
            };
        case 'RECEIVE_RANDOM_MOVIE':
            return {
                ...state,
                movieSearchCriteria: state.movieSearchCriteria,
                randomMovie: action.randomMovie,
                isLoading: false
            };
        case 'SET_SPINNER_CRITERIA':
            return {
                ...state,
                movieSearchCriteria: action.movieSearchCriteria
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