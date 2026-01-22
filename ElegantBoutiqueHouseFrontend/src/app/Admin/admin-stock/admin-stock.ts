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
  productApi = 'https://localhost:7254/api/Product';

  stocks: any[] = [];
  products: any[] = [];

  stockModel = {
    id: 0,
    productId: 0,
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
  ) { }

  ngOnInit(): void {
    this.getAllStock();
    this.getAllProducts();
  }

  getAllStock() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.stocks = res;
      this.cdr.detectChanges();
    });
  }

  getAllProducts() {
    this.http.get<any[]>(this.productApi).subscribe(res => {
      this.products = res;
      this.cdr.detectChanges();
    });
  }

  addStock() {
    this.http.post(this.apiUrl, this.stockModel).subscribe(() => {
      this.resetForm();
      this.getAllStock();
    });
  }

  // 🔹 EDIT FIXED
  // 🔹 EDIT FIXED
  editStock(stock: any) {
    this.isEdit = true;

    // Use Object.assign to preserve reference for ngModel
    Object.assign(this.stockModel, {
      id: stock.Id,
      productId: stock.ProductId,
      productName: stock.ProductName,
      quantity: stock.Quantity,
      size: stock.Size,
      batchNumber: stock.BatchNumber,
      purchasePrice: stock.PurchasePrice,
      sellPrice: stock.SellPrice
    });

    // update sellPrice if product selected
    this.onProductChange();

    // Scroll to top
    window.scrollTo(0, 0);
  }

  updateStock() {
    this.stockModel.batchNumber = String(this.stockModel.batchNumber);
    this.http.put(this.apiUrl, this.stockModel).subscribe(() => {
      this.resetForm();
      this.getAllStock();
      this.cdr.detectChanges();
    });
  }

  deleteStock(id: number) {
    if (confirm('Are you sure you want to delete this stock?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getAllStock();
      });
    }
  }

  onProductChange() {
    const selectedProduct = this.products.find(
      p => p.Id === Number(this.stockModel.productId)
    );

    if (selectedProduct) {
      this.stockModel.productName = selectedProduct.Name;
      this.stockModel.sellPrice = selectedProduct.Price;
    }
  }

  resetForm() {
    this.isEdit = false;
    this.stockModel = {
      id: 0,
      productId: 0,
      productName: '',
      quantity: 0,
      size: '',
      batchNumber: '',
      purchasePrice: 0,
      sellPrice: 0
    };
  }

  blockNegative(event: KeyboardEvent) {
  if (event.key === '-' || event.key === 'e') {
    event.preventDefault();
  }
}
}
