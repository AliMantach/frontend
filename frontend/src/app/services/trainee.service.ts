import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainee } from '../modules/interface_trainee';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  private apiUrl = 'http://localhost:3000/api/trainee';
 
  constructor(private http: HttpClient) { }

  getTrainees(adminId: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(`${this.apiUrl}?admin=${adminId}`, this.getAuthHeaders());
  }

  getTrainee(id: string): Observable<Trainee> {
    return this.http.get<Trainee>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  addTrainee(trainee: any): Observable<Trainee> {
    return this.http.post<Trainee>(this.apiUrl, trainee, this.getAuthHeaders());
  }

  updateTrainee(id: string, trainee: any): Observable<Trainee> {
    return this.http.post<Trainee>(`${this.apiUrl}/${id}`, trainee, this.getAuthHeaders());
  }

  deleteTrainee(id: string): Observable<{ message: string; traineeInd: Trainee }> {
    return this.http.post<{ message: string; traineeInd: Trainee }>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  getTraineesBySubscription(adminId: string, subscriptionType: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(
      `${this.apiUrl}/subscription/${subscriptionType}?admin=${adminId}`,
      this.getAuthHeaders()
    );
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

