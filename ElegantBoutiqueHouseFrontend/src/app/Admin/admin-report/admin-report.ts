import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminReportService, ReportModel } from './admin-report.service';

@Component({
  selector: 'app-admin-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2>Daily Sales & Profit Report</h2>
      
      <div class="row mb-3">
        <div class="col-md-4 d-flex">
          <input type="text" class="form-control me-2" placeholder="Search by Month (e.g. January)" [(ngModel)]="searchText">
          <button class="btn btn-primary" (click)="searchReport()">Search</button>
        </div>
      </div>

      <div *ngIf="isLoading" class="text-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div *ngIf="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <div class="table-responsive" *ngIf="!isLoading && filteredReports.length > 0">
        <table class="table table-striped table-hover table-bordered shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>Date</th>
              <th class="text-center">Total Orders</th>
              <th class="text-center">Sold Items</th>
              <th class="text-end">Revenue (Tk)</th>
              <th class="text-end">Profit (Tk)</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let report of filteredReports">
              <td>{{ report.reportDate | date:'mediumDate' }}</td>
              <td class="text-center">{{ report.totalOrders }}</td>
              <td class="text-center">{{ report.totalSoldItems }}</td>
              <td class="text-end fw-bold">{{ report.totalRevenue | currency:'BDT':'symbol-narrow' }}</td>
              <td class="text-end fw-bold" [ngClass]="{'text-success': report.totalProfit > 0, 'text-danger': report.totalProfit < 0}">
                {{ report.totalProfit | currency:'BDT':'symbol-narrow' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div *ngIf="!isLoading && filteredReports.length === 0" class="alert alert-info">
        No sales data found.
      </div>
    </div>
  `,
  styles: [`
    .table th, .table td { vertical-align: middle; }
  `]
})
export class AdminReportComponent implements OnInit {
  reports: ReportModel[] = [];
  filteredReports: ReportModel[] = [];
  isLoading = true;
  errorMessage = '';
  searchText = '';

  constructor(private reportService: AdminReportService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadReport();
  }

  loadReport() {
    this.reportService.getDailyReport().subscribe({
      next: (data) => {
        this.reports = data;
        this.filteredReports = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load report data. Please try again.';
        this.isLoading = false;
      }
    });
  }

  searchReport() {
    if (!this.searchText) {
      this.filteredReports = this.reports;
    } else {
      const searchLower = this.searchText.toLowerCase();
      this.filteredReports = this.reports.filter(report => {
        const date = new Date(report.reportDate);
        const monthName = date.toLocaleString('default', { month: 'long' }).toLowerCase();
        return monthName.includes(searchLower);
      });
    }
  }
}
