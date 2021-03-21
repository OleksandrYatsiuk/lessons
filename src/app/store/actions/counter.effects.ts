import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { countActionsType, CountUpdatedAtAction } from './reducers/count/count.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions) { }

    @Effect()
    updatedAt$(): any {
        return this.actions$.pipe(
            ofType(countActionsType.decrease, countActionsType.increase, countActionsType.clear),
            map(() => {
                return new CountUpdatedAtAction({ updatedAt: Date.now() });
            })
        );
    }
}
