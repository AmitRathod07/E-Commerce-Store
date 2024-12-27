import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer-service/customer.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  customerService = inject(CustomerService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];

  ngOnInit(){
    this.customerService.getFeaturedProduct().subscribe((result) => {
      this.featuredProducts.push(result);
    });
    this.customerService.getNewProduct().subscribe((result) => {
      this.newProducts.push(result);
    });
    console.log("featured products: ", this.featuredProducts);
    console.log("New products: ", this.newProducts);    
  }
}