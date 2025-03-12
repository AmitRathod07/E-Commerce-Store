import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  customerService = inject(CustomerService);

  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: string = '';
  brandId: string = '';

  ngOnInit() {
    this.customerService.getProducts(this.searchTerm, this.categoryId, this.sortBy, this.sortOrder, this.brandId);
  }
}
// https://www.youtube.com/watch?v=qVHF-WYm_t8&list=PL1fhe5A01vQEGcHsPyQk3otWTrq6b9XXB&index=7&t=1765