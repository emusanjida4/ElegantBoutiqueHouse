import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../Service/data-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule]
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
    // ✅ Login page e aslei form clear
    this.clearForm();
  }

  clearForm() {
    this.loginFormData = {
      email: '',
      password: ''
    };
  }

  onLogin() {
    console.log(this.loginFormData);

    this.dataService
      .postData('UserInfo/Login', this.loginFormData)
      .subscribe(
        (data: any) => {
          alert('Login Successful');

          // 🔐 ROLE BASED REDIRECT
          if (data.UserType && data.UserType.toLowerCase() === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        },
        (error: any) => {
          alert('Login Failed');
        }
      );
  }
}
