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

    this.auth.register(this.email, this.password, this.name);
    this.email = '';
    this.password = '';
  }
}
