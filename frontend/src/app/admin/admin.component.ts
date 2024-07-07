import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Admin } from '../modules/interface_admin';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone : true,
  imports: [CommonModule , FormsModule , SideNavComponent , HeaderComponent]
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  selectedAdmin: Admin | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAllAdmins().subscribe(data => {
      this.admins = data;
    });
  }

  selectAdmin(admin: Admin): void {
    this.selectedAdmin = admin;
  }

  updateAdmin(): void {
    if (this.selectedAdmin) {
      this.adminService.updateAdmin(this.selectedAdmin).subscribe(() => {
        this.loadAdmins();
        this.selectedAdmin = null;  // Deselect after update
      });
    }
  }

  deleteAdmin(id: string): void {
    this.adminService.deleteAdmin(id).subscribe(() => {
      this.loadAdmins();
      this.selectedAdmin = null;  // Deselect after deletion
    });
  }

  cancelSelection(): void {
    this.selectedAdmin = null;
  }
}
