import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import { MovieListState } from './';
import { KnownAction } from './Actions';

const unloadedState: MovieListState = {
    movies: [],
    movieSearchCriteria: { genre: '', year: 2000, rating: 6.0 },
    isLoading: false,
    error: null
};

export const reducer: Reducer<MovieListState> = (state: MovieListState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MOVIE_LIST':
            return {
                ...state,
                movieSearchCriteria: action.movieSearchCriteria,
                movies: state.movies,
                isLoading: true
            };
        case 'RECEIVE_MOVIE_LIST':
            return {
                ...state,
                movieSearchCriteria: state.movieSearchCriteria,
                movies: action.movies,
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