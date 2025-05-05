import { Component } from '@angular/core';
import {UsersComponent} from './users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    UsersComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app';
}
