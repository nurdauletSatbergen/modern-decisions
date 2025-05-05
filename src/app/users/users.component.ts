import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CdkTableModule } from '@angular/cdk/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CdkTableModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private usersService = inject(UsersService);
  users = this.usersService.users;
  loading = this.usersService.loading;
  displayedColumns = this.usersService.tableColumns;
  totalUsers = this.usersService.total;

  searchTerm = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.usersService.usersSub.next({ searchTerm });
      });
  }
}
