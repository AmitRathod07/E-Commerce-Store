import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service/category.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  categoryService = inject(CategoryService);
  categoryList: Category[] = [];

  ngOnInit(){
    this.categoryService.getCategories().subscribe((res)=>{
      this.categoryList = res;
    });
  }
}
