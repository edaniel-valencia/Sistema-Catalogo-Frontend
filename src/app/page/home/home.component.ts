import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner';
import { Category } from 'src/app/interfaces/category';
import { BannerService } from 'src/app/services/banner.service';
import { CategoryService } from 'src/app/services/category.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showCategoriesLimit = 5;  // Mostrará solo 4 categorías inicialmente
  showAllCategories = false;

  listBanner: Banner[] = []
  listCategory: Category[] = []

  myAppUrl: string = environments.endpoint;
  myAPIUrlBanner: string = 'static/banner/';
  myAPIUrlCaregory: string = 'static/image/';


  baseUrlBanner: string = this.myAppUrl + this.myAPIUrlBanner; // Asegúrate de que esta URL sea correcta
  baseUrlCategory: string = this.myAppUrl+this.myAPIUrlCaregory; // Asegúrate de que esta URL sea correcta

  constructor(
    private _bannerService: BannerService,
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.readBannerPublic()
    this.readCategoryPublic()

  }
  readBannerPublic(): void {
    this._bannerService.readBannerPublic().subscribe(data => {
      this.listBanner = data
      // console.log(data);
    })
  }

  
  toggleShowAllCategories() {
    // Cambia el estado de mostrar todas las categorías o solo 4
    this.showAllCategories = !this.showAllCategories;
    this.showCategoriesLimit = this.showAllCategories ? this.listCategory.length : 5;
  }

  readCategoryPublic() {
    this._categoryService.readCategory().subscribe(data => {
      this.listCategory = data
      console.log(data);
    })
  }
  
}
