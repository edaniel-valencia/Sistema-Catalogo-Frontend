import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  listProduct: Product[] = []
  listCategory: Category[] = []
  id?: number;
  name?: string;
  description?: string;
  categoryId?: number;
  status?: number;
  ModalId?: number;

  loading: boolean = false;

  formProduct: FormGroup;
  formProductUpdate: FormGroup;

  currentModalId: number | null = null;
  currentModalType:  'Create' | 'Read' | 'Update' | 'Delete' | null = null;


  // Variables de paginación
  totalItems: number = 0; // Este valor debería venir del backend
  itemsPerPage: number = 10;
  currentPage: number = 1;
  startItem: number = 1;
  endItem: number = 1;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private form: FormBuilder
  ) { 
    this.formProduct = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required]
    })
    this.formProductUpdate = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.readProduct()
    this.readCategory()
  }


  openModal(data: Product | null | undefined, modalId: number, modalType: 'Create' | 'Read' | 'Update' | 'Delete') {
    this.currentModalId = modalId;
    this.currentModalType = modalType;
  
    if (data) {
      this.formProductUpdate.patchValue({
        name: data.Pname,
        description: data.Pdescription,
        status: data.Pstatus,
      });
      this.ModalId = data.Pid;
    } else {
      this.formProductUpdate.reset();
      this.ModalId = 0;
    }
  }

  // openModalCreate(modalType: 'Create') {
  //   this.currentModalType = modalType;
  // }

  closeModal() {
    this.currentModalId = null;
    this.currentModalType = null;
    this.ModalId = 0
  }

  isModalOpen(modalType: 'Create' | 'Read' | 'Update' | 'Delete'): boolean {
    return this.currentModalType === modalType;
  }

  getCategoryName(categoryId: number): string {
    const category = this.listCategory.find(c => c.Cid === categoryId);
    return category?.Cname || 'Categoría desconocida';
  }

  readCategory() {
    this._categoryService.readCategory().subscribe(data => {
      this.listCategory= data
      console.log(data);
    })
  }
 
  readProduct(page: number = 1): void {
    this.currentPage = page;
    this._productService.readProduct().subscribe(data => {
      this.totalItems = data.length;
      this.listProduct = data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
      this.updateItemRange();
    });
  }

  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  changePage(page: number): void {
    this.readProduct(page);
  }

  get totalPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return pageCount > 1 ? Array(pageCount).fill(0).map((_, i) => i + 1) : [];
  }

  
  createProduct() {

    if (this.formProduct.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const product: Product = {
      Pname: this.formProduct.value.name,
      Pdescription: this.formProduct.value.description,
      CategoryId: this.formProduct.value.categoryId,
    };

    console.log(product);
    

    this.loading = true;
    this._productService.createProduct(product).subscribe({
      next: () => {

        this.loading = false;

        this.toastr.success(`Product ${product.Pname} fue registrado exitosamente`, 'Categoria Registrada');
        
        this.readProduct()
        this.closeModal();
        this.formProduct.reset();


      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  updateProduct(ProductId: number) {

    if (this.formProductUpdate.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const product: Product = {
      Pid: ProductId,
      Pname: this.formProductUpdate.value.name,
      Pdescription: this.formProductUpdate.value.description,
      Pstatus: this.formProductUpdate.value.status
    };

    this.loading = true;

    this._productService.updateProduct(product).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Product ${product.Pname} fue actualizado exitosamente`, 'Categoria Actualizada');
        this.readProduct();
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteProduct(ProductId: number) {

    const product: Product = {
      Pid: ProductId
    }

    this.loading = true

    this._productService.deleteProduct(product).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Categoria ${product.Pname} fue eliminado exitosamente", "Categoria Eliminado`)
        this.readProduct()
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => {
        this.loading = false
        console.info('complete')
      }
    })
  }
}
