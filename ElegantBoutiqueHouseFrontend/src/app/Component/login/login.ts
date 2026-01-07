import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataService } from '../../../Service/data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterModule]
})
export class LoginComponent implements OnInit {

  loginFormData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.clearForm();
  }

  clearForm() {
    this.loginFormData = {
      email: '',
      password: ''
    };
  }

  onLogin() {
    this.dataService
      .postData('UserInfo/Login', this.loginFormData)
      .subscribe(
        (data: any) => {

          alert('Login Successful');
debugger;
          // ✅ username API থেকে নিলাম
          const username =
            data.name || data.username || this.loginFormData.email;
           localStorage.setItem('user', JSON.stringify(data));
          // 🔥 এখানেই dynamic username সেট হবে
          this.dataService.login(data.Name);

          // 🔐 ROLE BASED REDIRECT
          if (data.UserType && data.UserType.toLowerCase() === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        },
        (error: any) => {
          alert('Login Failed');
        }
      );
  }
}
