import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';
import { CdkTableModule } from '@angular/cdk/table';

@Component({
  selector: 'app-users',
  imports: [CdkTableModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private usersService = inject(UsersService);
  users = this.usersService.users;
  loading = this.usersService.loading;
  displayedColumns = ['position', 'email'];
}
