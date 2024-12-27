import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../types/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() { }

  getNewProduct(){
    return this.http.get<Product>("http://myshop.test/customer/new-products");
  }

  getFeaturedProduct(){
    return this.http.get<Product>("http://myshop.test/customer/featured-products");
  }
}
