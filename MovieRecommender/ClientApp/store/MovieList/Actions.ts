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
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = RequestMovieListAction | SetErrorAction | ClearErrorAction | ReceiveMovieListAction;

// ACTION CREATORS
export const actionCreators = {
    requestMovieList: (movieSearchCriteria: BrowseMovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/ImdbData/Movies`)
            .then(response => {
                if (response.status == 204) {
                    return null;
                }
                return response.json() as any;
            })
            .then(data => {
                console.log(data);
                if (!data) {
                    dispatch({ type: 'SET_ERROR', error: 'Whoops! No movies matched those criteria...' });
                } else {
                    dispatch({ type: 'RECEIVE_MOVIE_LIST', movies: data });
                    dispatch({ type: 'CLEAR_ERROR' });
                }
            }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the local API call...' }));

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_MOVIE_LIST', movieSearchCriteria: movieSearchCriteria });
    },
  
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    }
};