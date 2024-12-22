import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../../services/category-service/category.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  name!: string;
  id: any;
  isEdit = false;
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(){
  }

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe((res: any) => {
        if (res) {
          this.name = res.name;
        } else {
          alert("The data is not existed in database.")
        }
      });
    }
  }

  goBack(){
    this.router.navigateByUrl("/admin/categories");
  }

  submit(){    
    if (this.name) {
      if (this.isEdit == true) {
        this.categoryService.updateCategory(this.id, this.name).subscribe((response) => {
          alert("Category Updated.");          
        },
        (error)=>{
          alert("Error: " + error);
        },
        ()=>{
          this.goBack();
        });
      } else {
        this.categoryService.addCategory(this.name).subscribe((response) => {
          alert("Category Added.");
          this.goBack();
        },
        (error)=>{
          if (error.status = 400) {
            alert('Category with name "' + this.name + '" already exists.');
          } else {
            alert("Error: " + error);
          }
        });
      }      
    } else {
      alert("Please enter a category name.");
    }
  }

}
