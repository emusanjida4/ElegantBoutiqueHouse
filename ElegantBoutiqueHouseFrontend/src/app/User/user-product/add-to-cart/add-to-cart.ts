import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.html',
  styleUrls: ['./add-to-cart.css'],
  imports: [CommonModule, RouterModule]
})
export class AddToCartComponent implements OnInit {
  cartItems: any[] = [];
  apiUrl = 'https://localhost:7254/api/AddToCart';
  totalAmount: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user || !user.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadCart(user.id);
  }

  loadCart(userId: number) {
    this.http.get<any[]>(`${this.apiUrl}/User/${userId}`).subscribe({
      next: (res) => {
           localStorage.setItem('cart', JSON.stringify(res));

        this.cartItems = res;
        this.updateTotal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removeItem(cartId: number) {
    this.http.delete(`${this.apiUrl}/${cartId}`).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.Id !== cartId);
        this.updateTotal();
      }
    });
  }

  // ===============================
  // ✅ Increase / Decrease Quantity
  // ===============================
  increaseQty(item: any) {
    item.Quantity += 1;
    item.TotalPrice = item.Price * item.Quantity;
    this.updateTotal();
  }

  decreaseQty(item: any) {
    if (item.Quantity > 1) {
      item.Quantity -= 1;
      item.TotalPrice = item.Price * item.Quantity;
      this.updateTotal();
    }
  }

  // ===============================
  // ✅ Total Calculation
  // ===============================
  updateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.TotalPrice, 0);
  }

  // ===============================
  // ✅ Clear Cart
  // ===============================
  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartItems.forEach(item => {
        this.http.delete(`${this.apiUrl}/${item.Id}`).subscribe();
      });
      this.cartItems = [];
      this.totalAmount = 0;
    }
  }

  // ===============================
  // ✅ Proceed to Order
  // ===============================
  proceedToOrder() {
    debugger;
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    this.router.navigate(['/navbar/checkout']); // replace with your actual order page route
  }
}
