import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { DataService } from '../../../Service/data-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dash-board.html',
  styleUrls: ['./admin-dash-board.css'],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class AdminDashboardComponent {

  constructor(
    public router: Router,
    private location: Location,
    private dataservice: DataService
  ) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  goBack() {
    this.location.back();
  }
 logout() {
    this.dataservice.logout();
  this.router.navigateByUrl('/');
}

}
