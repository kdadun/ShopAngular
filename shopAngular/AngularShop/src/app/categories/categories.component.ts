import { Component, OnInit } from '@angular/core';
import { CategoriesProductsService } from '../shared/services/categories-products.service';
import { Categories } from '../shared/models/categories';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesProductsService, protected authentication: AuthenticationService,
   private router: Router) { }
  categoriesList: Categories[];
  ngOnInit() {
    this.displayCategories();
  }
  displayCategories() {
    this.categoriesService.getCategories().subscribe((data) => {
     this.categoriesList = data;
     console.log(this.categoriesList);
    });
  }
  onDelete(id) {
    if (confirm('Are you sure to delete this categories?') === true) {
      this.categoriesService.deleteCategories(id).subscribe(() => {
       this.router.navigate(['/categories']);
      });
    }
  }
}
