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
  ) { }

  ngOnInit() {
    this.loadDashboardData();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  loadDashboardData() {
    // 1. Get Aggregated Stats (Profit, Counts)
    this.http.get<any>('https://localhost:7254/api/Report/summary').subscribe({
      next: (res) => {
        this.totalUsers = res.totalUsers;
        this.totalProducts = res.totalProducts;
        this.totalOrders = res.totalOrders;
        this.totalProfit = res.totalProfit;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Failed to load stats', err)
    });

    // 2. Recent Orders (Only needed for the table)
    this.http.get<any[]>('https://localhost:7254/api/Order').subscribe(res => {
      // Just take the last 5 for the table
      this.recentOrders = res.slice(-5).reverse();
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
