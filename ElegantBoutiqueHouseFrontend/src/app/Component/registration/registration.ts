import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../Service/data-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registerFormData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    gender: ''
  };

  RegImages: string[] = [
    'assets/RegImages/reg7.jpg',
    'assets/RegImages/re2.jpg',
    'assets/RegImages/re3.jpg',
    'assets/RegImages/re1.jpg',
    'assets/RegImages/re5.jpg',
  ];

  currentImage: string = this.RegImages[0];
  private index = 0;
  private intervalId: any;

  constructor(

    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.startImageSlider();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startImageSlider() {
    this.intervalId = setInterval(() => {
      this.index = (this.index + 1) % this.RegImages.length;
      this.currentImage = this.RegImages[this.index];

    }, 3000);
  }

  onRegister() {
    debugger;
    console.log(this.registerFormData);

    const password = this.registerFormData.password;

    // Password validation regex
    // At least 6 chars, 1 letter, 1 special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        'Password must be at least 6 characters long and contain at least one letter and one special character.'
      );
      return;
    }

    this.dataService
      .postData('UserInfo/Register', this.registerFormData)
      .subscribe(
        (data: any) => {
          alert('Registration Successful');
          this.router.navigate(['/']);
        },
        (error: any) => {
          if (error.error === 'Email already exists') {
            alert('Duplicate email address! Please change your email.');
          } else {
            alert('Registration Failed');
          }
        }
      );
  }

}

