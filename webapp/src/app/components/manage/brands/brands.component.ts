import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrandService } from '../../../services/brand-service/brand.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-brands',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService = inject(BrandService);
  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getFormBrands();    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getFormBrands(){
    this.brandService.getBrands().subscribe((res: any) => {
      if (res) {
        this.dataSource = new MatTableDataSource(res);
      } else {
        alert("Brands is empty!!!");
      }
    },
    (error) => {
      alert("Error: " + error);
    },
    () =>{

    });
  }

  deleteFormBrand(id: string){
    this.brandService.deleteBrand(id).subscribe((res: any) => {
      alert("Brand is Deleted!!");
    },
    (error) => {
      alert("Error: " + error);
    },
    () => {
      this.getFormBrands();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
