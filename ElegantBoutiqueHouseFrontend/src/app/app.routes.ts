import { Routes } from '@angular/router';
import { RegistrationComponent } from './Component/registration/registration';
import { LoginComponent } from './Component/login/login';
import { AdminDashboardComponent } from './Admin/admin-dash-board/admin-dash-board';
import { CategoryAdminComponent } from './Admin/category/category';
import { AdminUserListComponent } from './Admin/user-list/user-list';
import { Userform } from './Admin/user-form/user-form';
import { SubCategoryComponent } from './Admin/admin-sub-category/admin-sub-category';
import { NavbarComponent } from './Component/navbar/navbar';  
  import { FooterComponent } from './Component/footer/footer';
import { HomeComponent } from './Component/homecarousel/homecarousel';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'admin/category', component: CategoryAdminComponent },
  { path: 'admin/users', component: AdminUserListComponent } ,
  {path: 'admin/users/add', component: Userform } ,
  { path: 'admin/subcategory', component: SubCategoryComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'home', component: HomeComponent },
  { path: 'footer', component: FooterComponent }

];
