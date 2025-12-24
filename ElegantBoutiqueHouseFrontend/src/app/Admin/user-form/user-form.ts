import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userform',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class Userform {
  user = {
    Id: '',
    Name: '',
    Email: '',
    Password: '',
    Phone: '',
    Address: '',
    Gender: ''
  };

  saveUser() {
    console.log('User data:', this.user);
    alert('User saved successfully!');
    // Here you can call your API to save data
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