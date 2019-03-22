import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/models/products';
import { CategoriesProductsService } from '../shared/services/categories-products.service';
import { GlobalApp } from '../shared/global';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listPromotionalProduct: Products[];
  listNewProducts: Products[];
  cheapProduct: Products;
  page1 = 1;
  page2 = 1;
  constructor(private productsService: CategoriesProductsService , protected app: GlobalApp,
    private cartService: CartService) { }

  ngOnInit() {
    this.PromotionalProducts();
    this.cheapestProduct();
    this.displayNewProducts();
  }
  PromotionalProducts() {
    this.productsService.getPromotionalProducts().subscribe((data) => {
      this.listPromotionalProduct = data;
    });
  }
  displayNewProducts() {
    this.productsService.getNewProducts().subscribe(data => {
      this.listNewProducts = data;
      console.log(this.listNewProducts);
    });
  }
  addProduct(product) {
    this.cartService.addProductToCart(product);
  }
  cheapestProduct() {
    this.productsService.getCheapestProduct().subscribe( (data: Products ) => {
      this.cheapProduct = data;
    });

  }
  whishesList(productId) {
    const userId = localStorage.getItem('id');
    this.cartService.addToWishList(userId, productId).subscribe( () => {
    });
  }
}
