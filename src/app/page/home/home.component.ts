import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner';
import { BannerService } from 'src/app/services/banner.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listBanner: Banner[] = []

  myAppUrl: string = environments.endpoint;
  myAPIUrl: string = 'static/banner/';

  baseUrl: string = this.myAppUrl + this.myAPIUrl; // Asegúrate de que esta URL sea correcta
  constructor(
    private _bannerService: BannerService,
  ) { }

  ngOnInit(): void {
    this.readBannerPublic()
  }
  readBannerPublic(): void {
    this._bannerService.readBannerPublic().subscribe(data => {
      this.listBanner = data
      // console.log(data);
    })
  }

  
}
