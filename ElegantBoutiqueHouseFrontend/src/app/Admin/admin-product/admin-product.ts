import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-product.html',
  styleUrls: ['./admin-product.css']
})
export class AdminProductComponent implements OnInit {

  productApi = 'https://localhost:7254/api/Product';
  categoryApi = 'https://localhost:7254/api/Category';
  subCategoryApi = 'https://localhost:7254/api/SubCategory';

  products: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];

  id: number | null = null;
  name = '';
  brand = '';
  description = '';
  gender = '';        // ✅ added
  price: number | null = null;
  stockQuantity: number | null = null;
  status = '';

  categoryid: number | null = null;
  subcategoryid: number | null = null;

  imageLocation: string = '';
  selectedFile!: File;

  constructor(private http: HttpClient,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  loadProducts() {
    this.http.get<any[]>(this.productApi).subscribe(res => {
      this.products = res;
      this.cdr.detectChanges();
    });
  }

  loadCategories() {
    this.http.get<any[]>(this.categoryApi).subscribe(res => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

  loadSubCategories(categoryId: number) {
    debugger;
    this.http.get<any[]>(`${this.subCategoryApi}/${categoryId}`).subscribe(res => {
      this.subCategories = res;
      this.cdr.detectChanges();
    });
  }

  getImageUrl(imageLocation: string): string {
    if (!imageLocation) {
      return 'assets/no-image.png';
    }
    if (imageLocation.startsWith('http')) {
      return imageLocation;
    }
    return 'https://localhost:7254' + imageLocation;
  }

  saveProduct() {
    if (!this.name || !this.gender || !this.price || !this.categoryid || !this.subcategoryid) {
      alert('Please fill all required fields.');
      return;
    }

debugger;
    const formData = new FormData();
    formData.append('Name', this.name);
    formData.append('Description', this.description);
    formData.append('Brand', this.brand);
    formData.append('Gender', this.gender); // ✅ added
    formData.append('Price', this.price.toString());
    formData.append('Stockquantity', this.stockQuantity?.toString() || '0');
    formData.append('Status', this.status);
    formData.append('CategoryId', this.categoryid.toString());
    formData.append('SubCategoryId', this.subcategoryid.toString());
    formData.append('DressImage', this.selectedFile);

    if (this.id === null) {
      formData.append('createdby', 'admin');
      this.http.post(this.productApi, formData).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    } else {
      formData.append('UpdatedBy', 'admin');
      formData.append('isactive', 'true');
      this.http.put(`${this.productApi}/${this.id}`, formData).subscribe(() => {
        this.resetForm();
        this.loadProducts();
      });
    }
  }

  editProduct(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.brand = item.brand;
    this.description = item.description;
    this.gender = item.gender; // ✅ added
    this.price = item.price;
    this.stockQuantity = item.stockquantity;
    this.status = item.status;
    this.categoryid = item.categoryId;

    this.loadSubCategories(item.categoryId);
    this.subcategoryid = item.subCategoryId;
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure?')) return;
    this.http.delete(`${this.productApi}/${id}`).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm() {
    this.id = null;
    this.name = '';
    this.brand = '';
    this.description = '';
    this.gender = '';   // ✅ reset
    this.price = null;
    this.stockQuantity = null;
    this.status = '';
    this.categoryid = null;
    this.subcategoryid = null;
    this.subCategories = [];
  }
}
