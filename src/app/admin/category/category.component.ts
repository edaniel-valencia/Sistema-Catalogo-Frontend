import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { ErrorService } from 'src/app/services/error.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  listCategory: Category[] = []
  ModalId?: number = 0;
  id?: number;
  name?: string;
  description?: string;
  status?: number;


  //variable para la paginacion
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading: boolean = false;

  formCategory: FormGroup;
  formCategoryUpdate: FormGroup;

  currentModalId: number | null = null;
  currentModalType:  'Create' | 'Read' | 'Update' | 'Delete' | null = null;
  
  photoSelected: string | ArrayBuffer | null = null;;
  file: File | null = null;

  
  
  myAppUrl: string = environments.endpoint;
  myAPIUrl: string = 'static/image/';

  baseUrl: string = this.myAppUrl+this.myAPIUrl; // Asegúrate de que esta URL sea correcta

  constructor(
    private _categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private form: FormBuilder,

  ) {
    
   
    this.formCategory = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
    this.formCategoryUpdate = this.form.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.readCategory()
  }


  
  openModal(data: Category | null | undefined, modalId: number, modalType: 'Create' | 'Read' | 'Update' | 'Delete') {
    this.currentModalId = modalId;
    this.currentModalType = modalType;
  
    if (data) {
      this.formCategoryUpdate.patchValue({
        name: data.Cname,
        description: data.Cdescription,
        status: data.Cstatus,
      });
      this.ModalId = data.Cid;
    } else {
      this.formCategoryUpdate.reset();
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


  // readCategory(page: number = 1): void {
  //   this.currentPage = page;
  //   this._categoryService.readCategory(page, this.itemsPerPage).subscribe(data => {
  //     this.totalItems = data.length;
  //     this.listCategory = data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
  //   });
  // }

  readCategory(page: number = 1): void {
    this.currentPage = page;
    this._categoryService.readCategory(page, this.itemsPerPage).subscribe(data => {
      this.totalItems = data.length;
      this.listCategory = data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
      console.log(data);
    });

    
  }

  onPageChanged(page: number): void {
    this.readCategory(page);
  }


  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }




  createCategory() {

    if (this.formCategory.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const category: Category = {
      Cname: this.formCategory.value.name,
      Cdescription: this.formCategory.value.description,
    };

    if (!this.file) {
      this.toastr.error('Por favor, selecciona una imagen', 'Error');
      return;
    }
  
    this.loading = true;
    this._categoryService.createCategory(category, this.file).subscribe({
      
      next: () => {

        this.loading = false;

        this.toastr.success(`Category ${category.Cname} fue registrado exitosamente`, 'Categoria Registrada');
        // this.router.navigate(['/admin/category/listCategory']);
        this.readCategory()
        this.closeModal();
        this.formCategory.reset();


      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  updateCategory(categoryId: number) {

    if (this.formCategoryUpdate.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const category: Category = {
      Cid: categoryId,
      Cname: this.formCategoryUpdate.value.name,
      Cdescription: this.formCategoryUpdate.value.description,
      Cstatus: this.formCategoryUpdate.value.status
    };

  
    this.loading = true;

    this._categoryService.updateCategory(categoryId, category, this.file!).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Category ${category.Cname} fue actualizado exitosamente`, 'Categoria Actualizada');
        this.readCategory();
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteCategory(categoryId: number) {

    const category: Category = {
      Cid: categoryId
    }

    this.loading = true

    this._categoryService.deleteCategory(category).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Categoria ${this.name} fue eliminado exitosamente", "Categoria Eliminado`)
        // this.router.navigate(['/admin/category/listCategory'])
        this.readCategory()

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
