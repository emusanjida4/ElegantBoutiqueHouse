import { Routes } from '@angular/router';
import { RegistrationComponent } from './Component/registration/registration';
import { LoginComponent } from './Component/login/login';
import { AdminDashboardComponent } from './Admin/admin-dash-board/admin-dash-board';
import { CategoryAdminComponent } from './Admin/category/category';
import { AdminUserListComponent } from './Admin/user-list/user-list';
import { Userform } from './Admin/user-form/user-form';
import { SubCategoryComponent } from './Admin/admin-sub-category/admin-sub-category';
import { FooterComponent } from './Component/footer/footer';


import { NavbarCategoryComponent } from './Component/navbar/navbar';

import { HomeComponent } from './Component/homecarousel/homecarousel';
import { AdminProductComponent } from './Admin/admin-product/admin-product';
import { UserProduct } from './User/user-product/user-product';

export const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: AdminUserListComponent },
      { path: 'users/add', component: Userform },
      { path: 'products', component: AdminProductComponent },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'subcategory', component: SubCategoryComponent }
    ]
  },

  { path: 'navbar', component: NavbarCategoryComponent ,
    children: [
      {path: 'userproduct', component: UserProduct},
        { path: 'home', component: HomeComponent },
    ]
      
  },

  // {path: 'userproduct', component: UserProduct},

];
