import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class AdminUserListComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';

  // 🔥 ADD
  isEditMode = false;
  selectedUser: any = null;

  private apiUrl = 'https://localhost:7254/api/UserInfo/GetAll';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.cdr.detectChanges();
      }
    });
  }

  searchUser() {
    this.filteredUsers = this.users.filter(user =>
      user.Name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.Email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.Phone.includes(this.searchText)
    );
  }

  // 🔥 EDIT (same page)
  editUser(user: any) {
    this.selectedUser = { ...user }; // clone
    this.isEditMode = true;
  }

  // 🔥 UPDATE (frontend only)
  updateUser() {
    const index = this.users.findIndex(u => u.Id === this.selectedUser.Id);
    if (index !== -1) {
      this.users[index] = this.selectedUser;
      this.filteredUsers = [...this.users];
    }
    this.isEditMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.selectedUser = null;
  }

  // 🔥 DELETE (frontend only)
  deleteUser(id: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    this.http
      .delete(`https://localhost:7254/api/UserInfo/DeleteUser/${id}`)
      .subscribe(() => {
        this.users = this.users.filter(u => u.Id !== id);
        this.filteredUsers = [...this.users];
      });
  }
}

    

  goToAddUser() {
    this.router.navigate(['/admin/users/add']);
  }

}
