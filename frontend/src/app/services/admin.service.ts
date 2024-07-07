import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../modules/interface_admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  private adminUsername: string | null = null;
  private adminId: string | null = null;

  setAdminDetails(username: string, id: string): void {
    this.adminUsername = username;
    this.adminId = id;
  }

  getAdminUsername(): string | null {
    return this.adminUsername;
  }

  getAdminId(): string | null {
    return this.adminId;
  }
  private apiUrl = 'http://localhost:3000/api/admins';  // Update the URL as needed

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('accessToken');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}/all`, this.getAuthHeaders());
  }

  updateAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, admin, this.getAuthHeaders());
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, { id }, this.getAuthHeaders());
  }
}
