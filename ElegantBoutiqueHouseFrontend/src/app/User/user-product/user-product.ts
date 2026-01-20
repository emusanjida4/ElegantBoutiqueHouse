import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-product.html',
  styleUrl: './user-product.css',
})
export class UserProduct {

  category: string | null = '';
  products: any[] = [];
  isLoggedIn: boolean = false;

  // Modal State
  selectedProduct: any = null;
  isModalOpen: boolean = false;

  openModal(product: any) {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkLogin();

    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      if (this.category) {
        this.loadProductsByCategory(this.category);
      }
    });
  }

  // ================= LOGIN CHECK =================
  checkLogin(): void {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      this.isLoggedIn = false;
      return;
    }

    try {
      const user = JSON.parse(userStr);
      this.isLoggedIn = !!(user && user.id);
    } catch {
      localStorage.removeItem('user');
      this.isLoggedIn = false;
    }
  }

  // ================= LOAD PRODUCTS =================
  loadProductsByCategory(category: string) {
    const apiUrl = `https://localhost:7254/api/Product/GetProductsByCat/${category}`;

    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        // 🔹 ensure Sizes and selectedSize exist
        this.products = res.map(p => ({
          ...p,
          Sizes: p.Sizes || ['S', 'M', 'L', 'XL'], // default sizes
          selectedSize: p.Sizes ? p.Sizes[0] : 'M'
        }));
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
        this.cdr.detectChanges();
      }
    });
  }

  // ================= ADD TO CART =================
  addToCart(product: any) {

    // 🔴 SECOND LEVEL SECURITY
    if (!this.isLoggedIn) {
      alert('Please login first to add product to cart');
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    // 🔹 ensure user selected a size
    if (!product.selectedSize) {
      alert('Please select a size');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user')!);

    const cartData = {
      productId: product.Id,
      userId: user.id,
      quantity: 1,
      size: product.selectedSize // 🔹 send size to backend
    };

    this.http.post(
      'https://localhost:7254/api/AddToCart',
      cartData
    ).subscribe({
      next: () => {
        alert('Product added to cart 🛒');
      },
      error: () => {
        alert('Failed to add product');
      }
    });
  }
}
