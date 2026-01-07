import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
  imports: [FormsModule,CommonModule]
})
export class CategoryAdminComponent implements OnInit {

  apiUrl = 'https://localhost:7254/api/Category'; // change if needed

  categories: any[] = [];

  categoryModel = {
    id: 0,
  name: '',
  createdBy: 'Admin',
  updatedBy: 'Admin',
  isactive: true
  };

  isEdit = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  // 🔹 GET ALL
  getAllCategories() {
    debugger;
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      console.log(res);
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

  // 🔹 ADD
  addCategory() {
  this.http.post(
    'https://localhost:7254/api/Category/category',
    {
      name: this.categoryModel.name,
        CreatedBy: 'Admin',
      updatedBy: 'Admin',
       isactive: true,
  
       isdelete: true
    }
  ).subscribe(() => {
    this.resetForm();
    this.getAllCategories();
  });
}



  // 🔹 EDIT (load data)
  editCategory(cat: any) {
    this.isEdit = true;
    this.categoryModel = {
      id: cat.id,
      name: cat.name,
      createdBy: cat.createdBy,
      updatedBy: 'Admin',
      isactive: cat.isactive
    };
  }

  // 🔹 UPDATE
  updateCategory() {
    debugger;
    this.http.put(`${this.apiUrl}/${this.categoryModel.id}`, {
      id:this.categoryModel.id,
      name: this.categoryModel.name
     
    }).subscribe(() => {
      this.resetForm();
      this.getAllCategories();
    });
  }

  // 🔹 DELETE
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getAllCategories();
      });
    }
  }

  // 🔹 RESET
  resetForm() {
    this.isEdit = false;
    this.categoryModel = {
      id: 0,
      name: '',
      createdBy: 'Admin',
      updatedBy: 'Admin',
      isactive: true,
      
      
    };
  }
}
