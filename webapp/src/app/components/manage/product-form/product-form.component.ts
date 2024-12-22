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
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterLink
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
      this.getProduct();
    } else {
      this.addImage();
    }    
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
  }

  getProduct(){
    this.isEdit = true;
    this.productService.getProductById(this.product_id).subscribe((product: any) => {
      if (product) {
        this.productForm.patchValue({
          name: product.name,
          shortDescription: product.shortDescription,
          description: product.description,
          Price: product.Price,
          discount: product.discount,
          categoryId: product.categoryId,
          brandId: product.brandId
        });
        if (product.images.length > 0) {
          this.images.clear();
          for (const imageUrl of product.images) {
            this.addImage(imageUrl);
          }
        }
      } else {
        alert("This product could not be found");
      }
    },
    (error)=>{
      alert("Error: " + error);
    });
  }

  addImage(imageUrl?: string) {
    this.images.push(this.formBuilder.control(imageUrl || null));
  }

  removeImage(){
    this.images.removeAt(this.images.controls.length - 1);
  }

  goBack(){
    this.router.navigateByUrl("/admin/products");
  }

  submit() {
    if (this.productForm.valid) {
      let value = this.productForm.value;
      if (this.isEdit) {
        this.productService.updateProduct(this.product_id, value as any).subscribe((res)=>{
          alert("Product updated");
        },
        (error)=>{
          alert("Error: " + error);
        },
        ()=>{
          this.goBack();
        })
      } else {        
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
  }
}
