import { fetch, addTask } from 'domain-task';
import { actionCreators as ac } from './Actions';
import { reducer as r } from './Reducers';

export interface MovieDetailsPageState {
    isLoading: boolean;
    selectedMovie: any;
    error: any;
}

export const actionCreators: any = ac;
export const reducer: any = r;