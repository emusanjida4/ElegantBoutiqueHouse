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
    private dataService:DataService
  ) {}

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

    if (this.registerFormData.password !== this.registerFormData.password) {
      alert('Passwords do not match');
      return;
    }
this.dataService.postData('UserInfo/Register',this.registerFormData).subscribe((data:any)=>{
      alert('Registration Successful');
      this.router.navigate(['/']);
},(error:any)=>{
      alert('Registration Failed');
})
    // Example API call (same pattern as login)
    /*
    this.http.post('https://localhost:7113/api/Register', this.registerFormData)
      .subscribe({
        next: () => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        },
        error: () => alert('Registration Failed')
      });
    */
  }
}
