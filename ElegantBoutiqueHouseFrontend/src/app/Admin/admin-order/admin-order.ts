import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './admin-order.html',
  styleUrls: ['./admin-order.css']
})
export class AdminOrderComponent implements OnInit {

  orders: any[] = [];
  filteredOrders: any[] = [];
  loading: boolean = false;
  searchQuery: string = '';

  private API_URL = 'https://localhost:7254/api/Order';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // ================= LOAD ORDERS =================
  loadOrders(): void {
    this.loading = true;
    this.http.get<any[]>(`${this.API_URL}`).subscribe({
      next: (res) => {
        this.orders = res.map(o => ({
          ...o,
          orderItems: o.orderItems || []
        }));
        this.filteredOrders = [...this.orders];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load orders');
        this.loading = false;
      }
    });
  }

  // ================= SEARCH ORDERS =================
  searchOrders(): void {
    const q = this.searchQuery.trim().toLowerCase();

    if (!q) {
      this.filteredOrders = [...this.orders];
      return;
    }

    this.filteredOrders = this.orders.filter(order =>
      order.Id.toString().includes(q) ||
      order.orderItems.some((item: any) =>
        item.ProductId?.toString().includes(q) ||
        item.ProductName?.toLowerCase().includes(q)
      )
    );
  }

  // ================= UPDATE ORDER STATUS =================
  updateStatus(orderId: number, status: string): void {
    this.http.put(
      `${this.API_URL}/${orderId}/status`,
      { Status: status }
    ).subscribe({
      next: () => {
        alert('Order status updated');
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update order status');
      }
    });
  }

  // ================= DELETE ORDER =================
  deleteOrder(orderId: number): void {
    if (!confirm('Are you sure you want to delete this order?')) return;

    this.http.delete(`${this.API_URL}/${orderId}`).subscribe({
      next: () => {
        alert('Order deleted');
        this.loadOrders();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete order');
      }
    });
  }
}
