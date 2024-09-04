import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {


  listUser: User[] = []
  id?: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  credential?: string;
  status?: number;
  repeatUPassword?: string;
  ModalId?: number;

  loading: boolean = false;

  form: FormGroup;
  formUpdate: FormGroup;

  currentModalId: number | null = null;
  currentModalType:  'Create' | 'Read' | 'Update' | 'Delete' | null = null;

  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  startItem: number = 1;
  endItem: number = 1;

  constructor(
    private _userService: UserService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private fb: FormBuilder
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      credential: ['', Validators.required]
    })
    this.formUpdate = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      // password: ['', Validators.required],
      credential: ['', Validators.required],
      status: ['', Validators.required]
      
    })
  }

  ngOnInit(): void {
    this.readUser()
  }

  openModal(data: User | null | undefined, modalId: number, modalType: 'Create' | 'Read' | 'Update' | 'Delete') {
    this.currentModalId = modalId;
    this.currentModalType = modalType;
  
    if (data) {
      this.formUpdate.patchValue({
        name: data.Uname,    
        lastname: data.Ulastname,    
        email: data.Uemail,    
        credential: data.Ucredential,    
        status: data.Ustatus,    
      });
      this.ModalId = data.Uid;
    } else {
      this.formUpdate.reset();
      this.ModalId = 0;
    }
  }


  closeModal() {
    this.currentModalId = null;
    this.currentModalType = null;
    this.ModalId = 0
  }

  isModalOpen(modalType: 'Create' | 'Read' | 'Update' | 'Delete'): boolean {
    return this.currentModalType === modalType;
  }
 
  readUser(page: number = 1): void {
    this.currentPage = page;
    this._userService.readUser().subscribe(data => {
      this.totalItems = data.length;
      this.listUser = data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
      this.updateItemRange();
      console.log(data);    
    });
  }

  updateItemRange(): void {
    this.startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItem = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  changePage(page: number): void {
    this.readUser(page);
  }

  get totalPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return pageCount > 1 ? Array(pageCount).fill(0).map((_, i) => i + 1) : [];
  }

  
  createUser() {

    if (this.form.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const user: User = {
      Uname: this.form.value.name,
      Ulastname: this.form.value.lastname,
      Uemail: this.form.value.email,
      Upassword: this.form.value.password,
      Ucredential: this.form.value.credential
    };

    console.log(user);
    

    this.loading = true;
    this._userService.createUser(user).subscribe({
      next: () => {

        this.loading = false;

        this.toastr.success(`User ${user.Uname} fue registrado exitosamente`, 'Categoria Registrada');
        this.readUser();
        this.closeModal();
        this.form.reset();


      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  updateUser(userId: number) {

    if (this.formUpdate.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const user: User = {
      Uid: userId,
      Uname: this.formUpdate.value.name,
      Ulastname: this.formUpdate.value.lastname,
      Uemail: this.formUpdate.value.email,
      Ucredential: this.formUpdate.value.credential,
      Ustatus: this.formUpdate.value.status
    };

    console.log(user);
    

    this.loading = true;

    this._userService.updateUser(user).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`User ${user.Uname} fue actualizado exitosamente`, 'Categoria Actualizada');
        this.readUser();
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteUser(userId: number) {

    const user: User = {
      Uid: userId
    }

    this.loading = true

    this._userService.deleteUser(user).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Categoria ${user.Uname} fue eliminado exitosamente", "Categoria Eliminado`)
        this.readUser();
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
