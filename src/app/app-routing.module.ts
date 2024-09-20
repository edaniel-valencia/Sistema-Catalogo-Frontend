import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigInComponent } from './sig-in/sig-in.component';
import { AuthGuard } from './utils/auth.guard';
import { DashboardComponent } from './admin/dashboard.component';
import { HomeComponent } from './admin/home/home.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: SigInComponent},
  
  
  {path: '', component: PageComponent, 
    children:[ { path: '', loadChildren:() => import('./page/page.module').then(m => m.PageModule)} ]
  },
 
  {path: 'dashboard', component: DashboardComponent, 
    children:[ { path: '', loadChildren:() => import('./admin/dashboard.module').then(m => m.DashboardModule)} ]
  },
 
  {path: '**', redirectTo: '/', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
