import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Products } from '../shared/models/products';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authentication: AuthenticationService) { }
  formLogin: FormGroup;
  showError = false;
  product: Products[] = [];

  ngOnInit() {
    this.formInitBuilder();
  }

  formInitBuilder() {
    this.formLogin = this.formBuilder.group ({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [ Validators.required, Validators.minLength(3)]),
  });
 }

 onSubmit(username, password) {
  this.authentication.userAuthentication(username, password).
      subscribe((data: any) => {
        localStorage.setItem('id', JSON.parse(data.id));
        localStorage.setItem('userToken', JSON.stringify(data.access_token));
        localStorage.setItem('userName', username);
        localStorage.setItem('userRoles', JSON.stringify(data.role));
        localStorage.setItem('cart', JSON.stringify(this.product) );
        this.router.navigate(['/home']);
      },
      () => {
        console.log('Login Failed');
        this.showError = true;
      }
      );
 }
  close() {
    this.showError = false;
  }
}
