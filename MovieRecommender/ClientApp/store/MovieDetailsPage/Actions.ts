import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';

interface GetMovieDetailsAction {
    type: 'GET_MOVIE_DETAILS';
}

interface ReceiveMovieDetailsAction {
    type: 'RECEIVE_MOVIE_DETAILS';
    selectedMovie: any;
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = GetMovieDetailsAction | ReceiveMovieDetailsAction | SetErrorAction | ClearErrorAction;

// ACTION CREATORS
export const actionCreators = {
    getMovieDetails: (tconst: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        console.log(tconst)
        dispatch({ type: 'GET_MOVIE_DETAILS' });
        let fetchTask = fetch(`api/ImdbData/Movie?tconst=${tconst}`)
            .then(response => {
                if (response.status == 204) {
                    return null;
                }
                return response.json() as any;
            }).then(data => {
                return data;
            }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the local API call...' }));

        const cli = new imdb.Client({ apiKey: '5330a888', timeout: 3000 });
        let imdbApiCall = cli.get({
            'id': tconst
        }).then((imdbData: any) => {
            return imdbData;
        }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call...' }));

        var promise = Promise.all(
            [fetchTask, imdbApiCall]
        ).then(function (values) {
            console.log(values);
            let movie = values[0];
            if (!movie) {
                dispatch({ type: 'SET_ERROR', error: 'Movie not found.' });
            }
            movie = {
                ...movie,
                originalTitle: values[1].title,
                imdbData: values[1]
            }
            dispatch({ type: 'RECEIVE_MOVIE_DETAILS', selectedMovie: movie });
            dispatch({ type: 'CLEAR_ERROR' });
        }).catch(function () {
            dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the API calls...' });
        });

        addTask(promise);
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    }
    
};