import { fetch, addTask } from 'domain-task';
import { actionCreators as ac } from './Actions';
import { reducer as r } from './Reducers';

export interface MovieListState {
    isLoading: boolean;
    movies: Array<any>;
    totalMoviesSearched: number | null;
    movieSearchCriteria: BrowseMovieSearchCriteria | any;
    error: any;
    movieSearchCache: any; 
}

export interface BrowseMovieSearchCriteria {
    genre: string;
    year: number;
    rating: number;
    searchKeyword: string;
    orderBy: string;
    page: number;
    status: string;
    sortBy: string;
    order: string;
}

export const actionCreators: any = ac;
export const reducer: any = r;