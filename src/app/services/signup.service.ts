import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private APIPath = 'https://localhost:44315/api/Account/signup'
  constructor(private http: HttpClient) { }

  public addUsers(user: any): Observable<any> {
    return this.http.post(this.APIPath, user);
  }
}
