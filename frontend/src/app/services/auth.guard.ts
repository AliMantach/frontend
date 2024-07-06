import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
 
    const adminService = inject(AuthService);
    const router = inject(Router);
    if(adminService.isAuthenticated()){
      return true;
    }else {
      router.navigateByUrl('/login');
      return false;
    }

};
