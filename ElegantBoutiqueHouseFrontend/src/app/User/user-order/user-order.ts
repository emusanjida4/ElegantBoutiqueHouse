import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './user-order.html',
  styleUrls: ['./user-order.css'],
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

  // 🔽 New variables
  showMobileInput = false;
  showPinInput = false;
  mobileNumber = '';
  pinOrCard = '';
  pinPlaceholder = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    this.order.userName = this.user?.Name || '';
    this.order.phone = this.user?.Phone || '';
    this.order.address = this.user?.Address || '';
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.TotalPrice || 0), 0
    );
  }

  // ✅ payment select logic
  selectPayment(method: string) {
    this.order.payment = method;

    this.showMobileInput = method !== 'Cash on Delivery';
    this.showPinInput = false;

    this.mobileNumber = '';
    this.pinOrCard = '';
  }

  confirmOrder(): void {

    if (!this.order.payment) {
      alert('Please select a payment method');
      return;
    }

    // Cash on Delivery
    if (this.order.payment === 'Cash on Delivery') {
      this.finalConfirm();
      return;
    }

    // Mobile validation
    if (!this.mobileNumber || this.mobileNumber.length < 11) {
      alert('Enter valid mobile number');
      return;
    }

    this.showPinInput = true;

    // PIN/Card validation
    if (this.order.payment === 'Bkash') {
      this.pinPlaceholder = 'Enter 5 digit Bkash PIN';
      if (this.pinOrCard.length !== 5) {
        alert('Bkash PIN must be 5 digits');
        return;
      }
    }

    if (this.order.payment === 'Nagad') {
      this.pinPlaceholder = 'Enter 4 digit Nagad PIN';
      if (this.pinOrCard.length !== 4) {
        alert('Nagad PIN must be 4 digits');
        return;
      }
    }

    if (this.order.payment === 'Card') {
      this.pinPlaceholder = 'Enter 16 digit Card Number';
      if (this.pinOrCard.length !== 16) {
        alert('Card number must be 16 digits');
        return;
      }
    }

    this.finalConfirm();
  }

  finalConfirm() {
    this.order.totalAmount = this.getTotal();
    console.log('ORDER DATA:', this.order);
    alert('🎉 Order Confirmed Successfully!');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
