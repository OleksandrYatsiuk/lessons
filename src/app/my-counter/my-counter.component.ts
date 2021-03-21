import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CountClearAction, CountDecreaseAction, CountIncreaseAction } from '../store/actions/reducers/count/count.actions';
import { CountState } from '../store/actions/reducers/count/count.reducer';
import { selectCount, selectUpdatedAt } from '../store/actions/reducers/count/count.selectors';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent implements OnInit {

  count$: Observable<number> = this.store$.pipe(select(selectCount));
  updatedAt$: Observable<number> = this.store$.pipe(select(selectUpdatedAt));

  constructor(private store$: Store<CountState>) {
  }
  ngOnInit(): void {
  }

  increment(): void {
    this.store$.dispatch(new CountIncreaseAction());
  }

  decrement(): void {
    this.store$.dispatch(new CountDecreaseAction());
  }

  reset(): void {
    this.store$.dispatch(new CountClearAction());
  }

}
