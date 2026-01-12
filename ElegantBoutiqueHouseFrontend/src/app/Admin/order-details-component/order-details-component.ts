import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details-component.html',
  styleUrls: ['./order-details-component.css'],
  imports: [CommonModule, RouterModule]
})
export class OrderDetailsComponent implements OnInit {

  orderId!: number;
  order: any;
  orderItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrderDetails();
  }

  loadOrderDetails() {
    // Order info
    this.http.get<any>(`https://localhost:7254/api/Order/${this.orderId}`)
      .subscribe(res => {
        this.order = res;
        this.cdr.detectChanges();
      });

    // Order items
    this.http.get<any[]>(`https://localhost:7254/api/Order/items/${this.orderId}`)
      .subscribe(res => {
        this.orderItems = res;
        this.cdr.detectChanges();
      });
  }
}
