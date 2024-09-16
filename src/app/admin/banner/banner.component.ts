import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Banner } from 'src/app/interfaces/banner';
import { BannerService } from 'src/app/services/banner.service';
import { ErrorService } from 'src/app/services/error.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  listBanner: Banner[] = []
  ModalId?: number = 0;
  id?: number;
  description?: string;
  status?: number;

  loading: boolean = false;

  formBanner: FormGroup;
  formBannerUpdate: FormGroup;

  currentModalId: number | null = null;
  currentModalType:  'Create' | 'Read' | 'Update' | 'Delete' | null = null;
  
  photoSelected: string | ArrayBuffer | null = null;;
  file: File | null = null;

  myAppUrl: string = environments.endpoint;
  myAPIUrl: string = 'static/banner/';

  baseUrl: string = this.myAppUrl+this.myAPIUrl; // Asegúrate de que esta URL sea correcta

  constructor(
    private _bannerService: BannerService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private form: FormBuilder,

  ) {
    
   
    this.formBanner = this.form.group({
      description: ['', Validators.required]
    })
    this.formBannerUpdate = this.form.group({
      description: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.readBanner()
  }
  
  openModal(data: Banner | null | undefined, modalId: number, modalType: 'Create' | 'Read' | 'Update' | 'Delete') {
    this.currentModalId = modalId;
    this.currentModalType = modalType;
  
    if (data) {
      this.formBannerUpdate.patchValue({
        description: data.Bdescription,
        status: data.Bstatus,
      });
      this.ModalId = data.Bid;
    } else {
      this.formBannerUpdate.reset();
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

  readBanner(): void {
    this._bannerService.readBanner().subscribe(data => {
      this.listBanner = data
      console.log(data);
    })
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




  createBanner() {

    if (this.formBanner.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const banner: Banner = {
      Bdescription: this.formBanner.value.description,
    };

    if (!this.file) {
      this.toastr.error('Por favor, selecciona una imagen', 'Error');
      return;
    }
  
    this.loading = true;
    this._bannerService.createBanner(banner, this.file).subscribe({
      
      next: () => {

        this.loading = false;

        this.toastr.success(`Banner, fue registrado exitosamente`, 'Banner Registrada');
        // this.router.navigate(['/admin/Banner/listBanner']);
        this.readBanner()
        this.closeModal();
        this.formBanner.reset();


      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  updateBanner(bannerId: number) {

    if (this.formBannerUpdate.invalid) {
      this.toastr.error('Por favor, llena todos los campos requeridos', 'Error');
      return;
    }

    const Banner: Banner = {
      Bid: bannerId,
      Bdescription: this.formBannerUpdate.value.description,
      Bstatus: this.formBannerUpdate.value.status
    };

  
    this.loading = true;

    this._bannerService.updateBanner(bannerId, Banner, this.file!).subscribe({
      next: () => {
        this.loading = false;
        this.toastr.success(`Banner, fue actualizado exitosamente`, 'Banner Actualizada');
        this.readBanner();
        this.closeModal();

      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(e);
      },
      complete: () => console.info('complete'),
    });
  }

  deleteBanner(bannerId: number) {

    const Banner: Banner = {
      Bid: bannerId
    }

    this.loading = true

    this._bannerService.deleteBanner(Banner).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Banner, fue eliminado exitosamente", "Banner Eliminado`)
        // this.router.navigate(['/admin/Banner/listBanner'])
        this.readBanner()

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
