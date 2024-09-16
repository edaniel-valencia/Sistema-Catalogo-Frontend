import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Email } from 'src/app/interfaces/email';
import { EmailService } from 'src/app/services/email.service';
import { ErrorService } from 'src/app/services/error.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {

  title: string = "Contacto"
  name?: string;
  lastname?: string;
  whatssap?: string;
  email?: string;
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  form: FormGroup;

  loading: boolean = false;

  private myAppUrl: string;
  private myAPIUrl: string;

 

  constructor(
    private toastr: ToastrService,
    private _emailService: EmailService,
    private router: Router,
    private _errorService: ErrorService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {    
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/category';
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      whatssap: ['', Validators.required],
      email: ['', Validators.required],
      subject: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  sendEmail() {

    //VALIDAR EL FORMULARIO

    if (this.form.invalid) {
      this.toastr.error('Todos los campos son obligatorios!', 'Error');
      return
    }

    //CREAR EL OBJETO

    const email: Email = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      whatssap: this.form.value.whatssap,
      email: this.form.value.email,
      subject: this.form.value.subject
    }

    // console.log(email);
    

    this.loading = true

   

    this._emailService.sendEmail(email).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`Correo enviado exitosamente", "Correo Enviado`)
        // this.router.navigate(['/logIn'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._errorService.msgError(e)
      },
      complete: () => console.info('complete')
    })
  }
  
}
