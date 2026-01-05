import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../Service/data-service';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  type: string; // men or women
}

@Component({
  selector: 'app-navbar-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarCategoryComponent implements OnInit {

  isLoggedIn = false;
  showDropdown = false;
  username = '';

  menCategories: Category[] = [];
  womenCategories: Category[] = [];

  showMenDropdown = false;
  showWomenDropdown = false;

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

    this.loadCategories();
  }

  loadCategories() {
    this.http.get<Category[]>('https://localhost:7254/api/Category')
      .subscribe(categories => {
        // Men ও Women আলাদা করা
        this.menCategories = categories.filter(c => c.type.toLowerCase() === 'men');
        this.womenCategories = categories.filter(c => c.type.toLowerCase() === 'women');
      }, error => {
        console.error('Category load error:', error);
      });
  }

  login() {
    this.dataService.login('Sanjida');
    this.router.navigate(['/']);
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

  // Men/Women dropdown toggle
  showMen() { this.showMenDropdown = true; }
  hideMen() { this.showMenDropdown = false; }

  showWomen() { this.showWomenDropdown = true; }
  hideWomen() { this.showWomenDropdown = false; }
}
