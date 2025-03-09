import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service/category.service';
import { Category } from '../../types/category';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { CustomerService } from '../../services/customer-service/customer.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  authService = inject(AuthenticationService);
  customerService = inject(CustomerService);
  categoryService = inject(CategoryService);
  categoryList: Category[] = [];
  router = inject(Router);

  ngOnInit(){
    this.customerService.getCategories().subscribe((res)=>{
      this.categoryList = res;
    });
  }

  onSearch(event: any){
    if (event.target.value) {
      this.router.navigateByUrl("/products?search="+event.target.value);
    }
  }

  searchCategory(id: any){
    this.router.navigateByUrl("/products?category="+id);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
