import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportModel {
  reportDate: string;
  totalOrders: number;
  totalSoldItems: number;
  totalRevenue: number;
  totalProfit: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {
  private apiUrl = 'https://localhost:7254/api/Report';

  constructor(private http: HttpClient) {}

  getDailyReport(): Observable<ReportModel[]> {
    return this.http.get<ReportModel[]>(`${this.apiUrl}/daily`);
  }
}
