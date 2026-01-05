import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private cdr: ChangeDetectorRef
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

    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingItem = cart.find(item => item.Id === product.Id);

    if (existingItem) {
      existingItem.Quantity += 1;
    } else {
      cart.push({
        Id: product.Id,
        Name: product.Name,
        Price: product.Price,
        DressImageUrl: product.DressImageUrl,
        Quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Product added to cart 🛒');
  }
}
