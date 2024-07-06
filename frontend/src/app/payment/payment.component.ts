// payment.component.ts

import { Component, OnInit } from '@angular/core';
import { Payment } from '../modules/interface_payment';
import { PaymentService } from '../services/payment.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [SideNavComponent, HeaderComponent, FormsModule, CommonModule],
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  selectedPayment: Payment | undefined;
  newPayment: Payment = {
    payerId: '',
    amount: 0,
    currency: 'USD',
    paymentMethod: '',
    status: 'Pending',
  };
    payerIdFilter: string = '';

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
   this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getPayments().subscribe(
      payments => {
        this.payments = payments;
      }
    )}

  applyFilter(): void {
    this.loadPayments();
  }

  selectPayment(payment: Payment): void {
    this.selectedPayment = { ...payment }; // Create a copy to avoid mutating the original object
  }

  updatePayment(payment: Payment): void {
    if (this.selectedPayment) {
      this.paymentService.updatePayment(payment).subscribe(
        updatedPayment => {
          
          console.log('Payment updated:', updatedPayment);
          this.loadPayments(); 
          this.selectedPayment = undefined; 
        }
      );
    }
  }

  cancel(): void {
    this.selectedPayment = undefined;
  }
  deletePayment(paymentId: string): void {
    this.paymentService.deletePayment(paymentId).subscribe(
      () => {
        console.log('Payment deleted:', paymentId);
        this.payments = this.payments.filter((p) => p._id !== paymentId); // Remove deleted payment from local array
        this.selectedPayment = undefined; // Deselect deleted payment if selected
        // Optionally refresh payments list or grouped payments
      },
      (error) => {
        console.error('Error deleting payment:', error);
        // Handle error deleting payment
      }
    );
  }

  addPayment(): void {
    this.paymentService
      .addPayment(this.newPayment)
      .subscribe((addedPayment: Payment) => {
        console.log('Successfully added payment:', addedPayment);
        this.router.navigate(['/payments']);
      });
  }
}
