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
  private nameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private emailSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  name$: Observable<string> = this.nameSubject.asObservable();
  email$: Observable<string> = this.emailSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  name: string = '';
  email: string = '';
  isLoggedIn: boolean = false;

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  getIsAuth() {
    return this.isLoggedIn;
  }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['']);
        this.emailSubject.next(email);
        this.isLoggedInSubject.next(true);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string, name: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration successful!');
        this.name = name;
        this.email = email;
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
        this.emailSubject.next('');
        this.isLoggedInSubject.next(false);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
