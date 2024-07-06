import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLogged :boolean = false;
  adminId: string ="";
  constructor(private authService: AuthService, private router: Router) {}

  async login(): Promise<void> {
    try {
      const loginData = { email: this.email, password: this.password };
      const response = await this.authService.login(loginData);

      this.isLogged = true;
      localStorage.setItem('AdminID', response.id);
      localStorage.setItem('AdminName', response.username);
      this.adminId=response.id;
      this.router.navigate(['/trainee'] );
    } catch (error) {
      this.errorMessage = 'Invalid login credentials';
      console.error('Login failed:', error);
    }
  }
  gotoregister(){
    this.router.navigate(['/register'] );
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/trainee'] );
    }
  }
}
