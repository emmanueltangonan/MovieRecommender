import { RandomMovieSearchCriteria } from './';
import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';
import { ApiConstants } from '../../constants/constants';
import axios from 'axios';

interface RequestRandomMovieAction {
    type: 'REQUEST_RANDOM_MOVIE';
    movieSearchCriteria: RandomMovieSearchCriteria;
}

interface ReceiveRandomMovieAction {
    type: 'RECEIVE_RANDOM_MOVIE';
    randomMovie: any;
}

interface SetSpinnerCriteriaAction {
    type: 'SET_SPINNER_CRITERIA';
    movieSearchCriteria: RandomMovieSearchCriteria;
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = RequestRandomMovieAction | ReceiveRandomMovieAction
    | SetSpinnerCriteriaAction
    | SetErrorAction | ClearErrorAction;

// ACTION CREATORS
export const actionCreators = {
    requestRandomMovie: (movieSearchCriteria: RandomMovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        //console.log(movieSearchCriteria)
        let fetchTask = fetch(`api/ImdbData/RandomMovie`,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieSearchCriteria)
            })
            .then(res => {
                //console.log(res)
                if (!res) {
                    return 500;
                }else if (res.status === 200) {
                    return res.json() as any;
                }
                return res.status;
            })
            .then(data => {
                //console.log(data);
                if (data == 204) {
                    dispatch({ type: 'SET_ERROR', error: 'Whoops! No movies matched those criteria...' });
                } else if (data == 500) {
                    dispatch({ type: 'SET_ERROR', error: 'Whoops! Server is down at the moment...' });
                } else {
                    const tconst = data.tconst;
                    const apiKey = ApiConstants.API_KEY;
                    const baseUrl = ApiConstants.API_BASE_URL;
                    const timeout = ApiConstants.API_CALL_TIMEOUT;
                    const httpClient = axios.create();
                    httpClient.defaults.timeout = timeout;
                    let imdbApiCall = httpClient.get(`${baseUrl}${apiKey}&i=${tconst}`)
                        .then((res) => {
                            data = { ...data, imdbData: res.data };
                            dispatch({ type: 'RECEIVE_RANDOM_MOVIE', randomMovie: data });
                            dispatch({ type: 'CLEAR_ERROR' });
                        })
                        .catch((error) => {
                            if (error.code === 'ECONNABORTED')
                                dispatch({ type: 'SET_ERROR', error: 'Connection timed out... ' + error });
                            else
                                dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call... ' + error });
                        });
                    //const cli = new imdb.Client({ apiKey: '5330a888', timeout: 3000 });
                    //cli.get({ 'id': movieImdbId })
                    //    .then((imdbData: any) => {
                    //        data = { ...data, imdbData }
                    //        console.log(data)

                    //        dispatch({ type: 'RECEIVE_RANDOM_MOVIE', randomMovie: data });
                    //        dispatch({ type: 'CLEAR_ERROR' });
                    //    }).catch((error) => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call... ' + error }));
                }
            }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the local API call...' }));

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_RANDOM_MOVIE', movieSearchCriteria: movieSearchCriteria });
    },
    setSpinnerCriteria: (movieSearchCriteria: RandomMovieSearchCriteria): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_SPINNER_CRITERIA', movieSearchCriteria: movieSearchCriteria });
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    },
};