import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Brand } from '../../types/brand';
import { environment_dev } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);
  base_url = environment_dev.apiurl;

  constructor() { }

  getBrands(){
    return this.http.get<Brand[]>(this.base_url + '/brand');
  }

  getBrandById(id: String){
    return this.http.get<Brand>(this.base_url + '/brand/' + id);
  }

  addBrand(brand_name: String){
    return this.http.post(this.base_url + '/brand', { name: brand_name });
  }

  updateBrand(id: String, brand_name: String){
    return this.http.put(this.base_url + '/brand/' + id, { name: brand_name });
  }

  deleteBrand(id: String) {
    return this.http.delete(this.base_url + '/brand/' + id);
  }
}
