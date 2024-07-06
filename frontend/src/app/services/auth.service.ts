import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AdminService } from './admin.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admins';

  constructor(private http: HttpClient, private router: Router, private adminService: AdminService) {}

  register(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData).pipe(
      map((response: any) => {
        console.log('Registration successful. Response:', response);
       
        return response;
      }),
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(error); 
      })
    );
  }

  async login(loginData: any): Promise<any> {
    try {
      const response = await this.http.post(`${this.apiUrl}/login`, loginData).pipe(
        tap((response: any) => {
          console.log('Login Response:', response.accessToken); 
        }),
        catchError((error) => {
          console.error('Login Error:', error);
          return throwError(error); 
        })
      ).toPromise();

      localStorage.setItem('accessToken', response.accessToken);
      this.adminService.setAdminDetails(response.username, response.id);
      return response;
    } catch (error) {
      console.error('Login Promise Error:', error); 
      throw error; 
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('AdminID');
    localStorage.removeItem('AdminName');
    this.adminService.setAdminDetails('', '');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
