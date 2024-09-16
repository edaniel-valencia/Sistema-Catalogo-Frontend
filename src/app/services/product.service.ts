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

  readProductPublic(categoryId: number): Observable<Product[]> {
  const params = new HttpParams().set('categoryId', categoryId.toString());
  return this.http.get<Product[]>(`${this.myAppUrl}${this.myAPIUrl}/category/${categoryId}`, { params });
}


  createProduct(product: Product, file: File): Observable<any> {
    const data = new FormData();
    data.append('Pname', product.Pname || '');
    data.append('Pdescription', product.Pdescription || '');
    data.append('Pprice', product.Pprice!.toString()  );
    if (file) {
      data.append('Pimage', file, file.name);
    }
    data.append('CategoryId', product.CategoryId!.toString()  );
    console.log(data);
    
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, data);
  }

  updateProduct(productId: number, product: Product,  file: File): Observable<any> {   
    const data = new FormData();
    data.append('Pname', product.Pname || '');
    data.append('Pdescription', product.Pdescription || '');
    data.append('Pprice', product.Pprice!.toString() );
    if (file) {
      data.append('Pimage', file, file.name);
    } 
    data.append('CategoryId', product.CategoryId!.toString()  );

    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${productId}`, data);
  }
  
  deleteProduct(product: Product): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${product.Pid}`);
  }


  

  
}
