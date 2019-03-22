import { Component, OnInit } from '@angular/core';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
import { Categories } from '../../shared/models/categories';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Products } from '../../shared/models/products';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.css']
})
export class CreateProductsComponent implements OnInit {

  constructor(private fB: FormBuilder, private productService: CategoriesProductsService, private router: Router) { }
  categoriesList: Categories[];
  formProducts: FormGroup;
  fileToUpload: File = null;
  binaryValue: any;
  images = new Array<any>();
  ngOnInit() {
    this.formInitBuilder();
    this.displayCategories();
    console.log(this.formProducts);
  }

  displayCategories() {
  this.productService.getCategories().subscribe((data) => {
    this.categoriesList = data;
  });
  }


  onSubmit() {
    const product: Products = {
      Id: null,
      Name: this.formProducts.controls.name.value,
      Description: this.formProducts.controls.description.value,
      Price: this.formProducts.controls.price.value,
      IsNewProduct:   this.formProducts.controls.isNewProduct.value,
      PromotionalProduct: this.formProducts.controls.promotionalProduct.value,
      Image: this.binaryValue,
      CategoryId: this.formProducts.controls.categoryId.value
    };

    this.productService.createProducts(product).subscribe( data => {
      this.router.navigate(['/products']);
    });
  }

  formInitBuilder() {
    this.formProducts = this.fB.group(
      {
          name: ['', Validators.required],
          description: [''],
          price: ['', [Validators.required,  Validators.minLength(1)]],
          isNewProduct: [true],
          promotionalProduct: [true],
          categoryId: ['', Validators.required],
          image: ['', Validators.required]
      });
  }

  uploadImage(file: FileList) {
      this.images = [];
      this.fileToUpload = file.item(0);
      let reader = new FileReader();
      reader.onload = () => {
        this.binaryValue = reader.result;
        this.images.push(this.binaryValue);
        };
      reader.readAsDataURL(this.fileToUpload);
      }
}
