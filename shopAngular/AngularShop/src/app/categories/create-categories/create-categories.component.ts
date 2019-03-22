import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
import { Router } from '@angular/router';
import { Categories } from '../../shared/models/categories';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.css']
})
export class CreateCategoriesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private categoriesServive: CategoriesProductsService,
   private router: Router) { }
   showError = false;
  formCategories: FormGroup;
  categories: Categories;

  ngOnInit() {
    this.formInitBuilder();
  }

  OnSubmit(name) {
  this.categoriesServive.createCategories(name).subscribe( () => {
    this.router.navigate(['/categories']);
  },
  () => {
      this.showError = true;
  }
  );
  }
  formInitBuilder() {
    this.formCategories = this.formBuilder.group({
      name: new FormControl('', [ Validators.required, Validators.minLength(2)])
    });
  }
  close() {
    this.showError = false;
  }
}
