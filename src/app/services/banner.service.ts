import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { Banner } from '../interfaces/banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private myAppUrl: string;
  private myAPIUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environments.endpoint
    this.myAPIUrl = 'api/banner';
  }


  createBanner(banner: Banner, file: File): Observable<any> {
    const formData = new FormData();   
    formData.append('Bdescription', banner.Bdescription || '');
    if (file) {
      formData.append('Bimage', file, file.name);
    }

    return this.http.post(`${this.myAppUrl}${this.myAPIUrl}/create`, formData);
  }

  readBanner(): Observable<Banner[]> {
    const params = new HttpParams()
    return this.http.get<Banner[]>(`${this.myAppUrl}${this.myAPIUrl}/read`, {params});
  }

  readBannerPublic(): Observable<Banner[]> {
    const params = new HttpParams()
    return this.http.get<Banner[]>(`${this.myAppUrl}${this.myAPIUrl}/readPublic`, {params});
  }

  updateBanner(bannerId: number, banner: Banner, file: File): Observable<any> {    
    const formData = new FormData();
    formData.append('Bdescription', banner.Bdescription || '');
    formData.append('Bstatus', banner.Bstatus?.toString() || '0');
    if (file) {
      formData.append('Bimage', file, file.name);
    }
    return this.http.patch(`${this.myAppUrl}${this.myAPIUrl}/update/${bannerId}`, formData);
  }
  
  deleteBanner(banner: Banner): Observable<any> {    
    return this.http.delete(`${this.myAppUrl}${this.myAPIUrl}/delete/${banner.Bid}`);
  }
}
