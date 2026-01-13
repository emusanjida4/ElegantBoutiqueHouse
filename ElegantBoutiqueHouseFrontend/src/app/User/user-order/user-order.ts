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
  pinOrCard = ''; // 🔹 now used as OTP
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

    if (method === 'Cash on Delivery') {
      this.showMobileInput = false;
      this.showPinInput = false;
      return;
    }

    this.showMobileInput = true;
    this.showPinInput = true;

    this.mobileNumber = '';
    this.pinOrCard = '';

    // 🔹 OTP only
    this.pinPlaceholder = 'Enter OTP';
  }

  // ================= CONFIRM ORDER =================
  confirmOrder(): void {

    if (!this.order.payment) {
      alert('Please select a payment method');
      return;
    }

    if (this.order.payment !== 'Cash on Delivery') {

      if (!this.mobileNumber || this.mobileNumber.length < 11) {
        alert('Enter valid mobile number');
        return;
      }

      // 🔹 OTP validation only
      if (!this.pinOrCard || this.pinOrCard.length !== 6) {
        alert('OTP must be 6 digits');
        return;
      }
    }

    this.finalConfirm();
  }

  // ================= FINAL CONFIRM =================
  finalConfirm(): void {

    // 🔹 Correct payload names to match backend SP / Controller
    const payload = {
      UserId: this.user.id,
      UserName: this.order.userName,      // backend expects UserName
      Phone: this.order.phone,
      Address: this.order.address,
      Payment: this.order.payment,        // backend expects Payment
      TotalAmount: this.getTotal(),       // backend expects TotalAmount
      SpecialReq: '',                     // optional, can leave empty
      Created: new Date(),                // backend expects Created
      MethodNum: this.mobileNumber,       // mobile number
      OTP: this.pinOrCard,                // OTP for Bkash/Nagad/Card
      OrderDetails: this.cartItems.map(item => ({
        ProductId: item.ProductId,
        Quantity: item.Quantity,
        Price: item.Price,
        Size: item.Size
      }))
    };

    this.http.post(this.ORDER_API, payload).subscribe({
      next: () => {
        alert('🎉 Order Confirmed Successfully!');
        this.router.navigate(['/']);
        //Clear the cart localstorage

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
