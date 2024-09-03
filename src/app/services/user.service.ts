import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/user';
    
  }

  signIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/register`, user);
  }
  login(user: User): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myAPIUrl}/login`, user);
  }
  
  readUser(page: number = 1, size: number = 10): Observable<User[]> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());
    return this.http.get<User[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, user);
  }

  updateUser(user: User): Observable<any> {    
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${user.Uid}`, user);
  }
  
  deleteUser(user: User): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${user.Uid}`);
  }
}
