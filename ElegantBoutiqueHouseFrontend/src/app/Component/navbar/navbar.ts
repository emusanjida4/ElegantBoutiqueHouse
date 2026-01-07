import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../Service/data-service';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer";

interface Category {
  id: number;
  name: string;
  type: string; // men or women
}

@Component({
  selector: 'app-navbar-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FooterComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarCategoryComponent implements OnInit {

  isLoggedIn = false;
  showDropdown = false;
  username = '';

  menCategories: Category[] = [];
  womenCategories: Category[] = [];

  cartCount = 0; // New: Cart item count

  constructor(
    private router: Router,
    private dataService: DataService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.dataService.username$.subscribe(name => {
      this.username = name;
    });

    // Optional: Fetch cart count
    this.loadCartCount();
  }

  loadCartCount() {
    // Replace API URL with your actual backend endpoint
    this.http.get<number>('https://localhost:7254/api/AddToCart/Count').subscribe(
      count => this.cartCount = count,
      err => console.error(err)
    );
  }

  login() {
    this.dataService.login('');
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.dataService.logout();
    this.showDropdown = false;
    this.router.navigate(['/']);
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  showproducts(type: string) {
    this.router.navigate(['/navbar/userproduct'], { queryParams: { category: type } });
  }

  goToCart() {
    this.router.navigate(['/navbar/cart']); // Route to your cart page
  }
}
