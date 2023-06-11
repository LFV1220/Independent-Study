import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  name: string = '';
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['']);
        this.isLoggedInSubject.next(true);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string, name: string, username: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration successful!');
        this.name = name;
        this.username = username;
        this.login(email, password);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['']);
        this.isLoggedInSubject.next(false);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
