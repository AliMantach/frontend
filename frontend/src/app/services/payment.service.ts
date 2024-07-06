

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Payment } from '../modules/interface_payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/payments'; // Adjust the base URL as per your setup

  constructor(private http: HttpClient) {}

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.apiUrl}`, payment, this.getAuthHeaders())
  }

  updatePayment(payment: Payment): Observable<Payment> {
    const url = `${this.apiUrl}/update/${payment._id}`; 
    return this.http.post<Payment>(url, payment, this.getAuthHeaders());
  }


  deletePayment(paymentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete`, { id: paymentId } , this.getAuthHeaders());
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}`, this.getAuthHeaders())
  }

  getPaymentsByPayerId(payerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${payerId}`);
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }
}
