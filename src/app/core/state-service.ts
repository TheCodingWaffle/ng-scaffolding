import { BehaviorSubject, Observable } from 'rxjs';

export class StateService<T> {
  public vm$: Observable<T>;
  protected serviceState = {} as T;
  protected store = new BehaviorSubject<T>(this.serviceState);
  protected state$ = this.store.asObservable();

  protected updateState(state: T) {
    this.store.next((this.serviceState = state));
  }
}
