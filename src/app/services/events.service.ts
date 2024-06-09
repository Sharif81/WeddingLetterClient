import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = 'https://localhost:44315/api/Events/GetAllEventsWithPrograms'
  private baseUrl = 'https://localhost:44315/api/Events';

  constructor(private http: HttpClient) {

  }

  public getAllEventsWithProgramsAsync(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  addEventAsync(event: any): Observable<any> {
    return this.http.post(this.baseUrl, event);
  }

  

}
