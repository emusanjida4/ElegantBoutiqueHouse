import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    categoryId: 0
  };

  isEdit = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllSubCategories();
    this.getCategories();
  }

  getAllSubCategories() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      console
      this.subCategories = res;
      this.filteredSubCategories = res;
      this.cdr.detectChanges();
    });
  }

  getCategories() {
    this.http.get<any[]>(this.categoryApi).subscribe(res => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

searchCategory() {
  const text = this.searchText.toLowerCase().trim();

  if (!text) {
    this.filteredSubCategories = this.subCategories;
    return;
  }

  this.filteredSubCategories = this.subCategories.filter(x =>
    x.Name && x.Name.toLowerCase().includes(text)
  );
}


  addSubCategory1() {
    this.subCategoryModel.categoryId = Number(this.subCategoryModel.categoryId);

    this.http.post(this.apiUrl, {
      name: this.subCategoryModel.name,
      categoryId: this.subCategoryModel.categoryId
    }).subscribe(() => {
      this.resetForm();
      this.getAllSubCategories();
    });
  }

  editSubCategory(sub: any) {
    this.isEdit = true;
    this.subCategoryModel = {
      id: sub.id,
      name: sub.name,
      categoryId: sub.categoryId
    };
  }

  updateSubCategory() {
    this.http.put(`${this.apiUrl}/${this.subCategoryModel.id}`, {
      name: this.subCategoryModel.name,
      categoryId: this.subCategoryModel.categoryId
    }).subscribe(() => {
      this.resetForm();
      this.getAllSubCategories();
    });
  }

  deleteSubCategory(id: number) {
    if (confirm('Are you sure?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
        this.getAllSubCategories();
      });
    }
  }

  resetForm() {
    this.isEdit = false;
    this.subCategoryModel = {
      id: 0,
      name: '',
      categoryId: 0
    };
  }
}
