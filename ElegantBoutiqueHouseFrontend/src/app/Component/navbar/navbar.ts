import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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

activeDropdown: string = '';  // Keeps track of which category dropdown is active

  cartCount = 0; // New: Cart item count

  constructor(
    public router: Router,
    private dataService: DataService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.menCategories = [

      
    { id: 1, name: 'Shirt', type: 'men' },
    { id: 2, name: 'Panjabi', type: 'men' },
    { id: 3, name: 'Pant', type: 'men' },
    { id: 4, name: 'Formal-Coat', type: 'men' }
    
  ];

  this.womenCategories = [
    { id: 1, name: 'Gown', type: 'women' },
    { id: 2, name: 'Kameez', type: 'women' },
    { id: 3, name: 'Saree', type: 'women' },
    { id: 4, name: 'Coat', type: 'women' }

  ];

    this.dataService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.cdr.detectChanges(); 
    });

    this.dataService.username$.subscribe(name => {
      this.username = name;
      this.cdr.detectChanges();
    });

    // Optional: Fetch cart count
    this.loadCartCount();
  }

  loadCartCount() {
    // Replace API URL with your actual backend endpoint
    this.http.get<number>('https://localhost:7254/api/AddToCart/Count').subscribe(
      count => this.cartCount = count,
      err => console.error(err),
      () => this.cdr.detectChanges()
    );
  }
  goToProfile() {
  this.showDropdown = false;
  this.router.navigate(['/navbar/profile']);
  this.cdr.detectChanges();
}

 @HostListener('document:click')
  closeDropdown() {
    this.showDropdown = false;
  }
  // NavbarCategoryComponent.ts
goHome() {
  this.router.navigate(['/navbar/home']);
}

// TS file

showDropdownMenu(type: string) {
  this.activeDropdown = type;  // 'men', 'women', or ''
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

 toggleDropdown(event: MouseEvent) {
    event.stopPropagation();   // ⛔ prevent document click
    this.showDropdown = !this.showDropdown;
  }

  showproducts(type: string) {
    this.router.navigate(['/navbar/userproduct'], { queryParams: { category: type } });
  }

  goToCart() {
    this.router.navigate(['/navbar/cart']); // Route to your cart page
  }
}
