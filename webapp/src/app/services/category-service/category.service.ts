import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../types/category';
import { environment_dev } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  base_url = environment_dev.apiurl;
  
  constructor() { }

  getCategories(){
    return this.http.get<Category[]>(this.base_url + '/category');
  }

  getCategoryById(id: String){
    return this.http.get<Category>(this.base_url + '/category/' + id);
  }

  addCategory(name: String){
    return this.http.post(this.base_url + '/category', { name: name });
  }

  updateCategory(id: String, name: String){
    return this.http.put(this.base_url + '/category/' + id, { name: name });
  }

  deleteCategory(id: String) {
    return this.http.delete(this.base_url + '/category/' + id);
  }
}
