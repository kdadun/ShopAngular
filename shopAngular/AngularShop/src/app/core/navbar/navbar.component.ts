import { Component, OnInit } from '@angular/core';
import { GlobalApp } from '../../shared/global';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  ifCartNotEmpty = false;
  checkIfExistCart = JSON.parse(localStorage.getItem('cart'));
  constructor(  private router: Router, protected app: GlobalApp, protected authentication: AuthenticationService,
    protected cartService: CartService) { }

  ngOnInit() {
    this.checkCart();
    }

   checkCart() {
     if (this.cartService.cartCount > 0) {
       this.ifCartNotEmpty = true;
     } else if (this.cartService.cartCount == null ) {
        this.ifCartNotEmpty = false;
     }
   }
  Logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRoles');
    this.cartService.cartCount = 0;
    this.router.navigate(['/login']);
  }
}
