import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TraineeComponent } from './trainee/trainee.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { authGuard } from './services/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SideNavComponent,TraineeComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'frontend';
}
