import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {


  private apiUrl = 'https://localhost:44315/api/Packages'
  constructor(private http: HttpClient) { }


  public getPackages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public addPackages(Packages: any): Observable<any> {
    return this.http.post(this.apiUrl, Packages)
  }

  public deletePackage(id: number): Observable<any> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }

}
