import { Component, inject, input } from '@angular/core';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.model';

@Component({
  selector: '[app-sort-header]',
  templateUrl: './sort-header.component.html',
  styleUrl: './sort-header.component.scss',
  host: {
    '(click)': 'sort()',
  }
})
export class SortHeaderComponent {
  ref = input.required<string>();
  private usersService = inject(UsersService);
  sorting = this.usersService.sorting;

  sort(): void {
    this.usersService.usersSub.next({
      sort: {
        column: this.ref() as keyof User,
        direction:
          this.usersService.filter().sort.column !== this.ref()
            ? 'asc'
            : this.usersService.filter().sort.direction === 'asc'
              ? 'desc'
              : this.usersService.filter().sort.direction === 'desc'
                ? null
                : 'asc'
      },
      pageIndex: 1
    })
  }
}
