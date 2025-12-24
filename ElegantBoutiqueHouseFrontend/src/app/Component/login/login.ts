import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../../Service/data-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
  imports: [FormsModule ,RouterLink]
})
export class LoginComponent {

  loginFormData = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  onLogin() {
    debugger;
    console.log(this.loginFormData);

    this.dataService
      .postData('UserInfo/Login', this.loginFormData)
      .subscribe(
        (data: any) => {
          alert('Login Successful');
          this.router.navigate(['/']); // or dashboard/home
        },
        (error: any) => {
          alert('Login Failed');
        }
      );
  }
}
