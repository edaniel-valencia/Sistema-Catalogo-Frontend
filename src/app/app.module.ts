import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigInComponent } from './sig-in/sig-in.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// TOAST CON ANIMACIONES
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { SharedModule } from './shared/shared.module';  // Importa SharedModule
import { PageComponent } from './page/page.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigInComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SharedModule  
  ],

  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
