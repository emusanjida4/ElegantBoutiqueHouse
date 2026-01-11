import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class CustomerProfileComponent implements OnInit {

  user: any = {};
  cartItems: any[] = [];
  totalOrders = 0;
  totalAmount = 0;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (storedUser && storedUser.id) {
      // Call Dapper API
      this.http.get<any>(`https://localhost:7254/api/UserInfo/userInfo/${storedUser.id}`)
        .subscribe(res => {
          debugger;
          this.user = res.user;
          this.cartItems = res.cartItems || [];
          this.totalOrders = res.orderSummary?.TotalOrders || 0;
          this.totalAmount = res.orderSummary?.TotalAmount || 0;
          this.cdr.detectChanges();
        }, err => {
          console.error('Error fetching profile:', err);
        });
    }
  }

}
