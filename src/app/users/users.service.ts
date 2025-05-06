import { computed, Injectable, signal } from '@angular/core';
import { PaginatedResponse, User, UsersFilter, UsersState } from './user.model';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';
import { DATA } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly users$: Observable<User[]> = of(DATA);

  private state = signal<UsersState>({
    users: [],
    filter: {
      searchTerm: '',
      pageSize: 10,
      pageIndex: 1,
      sort: {
        column: null,
        direction: null
      }
    },
    total: 0,
    loading: false,
    tableColumns: [
      '_id', 'email',
      'age', 'balance',
      'company', 'favoriteFruit',
      'address', 'isActive'
    ]
  });

  users = computed(() => this.state().users);
  total = computed(() => this.state().total);
  loading = computed(() => this.state().loading);
  filter = computed(() => this.state().filter);
  tableColumns = computed(() => this.state().tableColumns);
  pagination = computed(() => {
    return {
      pageIndex: this.filter().pageIndex,
      pageSize: this.filter().pageSize,
      total: this.total(),
    }
  });

  sorting = computed(() => this.filter().sort);


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
        debounceTime(1000),
        switchMap(() => this.getUsers(this.filter())),
      )
      .subscribe(({ value: users, total }) => {
        this.state.update(state => ({ ...state, users, total, loading: false }));
      })
  }

  getUsers({ searchTerm, pageIndex, pageSize, sort }: UsersFilter): Observable<PaginatedResponse<User>> {
    return this.users$.pipe(
      map(users => {
        const filtered = users.filter(user =>
          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.age.toString().includes(searchTerm) ||
          user.balance?.toString().includes(searchTerm) ||
          user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.favoriteFruit.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.address.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sort.column && sort.direction) {

          filtered.sort((a, b) => {
            const valueA =
              a[sort.column!]?.toString().toLowerCase() || '';

            const valueB =
              b[sort.column!]?.toString().toLowerCase() || '';

            return sort.direction === 'asc'
             ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          });

        }


        const total = filtered.length;

        const paginated = filtered.slice(
          (pageIndex - 1) * pageSize,
          pageIndex * pageSize
        );

        return { value: paginated, total };
      }),
      tap(users => {
        console.log(users)
      })
    );
  }
}
