import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment_dev } from '../../../environments/environment.development';
import { Product } from '../../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);
  base_url = environment_dev.apiurl;

  constructor() { }

  getProducts(){
    return this.http.get<Product[]>(`${this.base_url}/product`);
  }
  addProduct(payload: Product){
    return this.http.post(`${this.base_url}/product`, payload);
  }
  getProductById(product_id: string){
    return this.http.get<Product[]>(`${this.base_url}/product/${product_id}`);
  }
  updateProduct(product_id: string, payload: Product){
    return this.http.put(`${this.base_url}/product/${product_id}`, payload);
  }
  deleteProduct(product_id: string){
    return this.http.delete(`${this.base_url}/product/${product_id}`);
  }
}
