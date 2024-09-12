import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedComponent } from './shared/shared.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './store/product/product.component';


@NgModule({
  declarations: [
    PageComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SharedComponent,
    ContactComponent,
    AboutComponent,
    TeamComponent,
    StoreComponent,
    ProductComponent
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    PageRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    SharedModule  
  ],
  providers: [],
})
export class PageModule {}
