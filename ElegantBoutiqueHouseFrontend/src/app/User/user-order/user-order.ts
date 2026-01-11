import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './user-order.html',
  styleUrls: ['./user-order.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OrderComponent implements OnInit {

  user: any = {};
  cartItems: any[] = [];

  payments: string[] = [
    'Cash on Delivery',
    'Bkash',
    'Nagad',
    'Card'
  ];

  order = {
    userName: '',
    phone: '',
    address: '',
    payment: '',
    totalAmount: 0
  };

  showMobileInput = false;
  showPinInput = false;
  mobileNumber = '';
  pinOrCard = '';
  pinPlaceholder = '';

  private ORDER_API = 'https://localhost:7254/api/Order';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.order.userName = this.user?.Name || '';
    this.order.phone = this.user?.Phone || '';
    this.order.address = this.user?.Address || '';

    this.getCartData();
  }

  // ================= CART DATA =================
  getCartData(): void {
    this.http
      .get<any[]>(`https://localhost:7254/api/AddToCart/User/${this.user.id}`)
      .subscribe(res => {
        this.cartItems = res;
        this.cdr.detectChanges();
      });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.TotalPrice || 0),
      0
    );
  }

  // ================= PAYMENT SELECT =================
  selectPayment(method: string): void {
    this.order.payment = method;

    this.showMobileInput = method !== 'Cash on Delivery';
    this.showPinInput = false;

    this.mobileNumber = '';
    this.pinOrCard = '';
  }

  // ================= CONFIRM ORDER =================
  confirmOrder(): void {

    if (!this.order.payment) {
      alert('Please select a payment method');
      return;
    }

    if (this.order.payment === 'Cash on Delivery') {
      this.finalConfirm();
      return;
    }

    if (!this.mobileNumber || this.mobileNumber.length < 11) {
      alert('Enter valid mobile number');
      return;
    }

    this.showPinInput = true;

    if (this.order.payment === 'Bkash' && this.pinOrCard.length !== 5) {
      alert('Bkash PIN must be 5 digits');
      return;
    }

    if (this.order.payment === 'Nagad' && this.pinOrCard.length !== 4) {
      alert('Nagad PIN must be 4 digits');
      return;
    }

    if (this.order.payment === 'Card' && this.pinOrCard.length !== 16) {
      alert('Card number must be 16 digits');
      return;
    }

    this.finalConfirm();
  }

  // ================= FINAL CONFIRM (API CALL) =================
  finalConfirm(): void {

    const payload = {
      UserId: this.user.id,
      Name: this.order.userName,
      Phone: this.order.phone,
      Address: this.order.address,
      PaymentMethod: this.order.payment,
      TotalPrice: this.getTotal(),
      OrderItems: this.cartItems.map(item => ({
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        Price: item.Price
      }))
    };

    this.http.post(this.ORDER_API, payload).subscribe({
      next: () => {
        alert('🎉 Order Confirmed Successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Order failed!');
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
