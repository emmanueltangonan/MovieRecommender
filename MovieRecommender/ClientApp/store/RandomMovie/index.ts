﻿import { fetch, addTask } from 'domain-task';
import { actionCreators as ac } from './Actions';
import { reducer as r } from './Reducers';

export interface RandomMovieState {
    isLoading: boolean;
    randomMovie: any;
    movieSearchCriteria: RandomMovieSearchCriteria;
    error: any;
}

export interface RandomMovieSearchCriteria {
    genre: string;
    year: number | null;
    rating: number | null;
}

export const actionCreators: any = ac;
export const reducer: any = r;