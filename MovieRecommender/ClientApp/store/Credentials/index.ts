import { fetch, addTask } from 'domain-task';
import { actionCreators as ac } from './Actions';
import { reducer as r } from './Reducers';

export interface CredentialsState {
    isLoading: boolean;
    loginCredentials: any;
    apiCallError: any;
    error: any;
}

export const actionCreators: any = ac;
export const reducer: any = r;