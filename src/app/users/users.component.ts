import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CdkTableModule } from '@angular/cdk/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SortHeaderComponent } from '../shared/sort-header/sort-header.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { LoaderComponent } from '../shared/loader/loader.component';

@Component({
  selector: 'app-users',
  imports: [CdkTableModule, ReactiveFormsModule, SortHeaderComponent, PaginationComponent, LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  users = this.usersService.users;
  loading = this.usersService.loading;
  displayedColumns = this.usersService.tableColumns;
  pagination = this.usersService.pagination;

  searchTerm = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.usersService.usersSub.next({ searchTerm, sort: { column: null, direction: null }, pageIndex: 1 });
      });
  }

  pageChange(pageIndex: number): void {
    this.usersService.usersSub.next({ pageIndex })
  }

  sizeChange(pageSize: number): void {
    this.usersService.usersSub.next({
      pageSize,
      pageIndex: 1
    })
  }
}
