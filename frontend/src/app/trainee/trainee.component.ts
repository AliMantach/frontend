import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Trainee } from '../modules/interface_trainee';
import { TraineeService } from '../services/trainee.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-trainee',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SideNavComponent],
  templateUrl: './trainee.component.html',
  styleUrl: './trainee.component.css',
})
export class TraineeComponent {
  status: string = 'inactive';
  trainees: Trainee[] = [];
  traineess: Trainee[] = [];
  selectedTrainee: Trainee | null = null;
  adminId: string = '';
  subscriptionType: string = '';
  @ViewChild('traineeForm') traineeForm!: NgForm;
  constructor(
    private traineeService: TraineeService,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  filteredTrainees = this.trainees;
  showAddForm: boolean = false;

  ngOnInit(): void {
    this.loadTrainees();
    this.traineess = this.trainees;
    if (!this.adminId) {
      this.adminId = localStorage.getItem('AdminID') || '';
    }

    this.searchService.searchTerm$.subscribe((term) => {
      this.filteredTrainees = this.trainees.filter((trainee) =>
        trainee.name.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  loadTrainees(): void {
    this.traineeService.getTrainees(this.adminId).subscribe(
      (data) => {
        this.trainees = data;
      },
      (error) => {
        console.error('Error loading trainees:', error);
      }
    );
  }

  loadTraineesBySubscription(): void {
    this.traineeService
      .getTraineesBySubscription(this.adminId, this.subscriptionType)
      .subscribe(
        (data) => {
          this.trainees = data;
        },
        (error) => {
          console.error('Error loading trainees by subscription:', error);
        }
      );
  }

  selectTrainee(trainee: Trainee): void {
    this.selectedTrainee = trainee;
  }

  cancel(): void {
    this.selectedTrainee = null;
  }

  addTrainee(trainee: Trainee): void {
    console.log(this.adminId);
    this.traineeService.addTrainee(trainee).subscribe(() => {
      this.loadTrainees();
      this.traineeForm.resetForm();
    });
  }

  updateTrainee(trainee: Trainee): void {
    if (this.selectedTrainee) {
      this.traineeService
        .updateTrainee(this.selectedTrainee._id!, trainee)
        .subscribe(() => {
          this.loadTrainees();
          this.selectedTrainee = null;
        });
       console.log(this.selectTrainee);
    }
  }

  deleteTrainee(id: string): void {
    this.traineeService.deleteTrainee(id).subscribe(() => {
      this.loadTrainees();
      this.selectedTrainee = null;  // Deselect after deletion
    });
  }
}
