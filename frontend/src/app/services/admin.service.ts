import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }
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
}
