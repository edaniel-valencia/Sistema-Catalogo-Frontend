import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() totalItems: number = 0;  // Total de registros
  @Input() itemsPerPage: number = 10;  // Registros por página
  @Input() currentPage: number = 1;  // Página actual
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  get totalPages(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return pageCount > 1 ? Array(pageCount).fill(0).map((_, i) => i + 1) : [];
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }
  
}
