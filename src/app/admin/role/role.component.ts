import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { Role } from 'src/app/interfaces/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  listRole: Role[] = []
  ModalId?: number = 0;
  id?: number;
  name?: string;
  status?: number;

  //variable para la paginacion
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;

  loading: boolean = false;

  form: FormGroup;
  formUpdate: FormGroup;

  currentModalId: number | null = null;
  currentModalType: 'Create' | 'Read' | 'Update' | 'Delete' | null = null;


  constructor(
    private _roleService: RoleService,
    private toastr: ToastrService,
    private router: Router,
    private _errorService: ErrorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    })
    this.formUpdate = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.readRole()
  }

  openModal(data: Role | null | undefined, modalId: number, modalType: 'Create' | 'Read' | 'Update' | 'Delete') {
    this.currentModalId = modalId;
    this.currentModalType = modalType;

    if (data) {
      this.formUpdate.patchValue({
        name: data.Rname,
        status: data.Rstatus
      });
      this.ModalId = data.Rid;
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



  readRole(page: number = 1): void {
    this.currentPage = page;
    this._roleService.readRole(page, this.itemsPerPage).subscribe(data => {
      this.totalItems = data.length;
      this.listRole = data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
    })
  }

  onPageChanged(page: number): void {
    this.readRole(page);
  }

  createRole() {

    if (this.form.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const role: Role = {
      Rname: this.form.value.name,
    };

    this.loading = true;
    this._roleService.createRole(role).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Role ${role.Rname} fue registrado exitosamente`, 'Usuario Registrada');
        this.readRole()
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

  updateRole(RoleId: number) {

    if (this.formUpdate.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const role: Role = {
      Rid: RoleId,
      Rname: this.formUpdate.value.name,
      Rstatus: this.formUpdate.value.status
    };

    this.loading = true;

    this._roleService.updateRole(role).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Role ${role.Rname} fue actualizado exitosamente`, 'Usuario Actualizada');
        this.readRole();
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteRole(RoleId: number) {

    const role: Role = {
      Rid: RoleId
    }

    this.loading = true

    this._roleService.deleteRole(role).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Usuario ${role.Rname} fue eliminado exitosamente", "Usuario Eliminado`)
        this.readRole();
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
