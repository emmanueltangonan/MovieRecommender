import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../';
import { MovieListState } from './';
import { KnownAction } from './Actions';

const unloadedState: MovieListState = {
    movies: [],
    totalMoviesSearched: null,
    movieSearchCriteria: {
        genre: '',
        year: 2000,
        rating: 6.0,
        searchKeyword: '',
        orderBy: '',
        page: 1,
        status: 'All',
        sortBy: 'Title',
        order: 'Ascending',
    },
    isLoading: false,
    error: null,
    movieSearchCache: {}, 
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
            var newResults = {
                movies: action.movies,
                totalMoviesSearched: action.totalMoviesSearched,
            };
            //dont add to cache if returned 0 results or in error
            var newMovieSearchCache = state.error
                ? { ...state.movieSearchCache }
                : { ...state.movieSearchCache, [JSON.stringify(state.movieSearchCriteria)]: newResults };
            return {
                ...state,
                movieSearchCriteria: state.movieSearchCriteria,
                movies: action.movies,
                isLoading: false,
                totalMoviesSearched: action.totalMoviesSearched,
                movieSearchCache: newMovieSearchCache,
            };
        case 'SET_BROWSE_SEARCH_CRITERIA':
            return {
                ...state,
                movieSearchCriteria: action.movieSearchCriteria,
            };
        case 'CLEAR_PREVIOUS_DATA':
            return {
                ...state,
                totalMoviesSearched: null,
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