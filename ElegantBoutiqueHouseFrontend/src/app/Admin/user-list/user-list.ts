import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class AdminUserListComponent implements OnInit {

  users: any[] = [];

  private apiUrl = 'https://localhost:7254/api/UserInfo/GetAll';

  constructor(private http: HttpClient,private cdr: ChangeDetectorRef,private router: Router) {}
  goToAddUser() {
  this.router.navigate(['/admin/users/add']);
}
  goToBack() {
  this.router.navigate(['/admin/users/add']);
}

  ngOnInit(): void {
    this.loadUsers();
  }

 loadUsers() {
  this.http.get<any[]>(this.apiUrl).subscribe({
    next: (data) => {
      this.users = data;

      // Manually trigger change detection
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Error loading users', err)
  });
}

  }
