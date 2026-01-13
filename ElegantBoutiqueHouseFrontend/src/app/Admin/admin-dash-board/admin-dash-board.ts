import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DataService } from '../../../Service/data-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dash-board.html',
  styleUrls: ['./admin-dash-board.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class AdminDashboardComponent {

  totalOrders: number = 0;
  totalUsers: number = 0;
  totalProducts: number = 0;
  lowStockItems: number = 0;
  recentOrders: any[] = [];
  orders: any[] = [];
  totalProfit: number = 0;



  constructor(
    public router: Router,
    private location: Location,
    private dataservice: DataService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  loadDashboardData() {
    // 1. Total Users
    this.http.get<any[]>('https://localhost:7254/api/UserInfo/GetAll').subscribe(res => {
      this.totalUsers = res.length;
      this.cdr.detectChanges();
    });

    // 2. Total Products
    this.http.get<any[]>('https://localhost:7254/api/Product').subscribe(res => {
      this.totalProducts = res.length;
      this.cdr.detectChanges();
    });

    // 3. Total Orders
    this.http.get<any[]>('https://localhost:7254/api/Order').subscribe(res => {
      this.totalOrders = res.length;
      this.recentOrders = res.slice(-5).reverse(); // Last 5 orders
      this.orders = res;
      this.totalProfit = this.orders.reduce((acc, order) => acc + parseInt(order.TotalAmount), 0);
      console.log(this.recentOrders);
      this.cdr.detectChanges();
    });

    // 4. Stocks
    this.http.get<any[]>('https://localhost:7254/api/Stock').subscribe(res => {
      //Profit Calculation like res.SellingPric
      // this.totalProfit = res.reduce((acc, item) => acc + (item.SoldQuantity * item.SellingPrice), 0);
      this.lowStockItems = res.filter(item => item.Quantity <= 5).length;
      this.cdr.detectChanges();
    });




  }

  goBack() {
    this.location.back();
  }
 logout() {
    this.dataservice.logout();
  this.router.navigateByUrl('/');
}

}
