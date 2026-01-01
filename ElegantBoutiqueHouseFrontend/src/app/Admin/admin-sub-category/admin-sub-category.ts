import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './admin-sub-category.html',
  styleUrls: ['./admin-sub-category.css'],
  imports: [FormsModule, CommonModule, RouterLink]
})
export class SubCategoryComponent implements OnInit {

  apiUrl = 'https://localhost:7254/api/SubCategory';
  categoryApi = 'https://localhost:7254/api/Category';

  subCategories: any[] = [];
  filteredSubCategories: any[] = [];
  categories: any[] = [];

  searchText: string = '';

  subCategoryModel = {
    id: 0,
    name: '',
    categoryId: 0,
    
  };

  isEdit = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllSubCategories();
    this.getCategories();
  }

  // 🔹 GET ALL SUB-CATEGORIES
  getAllSubCategories() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.subCategories = res;
      this.filteredSubCategories = res;
    });
  }

  // 🔹 GET CATEGORY LIST
  getCategories() {
    this.http.get<any[]>(this.categoryApi).subscribe(res => {
      this.categories = res;
    });
  }

  // 🔹 SEARCH
  searchCategory() {
    this.filteredSubCategories = this.subCategories.filter(x =>
      x.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // 🔹 ADD
  addSubCategory1() {
    debugger;
    console.table(this.subCategoryModel);
    this.http.post(this.apiUrl, {
      name: this.subCategoryModel.name,
      categoryId: this.subCategoryModel.categoryId,
      
    }).subscribe(() => {
      this.resetForm();
      this.getAllSubCategories();
    });
  }

  // 🔹 EDIT
  editSubCategory(sub: any) {
    this.isEdit = true;
    this.subCategoryModel = {
      id: sub.id,
      name: sub.name,
      categoryId: sub.categoryId,
     
    };
  }

  // 🔹 UPDATE
  updateSubCategory() {
    this.http.put(`${this.apiUrl}/${this.subCategoryModel.id}`, {
      name: this.subCategoryModel.name,
      categoryId: this.subCategoryModel.categoryId,
     
    }).subscribe(() => {
      this.resetForm();
      this.getAllSubCategories();
    });
  }

  // 🔹 DELETE
  deleteSubCategory(id: number) {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getAllSubCategories();
      });
    }
  }

  // 🔹 RESET
  resetForm() {
    this.isEdit = false;
    this.subCategoryModel = {
      id: 0,
      name: '',
      categoryId: 0,
      
    };
  }
}
