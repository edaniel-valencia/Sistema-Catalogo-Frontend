import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myAPIUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/product';

  }


  readProduct(page: number = 1, size: number = 10): Observable<Product[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    console.log(`${this.myAppUrl}${this.myAPIUrl}/read`);
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});

    //USAR PARA LA PRIMERA PARTE

    // const token = localStorage.getItem('token')
    // const headers = new HttpHeaders().set('Authorization', `Bearer  ${token}`)
    // return this.http.get<Product[]>(`${this.myAppUrl}${this.myAPIUrl}/product/getProducts`, {headers: headers});

    // NETWORK - fetch/xhr - getProduc


  }


  createProduct(product: Product): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, product);
  }

  updateProduct(product: Product): Observable<any> {    
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${product.Pid}`, product);
  }
  
  deleteProduct(product: Product): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${product.Pid}`);
  }


  

  
}
