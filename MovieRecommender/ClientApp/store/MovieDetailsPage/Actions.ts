import { AppThunkAction } from '../';
import { fetch, addTask } from 'domain-task';
import * as imdb from 'imdb-api';
import axios from 'axios';
import { ApiConstants } from '../../constants/constants';

interface GetMovieDetailsAction {
    type: 'GET_MOVIE_DETAILS';
}

interface ReceiveMovieDetailsAction {
    type: 'RECEIVE_MOVIE_DETAILS';
    selectedMovie: any;
}

interface GetMovieTrailersAction {
    type: 'GET_MOVIE_TRAILERS';
}

interface ReceiveMovieTrailersAction {
    type: 'RECEIVE_MOVIE_TRAILERS';
    payload: any;
}

interface SetErrorAction {
    type: 'SET_ERROR';
    error: any;
}

interface ClearErrorAction {
    type: 'CLEAR_ERROR';
}

export type KnownAction = GetMovieDetailsAction | ReceiveMovieDetailsAction
    | GetMovieTrailersAction | ReceiveMovieTrailersAction
    | SetErrorAction | ClearErrorAction;

// ACTION CREATORS
export const actionCreators = {
    getMovieDetails: (tconst: string, imdbData: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        //console.log(imdbData)
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

        let tasks = [ fetchTask ];

        let imdbApiCall = null;
        if (!imdbData) {
            const apiKey = ApiConstants.API_KEY;
            const baseUrl = ApiConstants.API_BASE_URL;
            const timeout = ApiConstants.API_CALL_TIMEOUT;
            const httpClient = axios.create();
            httpClient.defaults.timeout = timeout;
            let imdbApiCall = httpClient.get(`${baseUrl}${apiKey}&i=${tconst}`)
                .then((res) => {
                    return res.data;
                })
                .catch((error) => {
                    if (error.code === 'ECONNABORTED') {
                        //console.log('Connection timed out... ', error)
                        dispatch({ type: 'SET_ERROR', error: 'Connection timed out... ' + error });
                    }
                    else
                        dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call... ' + error });
                });

            //const cli = new imdb.Client({ apiKey: '5330a888', timeout: 3000 });
            //let imdbApiCall = cli.get({
            //    'id': tconst
            //}).then((imdbData: any) => {
            //    return imdbData;
            //    }).catch(() => dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the external API call...' }));
            tasks.push(imdbApiCall);
        }
        //console.log(tasks)
        var promise = Promise.all(tasks).then(function (values) {
            let movie = values && values[0];
            if (!movie) {
                dispatch({ type: 'SET_ERROR', error: 'Movie not found.' });
            }
            if (values.length > 1) {
                imdbData = values[1];
            }
            movie = {
                ...movie,
                originalTitle: imdbData && imdbData.title,
                imdbData: imdbData
            }
            if (!imdbData) {
                dispatch({ type: 'SET_ERROR', error: getState().movieDetails.error + ' Please refresh page.' });
            } else {
                dispatch({ type: 'CLEAR_ERROR' });
            }
            dispatch({ type: 'RECEIVE_MOVIE_DETAILS', selectedMovie: movie });
            
        }).catch(function (error) {
            dispatch({ type: 'SET_ERROR', error: 'Something went wrong with the API calls... ' + error });
        });

        addTask(promise);
    },
    getMovieTrailers: (movie: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'GET_MOVIE_TRAILERS' });
        console.log(movie);
        if (!movie) return;
        const apiTmdbUrl = ApiConstants.API_BASE_URL_TMDB;
        const find = ApiConstants.API_ACTION_TMDB_FIND;
        const apiKey = ApiConstants.API_KEY_TMDB;
        const tconst = movie.tconst;
        const params = encodeURI(`api_key=${apiKey}&external_source=imdb_id`);
        const httpClient = axios.create();

        httpClient.defaults.timeout = ApiConstants.API_CALL_TIMEOUT;
        let imdbApiCall = httpClient.get(`${apiTmdbUrl}/${find}/${tconst}?${params}`)
            .then((res) => {
                //console.log(res)
                if (res.status !== 200) {
                    // handle error
                    throw Error(res.statusText);
                } 
                let movieArray = res.data.movie_results;
                if (movieArray && movieArray.length > 0) {
                    const movieId = movieArray[0].id;

                    //https://api.themoviedb.org' + encodeURI('/3/movie/' + movieId + '/videos?api_key=' + apiKey)
                    const videoQueryParams = encodeURI(`api_key=${apiKey}`);
                    httpClient.get(`${apiTmdbUrl}/movie/${movieId}/videos?${videoQueryParams}`)
                        .then(res => {
                            if (res.status !== 200) {
                                // handle error
                                throw Error(res.statusText);
                            }
                            //console.log(res);
                            let videoIds = res.data.results;
                            const videoIdsArray = Array.from(new Set(videoIds.map((e: any) => e.key)));
                            dispatch({ type: 'RECEIVE_MOVIE_TRAILERS', payload: videoIdsArray });
                        })
                        .catch((error) => {
                            if (error.code === 'ECONNABORTED') {
                                dispatch({ type: 'SET_ERROR', error: 'Connection timed out... ' + error });
                            }
                            else
                                dispatch({ type: 'SET_ERROR', error: 'Request failed... ' + error });
                        });
                } else {
                    throw Error(`No movie found for imdb_id: ${tconst}.`);
                }
            })
            .catch((error) => {
                if (error.code === 'ECONNABORTED') {
                    dispatch({ type: 'SET_ERROR', error: 'Connection timed out... ' + error });
                }
                else
                    dispatch({ type: 'SET_ERROR', error: 'Request failed... ' + error });
            });
    },
    setError: (error: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SET_ERROR', error: error });
    },
    clearError: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'CLEAR_ERROR' });
    },
    
};