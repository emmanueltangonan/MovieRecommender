import { MovieSearchCriteria } from './';
import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';

interface RequestRandomMovieAction {
    type: 'REQUEST_RANDOM_MOVIE';
    movieSearchCriteria: MovieSearchCriteria;
}

interface ReceiveRandomMovieAction {
    type: 'RECEIVE_RANDOM_MOVIE';
    randomMovie: any;
}

interface SetSpinnerCriteria {
    type: 'SET_SPINNER_CRITERIA';
    movieSearchCriteria: MovieSearchCriteria;
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = RequestRandomMovieAction | ReceiveRandomMovieAction
    | SetSpinnerCriteria | SetErrorAction | ClearErrorAction;

// ACTION CREATORS
export const actionCreators = {
    requestRandomMovie: (movieSearchCriteria: MovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        console.log(movieSearchCriteria)
        let fetchTask = fetch(`api/ImdbData/RandomMovie`,
            {
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
                if (!data) {
                    dispatch({ type: 'SET_ERROR', error: 'Whoops! No movies matched those criteria...' });
                } else {
                    const movieImdbId = data.tconst;
                    //const imdbApiUrl = `https://www.omdbapi.com/?i=${movieImdbId}&apikey=5330a888`;
                    
                    //fetch(imdbApiUrl)
                    //    .then(response => response.json() as any)
                    console.log('Requesting from external API...');
                    const cli = new imdb.Client({ apiKey: '5330a888', timeout: 3000 });
                    cli.get({ 'id': movieImdbId })
                        .then((imdbData: any) => {
                            data = { ...data, imdbData }
                            console.log(data)

                            dispatch({ type: 'RECEIVE_RANDOM_MOVIE', randomMovie: data });
                            dispatch({ type: 'CLEAR_ERROR' });
                        }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call...' }));
                }
            }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the local API call...' }));

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_RANDOM_MOVIE', movieSearchCriteria: movieSearchCriteria });
    },
    setSpinnerCriteria: (movieSearchCriteria: MovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_SPINNER_CRITERIA', movieSearchCriteria: movieSearchCriteria });
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    }
};