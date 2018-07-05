import { BrowseMovieSearchCriteria } from './';
import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';

interface RequestMovieListAction {
    type: 'REQUEST_MOVIE_LIST';
    movieSearchCriteria: BrowseMovieSearchCriteria;
}

interface ReceiveMovieListAction {
    type: 'RECEIVE_MOVIE_LIST';
    movies: any;
    totalMoviesSearched: number;
}

interface SetBrowseSearchCriteriaAction {
    type: 'SET_BROWSE_SEARCH_CRITERIA';
    movieSearchCriteria: BrowseMovieSearchCriteria;
}

interface ClearPreviousData {
    type: 'CLEAR_PREVIOUS_DATA';
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = RequestMovieListAction | ReceiveMovieListAction
    | SetBrowseSearchCriteriaAction | ClearPreviousData
    | SetErrorAction | ClearErrorAction ;

// ACTION CREATORS
export const actionCreators = {
    requestMovieList: (movieSearchCriteria: BrowseMovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_PREVIOUS_DATA' });
        const cache = getState().movieList.movieSearchCache;
        const cacheSearchResult = cache[JSON.stringify(movieSearchCriteria)];
        if (cacheSearchResult) {
            console.log(cacheSearchResult)
            dispatch({ type: 'RECEIVE_MOVIE_LIST', movies: cacheSearchResult.movies, totalMoviesSearched: cacheSearchResult.totalMoviesSearched });
            dispatch({ type: 'CLEAR_ERROR' });
            if (cacheSearchResult.error) {
                dispatch({ type: 'SET_ERROR', error: cacheSearchResult.error });
            }
            return;
        }
        let fetchTask = fetch(`api/ImdbData/Movies`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieSearchCriteria)
            })
            .then(response => {
                if (response.status == 204) {
                    return null;
                }
                return response.json() as any;
            })
            .then(data => {
                console.log(data);
                if (!data || !data.data || !data.data.length) {
                    dispatch({ type: 'RECEIVE_MOVIE_LIST', movies: [], totalMoviesSearched: 0 });
                } else {
                    dispatch({ type: 'RECEIVE_MOVIE_LIST', movies: data.data, totalMoviesSearched: data.totalItems});
                    dispatch({ type: 'CLEAR_ERROR' });
                }
            }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the local API call...' }));

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_MOVIE_LIST', movieSearchCriteria: movieSearchCriteria });
    },
    setBrowseSearchCriteria: (movieSearchCriteria: BrowseMovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_BROWSE_SEARCH_CRITERIA', movieSearchCriteria: movieSearchCriteria });
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    }
};