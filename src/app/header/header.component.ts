import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSignedIn: boolean = false;
  userEmail: string = '';

  constructor(private auth: AuthService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isSignedIn = isLoggedIn;
    });
    this.auth.email$.subscribe((email) => {
      this.userEmail = email;
    });
  }

  onLogout() {
    this.auth.logout();
  }

  openNewTab(type: number) {
    let URL;
    switch (type) {
      case 1:
        URL = 'https://usflearn.instructure.com/';
        break;
      case 2:
        URL = 'https://usflearn.instructure.com/courses';
        break;
      case 3:
        URL = 'https://usflearn.instructure.com/calendar';
        break;
      case 4:
        URL = 'https://usflearn.instructure.com/conversations';
        break;
      default:
        URL = 'https://usflearn.instructure.com/';
        break;
    }
    const newTab = this.renderer.createElement('a');
    this.renderer.setAttribute(newTab, 'href', URL);
    this.renderer.setAttribute(newTab, 'target', '_blank');
    newTab.click();
  }
}
