import { CartService } from './services/cart.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Products } from './models/products';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartResolve implements Resolve<Products[]> {

  constructor(private cartService: CartService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.cartService.getCartProducts();

  }
}
