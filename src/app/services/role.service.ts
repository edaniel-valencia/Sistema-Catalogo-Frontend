import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/role';
  }

  readRole(page: number = 1, size: number = 10): Observable<Role[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<Role[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});
  }

  createRole(role: Role): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, role);
  }

  updateRole(role: Role): Observable<any> {    
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${role.Rid}`, role);
  }
  
  deleteRole(role: Role): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${role.Rid}`);
  }
}
