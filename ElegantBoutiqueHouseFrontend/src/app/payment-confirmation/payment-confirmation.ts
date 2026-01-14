import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payment-confirmation',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './payment-confirmation.html',
  styleUrl: './payment-confirmation.css',
})
export class PaymentConfirmation implements OnInit {

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    debugger;
    const paymentId = this.route.snapshot.queryParamMap.get('paymentID');
    const status = this.route.snapshot.queryParamMap.get('status');

    if (paymentId && status === 'success') {
      this.confirmPayment(paymentId);
    } else {
      this.errorMessage = 'Payment failed or cancelled';
      this.loading = false;
    }
  }

  confirmPayment(paymentId: string) {

    this.http.get<any>('https://localhost:7254/api/Order/Success_URL?paymentId='+ paymentId )
      .subscribe({
        next: (res) => {
          this.loading = false;

          if (res.success) {
            // ✅ Redirect to home Page
            this.router.navigate(['/navbar']);
          } else {
            this.errorMessage = 'Payment verification failed';
          }
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Server error while verifying payment';
        }
      });
  }
}