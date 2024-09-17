import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
  
  listProduct: Product[] = [];
  listCategory: Category[] = [];
  selectedCategoryId: number | null = null;
  categoryName?: string = ''; // Variable para almacenar el nombre de la categoría

  myAppUrl: string = environments.endpoint;
  myAPIUrlProduct: string = 'static/product/';
  myAPIUrlDefault: string = 'static/default/Product-default.png';
  baseUrlProduct: string = this.myAppUrl + this.myAPIUrlProduct;
  baseUrlDefault: string = this.myAppUrl + this.myAPIUrlDefault;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Cargar las categorías primero y luego cargar los productos y el nombre de la categoría
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.selectedCategoryId = Number(params.get('Cid')); // Obtén el ID de la categoría desde la URL
          return this._categoryService.readCategory(); // Primero, obtener las categorías
        })
      )
      .subscribe(categories => {
        this.listCategory = categories;
        if (this.selectedCategoryId) {
          // Obtener el nombre de la categoría seleccionada
          this.getCategoryName(this.selectedCategoryId);
          // Leer productos basados en la categoría seleccionada
          this.readProductPublic(this.selectedCategoryId);
        }
      });
  }

  // Método para obtener el nombre de la categoría
  getCategoryName(categoryId: number): void {
    const category = this.listCategory.find(c => c.Cid === categoryId);
    this.categoryName = category ? category.Cname : 'Categoría desconocida';
  }

  // Leer productos basados en la categoría
  readProductPublic(categoryId: number): void {
    this._productService.readProductPublic(categoryId).subscribe(data => {
      this.listProduct = data;
      console.log(data);
    });
  }
}

