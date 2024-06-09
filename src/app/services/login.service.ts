import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private APIPath = 'https://localhost:44315/api/Account/login'
  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post<any>(this.APIPath, user);
  }
}

