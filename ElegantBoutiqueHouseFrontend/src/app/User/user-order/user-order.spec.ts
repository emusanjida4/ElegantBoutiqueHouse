import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './user-order.html',
  styleUrls: ['./user-order.css']
})
export class OrderConfirmComponent implements OnInit {

  user: any;
  cartItems: any[] = [];

  payments = ['Cash on Delivery', 'Bkash', 'Nagad', 'Card'];

  order = {
    userName: '',
    phone: '',
    address: '',
    payment: '',
    totalAmount: 0
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    this.order.userName = this.user?.name;
  }

  getTotal() {
    return this.cartItems.reduce((s, i) => s + i.totalPrice, 0);
  }

  confirmOrder() {
    this.order.totalAmount = this.getTotal();
    alert('🎉 Order Confirmed Successfully!');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
