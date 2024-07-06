import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  constructor(private router : Router,private adminService:AuthService,private location :Location) {}

  goBack(): void {
    this.location.back();
  }

  toSubscription(){
    this.router.navigate(['/subscription'])
   }
   toPayment(){
    this.router.navigate(['/payment'])
   }
   toAdmin(){
    this.router.navigate(['/admin'])
   }
   toAddtrainee(){
    this.router.navigate(['/addtrainee'])
   }
   loadTrainees(): void {
    this.router.navigate(['/trainee'])
  }
  toLogin(){
    this.router.navigate(['/login'])
   }
   toRegister(){
    this.router.navigate(['/register'])
   }
   logout(): void{
    this.adminService.logout();
   }
}
