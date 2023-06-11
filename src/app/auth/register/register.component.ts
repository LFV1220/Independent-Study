import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  username: string = '';

  constructor(private auth: AuthService) {}

  register() {
    if (this.email === '') {
      alert('Please enter a valid email.');
      return;
    }
    if (this.password === '') {
      alert('Please enter a password.');
      return;
    }
    if (this.name === '') {
      alert('Please your name.');
      return;
    }
    if (this.username === '') {
      alert('Please a valid username (no spaces).');
      return;
    }

    this.auth.register(this.email, this.password, this.name, this.username);
    this.email = '';
    this.password = '';
  }
}
