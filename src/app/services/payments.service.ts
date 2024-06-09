import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private PostAPI = 'https://localhost:44315/api/Payments/Add-Payments'
  private APIPath = 'https://localhost:44315/api/Payments'
  constructor(private http: HttpClient) { }

  getPaymentsAsync(): Observable<any>{
    return this.http.get(this.APIPath);
  }


  addPaymentAsync(Payment: any):Observable<any>{
    return this.http.post<any>(this.PostAPI, Payment);
  }


}
