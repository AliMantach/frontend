import { Routes } from '@angular/router';
import { TraineeComponent } from './trainee/trainee.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { AddtraineeComponent } from './addtrainee/addtrainee.component';
import { RegisterComponent } from './register/register.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'trainee', component: TraineeComponent,canActivate:[authGuard]},
  { path: 'addtrainee', component: AddtraineeComponent,canActivate:[authGuard]},
  { path: 'subscription', component: SubscriptionComponent,canActivate:[authGuard]},
  { path: 'payments', component: PaymentComponent,canActivate:[authGuard]},
  {path : 'admin' , component: AdminComponent,canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: '/login' }
];
