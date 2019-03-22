import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Products } from '../shared/models/products';
import { CartService } from '../shared/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Products[];
  constructor( private cartService: CartService) { }
  ngOnInit() {
    this.getCart();
  }

  getCart() {
  this.cartProducts = this.cartService.getCartProducts();
  this.cartService.setData(this.cartProducts);
  }

  removeProduct(product: Products) {
    this.cartService.removeProductFromCart(product);
    this.getCart();
  }
}
