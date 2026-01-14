import { Routes } from '@angular/router';

import { RegistrationComponent } from './Component/registration/registration';
import { LoginComponent } from './Component/login/login';

import { AdminDashboardComponent } from './Admin/admin-dash-board/admin-dash-board';
import { CategoryAdminComponent } from './Admin/category/category';
import { AdminUserListComponent } from './Admin/user-list/user-list';
import { Userform } from './Admin/user-form/user-form';
import { SubCategoryComponent } from './Admin/admin-sub-category/admin-sub-category';
import { AdminProductComponent } from './Admin/admin-product/admin-product';

import { NavbarCategoryComponent } from './Component/navbar/navbar';
import { HomeComponent } from './Component/homecarousel/homecarousel';
import { UserProduct } from './User/user-product/user-product';
import { AddToCartComponent } from './User/user-product/add-to-cart/add-to-cart';
import { OrderComponent } from './User/user-order/user-order';
import { CustomerProfileComponent } from './User/user-profile/user-profile';
import { StockAdminComponent } from './Admin/admin-stock/admin-stock';
import { AdminOrderComponent } from './Admin/admin-order/admin-order';
import { AboutUsComponent } from './Component/about-us/about-us';
import { OrderDetailsComponent } from './Admin/order-details-component/order-details-component';
import { UserInvoice } from './User/user-invoice/user-invoice';

export const routes: Routes = [

  {
path: '', redirectTo: '/navbar', pathMatch: 'full'
  },
  /* ✅ App start → Home page */
  {
    path: 'navbar',
    component: NavbarCategoryComponent,
    children: [
      { path: '', component: HomeComponent },   // default home
      { path: 'home', component: HomeComponent },
      { path: 'userproduct', component: UserProduct },
       { path: 'cart', component: AddToCartComponent },
       { path: 'checkout', component: OrderComponent },
       { path: 'profile', component: CustomerProfileComponent },
       { path: 'about', component: AboutUsComponent },
       {path: 'invoice', component: UserInvoice}
    
    ]
  },

  /* ✅ Auth pages */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },

  /* ✅ Admin (unchanged) */
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users', component: AdminUserListComponent },
      { path: 'users/add', component: Userform },
      { path: 'products', component: AdminProductComponent },
      { path: 'category', component: CategoryAdminComponent },
      { path: 'subcategory', component: SubCategoryComponent },
      { path: 'stock', component: StockAdminComponent },
      {path: 'orders', component: AdminOrderComponent},
  { path: 'order-details/:id', component: OrderDetailsComponent },

    ]
  },
  { path: 'order', component: OrderComponent }
  

];
