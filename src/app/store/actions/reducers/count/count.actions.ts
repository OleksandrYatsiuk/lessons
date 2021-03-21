import { Action } from '@ngrx/store';
import { CountState } from './count.reducer';

export enum countActionsType {
    increase = '[Count] increase',
    decrease = '[Count] decrease',
    clear = '[Count] clear',
    updatedAt = '[Count] updated date'
}

export class CountIncreaseAction implements Action {
    readonly type = countActionsType.increase;
}
export class CountDecreaseAction implements Action {
    readonly type = countActionsType.decrease;
}
export class CountClearAction implements Action {
    readonly type = countActionsType.clear;
}

export class CountUpdatedAtAction implements Action {
    readonly type = countActionsType.updatedAt;
    constructor(public payload: { updatedAt: number }) {

    }
}

export type CountActions = CountIncreaseAction | CountDecreaseAction | CountClearAction | CountUpdatedAtAction;
