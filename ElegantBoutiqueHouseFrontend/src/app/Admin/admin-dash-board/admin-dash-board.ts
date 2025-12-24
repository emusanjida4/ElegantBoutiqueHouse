import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dash-board.html',
  styleUrls: ['./admin-dash-board.css'],
  imports: [RouterLink]
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
