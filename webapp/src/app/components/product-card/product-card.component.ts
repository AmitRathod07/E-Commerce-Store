import { Component, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;

  getShortDescription(description: string): string {
    const maxLength = 40; // Adjust the length as needed
    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}... <a href="#" style="color: blue;">See More</a>`;
    }
    
    return description;
  }
}