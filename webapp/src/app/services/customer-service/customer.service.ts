import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { environment_dev } from '../../../environments/environment.development';
import { Category } from '../../types/category';
import { environment } from '../../../environments/environment';
// import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() { }

  getNewProduct(){
    return this.http.get<Product[]>(
      environment_dev.apiurl + '/customer/new-products'
    );
  }

  getFeaturedProduct(){
    return this.http.get<Product[]>(
      environment_dev.apiurl + '/customer/featured-products'
    );
  }

  getCategories(){
    return this.http.get<Category[]>(
      environment_dev.apiurl + '/customer/categories'
    );
  }

  getProducts(searchTerm: string, categoryId: string, sortBy: string, sortOrder: string, brandId: string) {
    return this.http.get<Product[]>(environment.apiurl + `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}`)
  }
}
