import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-admin',
  templateUrl: './admin-stock.html',
  styleUrls: ['./admin-stock.css'],
  imports: [FormsModule, CommonModule]
})
export class StockAdminComponent implements OnInit {

  apiUrl = 'https://localhost:7254/api/Stock';

  stocks: any[] = [];

  stockModel = {
    id: 0,
    productName: '',
    quantity: 0,
    size: '',
    batchNumber: '',
    purchasePrice: 0,
    sellPrice: 0
  };

  isEdit = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllStock();
  }

  // 🔹 GET ALL
  getAllStock() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.stocks = res;
      this.cdr.detectChanges();
    });
  }

  // 🔹 ADD
  addStock() {
    this.http.post(this.apiUrl, this.stockModel).subscribe(() => {
      this.resetForm();
      this.getAllStock();
    });
  }

  // 🔹 EDIT
  editStock(stock: any) {
    this.isEdit = true;
    this.stockModel = { ...stock };
  }

  // 🔹 UPDATE
  updateStock() {
    this.http.put(this.apiUrl, this.stockModel).subscribe(() => {
      this.resetForm();
      this.getAllStock();
    });
  }

  // 🔹 DELETE
  deleteStock(id: number) {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getAllStock();
      });
    }
  }

  // 🔹 RESET
  resetForm() {
    this.isEdit = false;
    this.stockModel = {
      id: 0,
      productName: '',
      quantity: 0,
      size: '',
      batchNumber: '',
      purchasePrice: 0,
      sellPrice: 0
    };
  }
}
