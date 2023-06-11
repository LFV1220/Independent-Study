import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSignedIn: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isSignedIn = isLoggedIn;
    });
  }
}
