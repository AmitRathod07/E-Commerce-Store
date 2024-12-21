import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../services/brand-service/brand.service';

@Component({
  selector: 'app-brand-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  name!: string;
  id: any;
  isEdit = false;
  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor(){
  }

  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe((res: any) => {
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
        this.brandService.updateBrand(this.id, this.name).subscribe((response) => {
          alert("Category Updated.");          
        },
        (error)=>{
          alert("Error: " + error);
        },
        ()=>{
          this.goBack();
        });
      } else {
        this.brandService.addBrand(this.name).subscribe((response) => {
          alert("Category Added.");          
        },
        (error)=>{
          alert("Error: " + error);
        },
        ()=>{
          this.goBack();
        });
      }      
    } else {
      alert("Please enter a category name.");
    }
  }
}
