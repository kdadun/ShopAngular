import { Component, OnInit } from '@angular/core';
import { CategoriesProductsService } from '../../shared/services/categories-products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../shared/models/products';
import { CartService } from '../../shared/services/cart.service';
import { GlobalApp } from '../../shared/global';
@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  product = new Products();
  constructor(private productsService: CategoriesProductsService, private activeRoute: ActivatedRoute,
    private cartService: CartService, protected app: GlobalApp, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const id = +this.activeRoute.snapshot.params['id'];
    this.productsService.getProductById(id).subscribe((data) => {
     this.product = data;
    });
  }
  addProduct(product: Products) {
      this.cartService.addProductToCart(product);
  }
}
