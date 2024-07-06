import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent,SideNavComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

}
