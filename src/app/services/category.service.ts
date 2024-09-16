import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/category';
  }

  // createCategory(category: Category): Observable<any> {
  //   return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, category);
  // }

  createCategory(category: Category, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('Cname', category.Cname || '');
    formData.append('Cdescription', category.Cdescription || '');
    if (file) {
      formData.append('Cimage', file, file.name);
    }

    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, formData);
  }

  readCategory(page: number = 1, size: number = 10): Observable<Category[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<Category[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});
  }

  readCategoryPublic(): Observable<Category[]> {
    const params = new HttpParams()
    return this.http.get<Category[]>(`${this.myAppUrl}${this.myAPIUrl}/readPublicId`, {params});
  }


  updateCategory(categoryId: number, category: Category, file: File): Observable<any> {    
    const formData = new FormData();
    formData.append('Cname', category.Cname || '');
    formData.append('Cdescription', category.Cdescription || '');
    formData.append('Cstatus', category.Cstatus?.toString() || '0');
    if (file) {
      formData.append('Cimage', file, file.name);
    }
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${categoryId}`, formData);
  }
  
  deleteCategory(category: Category): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${category.Cid}`);
  }
}
