import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SharedComponent } from './shared/shared.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { StoreComponent } from './store/store.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuard } from '../utils/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'shared', component: SharedComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent},
  { path: 'team', component: TeamComponent},
  { path: 'store', component: StoreComponent},
  { path: 'categories/:Cid', component: ProductComponent },
  { path: 'productsDetail/:Pid', component: ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
