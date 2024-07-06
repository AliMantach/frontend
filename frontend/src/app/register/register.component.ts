import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  isAdmin: boolean = true; 
  errorMessage: string = '';

  constructor(private authService:AuthService, private router: Router) {}

  register(): void {
    const adminData = { username: this.username, email: this.email, password: this.password, isAdmin: this.isAdmin };
    this.authService.register(adminData).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error :any) => {
        this.errorMessage = 'Registration Failed';
        console.error('Registration failed', error);
      }
    );
  }
  gotologin(){
    this.router.navigate(['/login']);
  }
}
