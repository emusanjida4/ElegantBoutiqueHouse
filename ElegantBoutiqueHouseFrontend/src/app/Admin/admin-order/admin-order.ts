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

    this.http.get<any[]>(this.API_URL).subscribe({
      next: (res) => {
        this.orders = res;
        this.filteredOrders = [...this.orders];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Failed to load orders');
        this.loading = false;
      }
    });
  }

  // ================= SEARCH =================
  searchOrders(): void {
    const q = this.searchQuery.trim().toLowerCase();

    if (!q) {
      this.filteredOrders = [...this.orders];
      return;
    }

    this.filteredOrders = this.orders.filter(o =>
      o.Id.toString().includes(q) ||
      o.UserName?.toLowerCase().includes(q) ||
      o.Phone?.includes(q)
    );
  }

  // ================= UPDATE STATUS =================
  updateStatus(orderId: number, status: string): void {

    const order = this.orders.find(o => o.Id === orderId);
    if (!order) return;

    // 🔥 backend-compatible full payload
    const payload = {
      UserId: order.UserId,
      UserName: order.UserName,
      Address: order.Address,
      Phone: order.Phone,
      Payment: order.Payment,
      TotalAmount: order.TotalAmount,
      SpecialReq: order.SpecialReq,

      Status: status,
      MethodNum: order.MethodNum || '',
      OTP: order.OTP || ''
    };

    this.http.put(`${this.API_URL}/${orderId}`, payload).subscribe({
      next: () => {
        order.Status = status;
        alert('Order status updated');
      },
      error: () => {
        alert('Failed to update order status');
      }
    });
  }

  // ================= DELETE =================
  deleteOrder(orderId: number): void {
    if (!confirm('Are you sure you want to delete this order?')) return;

    this.http.delete(`${this.API_URL}/${orderId}`).subscribe({
      next: () => {
        alert('Order deleted');
        this.loadOrders();
      },
      error: () => {
        alert('Failed to delete order');
      }
    });
  }
}
