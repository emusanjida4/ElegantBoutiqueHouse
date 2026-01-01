import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userform',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class Userform implements OnInit {
  user = {
    Id: '',
    Name: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: '',
    Gender: ''
  };
  private apiUrl = 'https://localhost:7254/api/UserInfo/Register';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.getAllCategories();
  }


  saveUser() {
    // console.log('User data:', this.user);
    // alert('User saved successfully!');

    this.http.post(this.apiUrl, {
      Name: this.user.Name,
      Email: this.user.Email,
      Password: this.user.Password,
      Phone: this.user.Phone,
      Address: this.user.Address,
      Gender: this.user.Gender
    }
  ).subscribe(() => {
    alert('User saved successfully!');
    this.cancel();
  });
  }

  cancel() {
    this.user = {
      Id: '',
      Name: '',
      Email: '',
      Password: '',
      Phone: '',
      Address: '',
      Gender: ''
    };
    alert('User form cleared.');
    
  }
  }