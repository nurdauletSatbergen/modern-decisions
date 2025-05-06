import { Component, inject} from '@angular/core';
import { UsersService } from '../../users/users.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-table-config',
  imports: [],
  templateUrl: './table-config.component.html',
  styleUrl: './table-config.component.scss'
})
export class TableConfigComponent {
  private dialogRef = inject(DialogRef);
  private usersService = inject(UsersService);
  columns = this.usersService.tableColumns;
}
