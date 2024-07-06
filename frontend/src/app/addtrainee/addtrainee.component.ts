import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormsModule } from '@angular/forms';
import { Trainee } from '../modules/interface_trainee';
import { TraineeService } from '../services/trainee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtrainee',
  standalone: true,
  imports: [HeaderComponent,SideNavComponent,FormsModule],
  templateUrl: './addtrainee.component.html',
  styleUrl: './addtrainee.component.css'
})
export class AddtraineeComponent {
  trainee = {
    name: '',
    email: '',
    phone: '',
    subscriptionType:'',
  };
  constructor(private TraineeService:TraineeService,private router: Router){}
  
  addTrainee(trainee:Trainee): void {
   this.TraineeService.addTrainee(trainee).subscribe(() => {
   });
   this.router.navigate(['/trainee'] );
 }

}
