import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import { countNode, countReducer, CountState } from './count/count.reducer';


export const counterFeatureKey = 'counter';

export interface State {
  [countNode]: CountState;
}

export const reducers: ActionReducerMap<State> = {
  [countNode]: countReducer
};


