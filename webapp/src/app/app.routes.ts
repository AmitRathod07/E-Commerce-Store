import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/admin-guard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';

export const routes: Routes = [
    // { path:"", redirectTo: "/home", pathMatch: "full" },
    { path:"", component: HomeComponent, canActivate: [authGuard]},
    { path:"register", component: RegisterComponent},
    { path:"login", component: LoginComponent},
    { path:"admin", component: AdminDashboardComponent, canActivate: [adminGuard]},
    { path:"admin/categories", component: CategoriesComponent, canActivate: [adminGuard]},
    { path:"admin/categories/add", component: CategoryFormComponent, canActivate: [adminGuard]},
    { path:"admin/categories/edit/:id", component: CategoryFormComponent, canActivate: [adminGuard]},
    { path:"admin/brands", component: BrandsComponent, canActivate: [adminGuard]},
    { path:"admin/brands/add", component: BrandFormComponent, canActivate: [adminGuard]},
    { path:"admin/brands/edit/:id", component: BrandFormComponent, canActivate: [adminGuard]},
    { path:"admin/products", component: ProductsComponent, canActivate: [adminGuard]},
    { path:"admin/products/add", component: ProductFormComponent, canActivate: [adminGuard]},
    { path:"admin/products/edit/:product_id", component: ProductFormComponent, canActivate: [adminGuard]},
    { path:"products", component: ProductsComponent, canActivate: [authGuard]},
    { path:"product/:id", component: ProductDetailComponent, canActivate: [authGuard]},
    { path:"profile", component: CustomerProfileComponent, canActivate: [authGuard]},
];
