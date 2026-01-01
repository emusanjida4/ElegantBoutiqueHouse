import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../Service/data-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule]
})
export class NavbarComponent {
  isLoggedIn = false;
  username = '';
 constructor(
  
    private router: Router,
    private dataService:DataService
  ) {}

  login() {
    // fake login for demo
    this.isLoggedIn = true;
    this.username = 'Sanjida';
  }

  signup() {
    this.router.navigate(['/register']);
  }
}
