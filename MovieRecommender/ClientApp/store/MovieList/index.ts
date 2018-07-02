import { fetch, addTask } from 'domain-task';
import { actionCreators as ac } from './Actions';
import { reducer as r } from './Reducers';

export interface MovieListState {
    isLoading: boolean;
    movies: Array<any>;
    movieSearchCriteria: BrowseMovieSearchCriteria;
    error: any;
}

export interface BrowseMovieSearchCriteria {
    genre: string;
    year: number;
    rating: number;
}

export const actionCreators: any = ac;
export const reducer: any = r;