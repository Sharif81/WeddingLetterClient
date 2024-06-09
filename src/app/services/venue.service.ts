import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {

  private APIPath = 'https://localhost:44315/api/Venue';
  constructor(private http: HttpClient) { }

  getVeuesAsync(): Observable<any> {
    return this.http.get(this.APIPath);
  }

  addVenueAsync(Venue: any): Observable<any> {
    return this.http.post(this.APIPath, Venue);
  }

  updateVenueAsync(id: number, venue: any): Observable<any>{
    return this.http.put<any>(`${this.APIPath}/${id}`, venue);
  }

  deleteVenueAsync(id: number): Observable<any> {
      return this.http.delete<number>(`${this.APIPath}/${id}`);
    }


}
