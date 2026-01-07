import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-product',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-product.html',
  styleUrl: './user-product.css',
})
export class UserProduct {

  category: string | null = '';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log('Category:', this.category);

      if (this.category) {
        this.loadProductsByCategory(this.category);
      }
    });
  }

  loadProductsByCategory(category: string) {
    const apiUrl = `https://localhost:7254/api/Product/GenderProducts/${category}`;


    this.http.get<any[]>(apiUrl).subscribe({
      next: (res) => {
        this.products = res;
        console.log('Products:', this.products);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Product load error', err);
      }
    });
  }

  // ==============================
  // ✅ ADD TO CART (NEW)
  // ==============================
addToCart(product: any) {

  const userId = JSON.parse(localStorage.getItem('user') ??'{}'); // login user id

  if (!userId) {
    alert('Please login first');
     this.router.navigate(['/login']);
    return;
  }
debugger;
  const cartData = {
    productId: product.Id,
    userId: userId.id,
    quantity: 1,
    id: 0
  };

  this.http.post(
    'https://localhost:7254/api/AddToCart',
    cartData
  ).subscribe({
    next: (res) => {
      console.log('Added to cart:', res);
      alert('Product added to cart 🛒');
    },
    error: (err) => {
      console.error(err);
      alert('Failed to add product');
    }
  });
}
 
}
