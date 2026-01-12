import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Environment } from '../Environment/environment.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  apiUrl: string = '';

  // 🔹 Login state observables
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  private usernameSubject = new BehaviorSubject<string>(
    localStorage.getItem('username') || ''
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = new Environment().apiUrl;
  }

  // ------------------ API METHODS ------------------
  GetData(url: string) {
    return this.http.get(this.apiUrl + url);
  }

  postData(url: string, data: any) {
    return this.http.post(this.apiUrl + url, data);
  }

  // ------------------ AUTH METHODS ------------------
  login(username: string) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);

    this.isLoggedInSubject.next(true);
    this.usernameSubject.next(username);
  }

  logout() {
   localStorage.clear();

    this.isLoggedInSubject.next(false);
    this.usernameSubject.next('');
  }

  // Optional getters (if needed)
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  getUsername(): string {
    return this.usernameSubject.value;
  }
}
