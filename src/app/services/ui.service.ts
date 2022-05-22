import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '../core/state/actions/UI.action';
import { AppState } from '../core/state/reducers/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private _s: Store<AppState>
    ) {}

  isLoadingSuscription$(){
   return  this._s.select('ui')
  }

startLoading(): void{
  return this._s.dispatch(isLoading())
}
stopLoading(): void{
  return this._s.dispatch(stopLoading())
}
}
