import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-invoice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-invoice.html',
  styleUrl: './user-invoice.css',
})
export class UserInvoice implements OnInit {

  userId: number = 0;
  orders: any[] = [];

  // modal control
  showInvoice = false;
  selectedOrderId: number | null = null;

  // invoice data
  invoiceHeader: any;
  invoiceProducts: any[] = [];
  subTotal: number = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
    }
    this.loadOrders();
  }

  loadOrders() {
    this.http
      .get<any[]>(`https://localhost:7254/api/Order/user/${this.userId}`)
      .subscribe(res => {
        // console.log('User Orders:', res);
        this.orders = res;
        this.cdr.detectChanges();
      });
  }

  // 🔹 open modal + load invoice
  viewInvoice(orderId: number) {
    this.selectedOrderId = orderId;
    this.showInvoice = true;

    this.http
      .get<any>(`https://localhost:7254/api/Order/invoice/${orderId}`)
      .subscribe(res => {
        this.invoiceHeader = res.header;
        this.invoiceProducts = res.products;
        this.subTotal = res.subTotal;
        console.log('Invoice Data:', res.header);

        this.cdr.detectChanges();
      });
  }
  loadInvoiceData(orderId: number) {
  this.http
    .get<any>(`https://localhost:7254/api/Order/invoice/${orderId}`)
    .subscribe({
      next: (res) => {
        this.invoiceHeader = res.header;
        this.invoiceProducts = res.products;
        this.subTotal = res.subTotal;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load invoice', err);
      }
    });
}


  // 🔹 close modal
  backToOrders() {
    this.showInvoice = false;
    this.selectedOrderId = null;
    this.invoiceHeader = null;
    this.invoiceProducts = [];
    this.subTotal = 0;
  }
}
