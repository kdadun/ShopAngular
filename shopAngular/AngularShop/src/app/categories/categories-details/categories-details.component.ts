import { Component, OnInit } from '@angular/core';
import { Products } from '../../shared/models/products';
import { ActivatedRoute } from '@angular/router';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
import { Categories } from '../../shared/models/categories';
import { map} from 'rxjs/operator/map';
@Component({
  selector: 'app-categories-details',
  templateUrl: './categories-details.component.html',
  styleUrls: ['./categories-details.component.css']
})
export class CategoriesDetailsComponent implements OnInit {
  listCategories:  Categories[] = [];
  constructor(private activatedRoute: ActivatedRoute,
     private productService: CategoriesProductsService) { }

  ngOnInit() {
   // this.listCategories =  [];
     this.displayProductsByCategoryId();

  }
  displayProductsByCategoryId() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.productService.getCategoriesById(id)
    .subscribe(data => {this.listCategories = data;
      console.log(this.listCategories); });
}

}
