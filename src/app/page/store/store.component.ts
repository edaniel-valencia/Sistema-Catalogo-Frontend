import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  listCategory: Category[] = []

  myAppUrl: string = environments.endpoint;
  myAPIUrl: string = 'static/image/';

  baseUrl: string = this.myAppUrl+this.myAPIUrl; // Asegúrate de que esta URL sea correcta

  constructor(
    private _categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.readCategoryPublic()
  }

  readCategoryPublic() {
    this._categoryService.readCategory().subscribe(data => {
      this.listCategory = data
      console.log(data);
    })
  }
}

