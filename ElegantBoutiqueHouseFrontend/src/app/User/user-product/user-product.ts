import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-product.html',
  styleUrl: './user-product.css',
})
export class UserProduct {

  category: string | null = '';
  products: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

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
        this.products = res || [];
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
  queryParams: {
    returnUrl: this.router.url
  }
});

      return;
    }

    const user = JSON.parse(localStorage.getItem('user')!);

    const cartData = {
      productId: product.Id,
      userId: user.id,
      quantity: 1
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
