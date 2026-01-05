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
  showproducts(type: string) {
    this.router.navigate(['/navbar/userproduct'], { queryParams: { category: type } });
  }
  
}
