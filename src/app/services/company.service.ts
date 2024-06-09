import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = 'https://localhost:44315/api/Company'
  private APIPath = 'https://localhost:44315/api/Company';
  constructor(private http: HttpClient) {

  }

  public getCompanies(): Observable<any> {
    return this.http.get(this.APIPath);
  }

  public addCompany(company: any): Observable<any> {
    return this.http.post(this.APIPath, company);
  }


  public deleteItem(id: number): Observable<any> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }

}
