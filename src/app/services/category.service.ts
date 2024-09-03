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

  readCategory(page: number = 1, size: number = 10): Observable<Category[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<Category[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, category);
  }

  updateCategory(category: Category): Observable<any> {    
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${category.Cid}`, category);
  }
  
  deleteCategory(category: Category): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${category.Cid}`);
  }
}
