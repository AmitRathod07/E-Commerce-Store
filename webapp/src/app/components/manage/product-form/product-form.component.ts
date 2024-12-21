import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category-service/category.service';
import { BrandService } from '../../../services/brand-service/brand.service';
import { ProductService } from '../../../services/product-service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{

  product_id: any;
  isEdit = false;
  formBuilder = inject(FormBuilder);
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brands:Brand[]=[];
  categories:Category[]=[];

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    Price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]]
  });

  get images(){
    return this.productForm.get('images') as FormArray;
  }
  
  ngOnInit(): void {
    this.product_id = this.route.snapshot.params["product_id"];
    if (this.product_id) {
      this.isEdit = true;
      this.productService.getProductById(this.product_id).subscribe((product: any) => {
        if (product) {
          let formValue = this.productForm.value;
          formValue.name = product.name;
          formValue.shortDescription = product.shortDescription;
          formValue.description = product.description;
          
        } else {
          
        }
      });
    }

    this.addImage();
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }

  removeImage(){
    this.images.removeAt(this.images.controls.length - 1);
  }

  goBack(){
    this.router.navigateByUrl("/admin/products");
  }

  submit() {
    let value = this.productForm.value;
    this.productService.addProduct(value as any).subscribe((result) => {
      alert("Product Added");
    },
    (error)=>{
      alert("Error: " + error);
    },
    ()=>{
      this.goBack();
    });
  }
}
