import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/auth';
    
  }

  login(user: User): Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myAPIUrl}/login`, user);
  }


  signin(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/register`, user);
  }
  
  
}
