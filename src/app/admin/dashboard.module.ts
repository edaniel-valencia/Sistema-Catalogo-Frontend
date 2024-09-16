import { AfterViewInit, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { initFlowbite } from 'flowbite';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from '../utils/add-token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '../shared/shared.module';
import { BannerComponent } from './banner/banner.component';


@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    RoleComponent,
    DashboardComponent,
    HomeComponent,
    UserComponent,
    BannerComponent,
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
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
})
export class DashboardModule {}
