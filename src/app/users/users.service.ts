import { computed, Injectable, signal } from '@angular/core';
import { UsersFilter, UsersState } from './user.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, tap } from 'rxjs';
import { DATA } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  state = signal<UsersState>({
    users: [],
    filter: {
      searchTerm: '',
      pageSize: 10,
      pageIndex: 1,
      sortBy: null
    },
    loading: false
  });

  users = computed(() => this.state().users);
  total = computed(() => this.users().length);
  loading = computed(() => this.state().loading);
  filter = computed(() => this.state().filter);


  usersSub = new BehaviorSubject<Partial<UsersFilter>>(this.filter());

  constructor() {
    this.usersSub
      .pipe(
        distinctUntilChanged(),
        tap((filter) => this.state.update(state => ({
          ...state,
          filter: { ...state.filter,...filter },
          loading: true
        }))),
        debounceTime(3000),
        map(filter => {
          return DATA;
        }),

      )
      .subscribe(value => {
        this.state.update(state => ({...state, users: value, loading: false }));
      })
  }
}
