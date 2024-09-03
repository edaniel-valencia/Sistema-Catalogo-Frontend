import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    PaginationComponent  // Declaración solo aquí
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent  // Exportar para que esté disponible en otros módulos
  ]
})
export class SharedModule { }
