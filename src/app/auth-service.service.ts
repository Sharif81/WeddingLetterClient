import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:44315/api/Account/login';
  public isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    // Make an HTTP request to your backend server to verify credentials
    return this.http.post(this.loginUrl, { email, password });
  }

  setIsLoggedIn(loggedIn: boolean): void {
    this.isLoggedIn = loggedIn;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
