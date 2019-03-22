import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Products } from '../shared/models/products';
import { CartService } from '../shared/services/cart.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
  checkoutProducts: Products[];
  totalCost: number;
  constructor(private formBuilder: FormBuilder, private cartService: CartService,
    private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.formInitBuilder();
    this.cartService.getData().subscribe( data => {
      this.checkoutProducts = data;
    });
    this.cartService.getTotalCost().subscribe( data => {
      this.totalCost = data;
    });
    this.authenticationService.getUserProfile().subscribe((data: any) => {
        this.checkoutForm.setValue({
          firstName: data.FirstName,
          lastName: data.LastName,
          email: data.Email,
          phoneNumber: data.Telephone,
          address: data.Address,
          remarks: ''
        });
    });
  }
  createOrder(checkoutForm: FormGroup) {
    if (checkoutForm) {
        this.cartService.createOrder(checkoutForm.value, this.checkoutProducts, this.totalCost).subscribe( () => {
          localStorage.removeItem('cart');
          this.cartService.cartCount = 0;
          this.router.navigate(['/home']);
        });
    }
  }
  formInitBuilder() {
    this.checkoutForm = this.formBuilder.group(
        {
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          address: ['', Validators.required],
          phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
          email: ['', Validators.email],
          remarks: ['', ]
        });
    }
}
