import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { appRoutes } from './shared/routes';
import { CoreModule } from './core/core.module';
import { AuthenticationService } from './shared/services/authentication.service';
import { GlobalApp } from './shared/global';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';
import { CategoriesProductsService } from './shared/services/categories-products.service';
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { FileValueAccessorDirective } from './shared/file-value-accessor-directive.directive';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { AuthGuard } from './shared/authGuard';
import { CartComponent } from './cart/cart.component';
import { CartService } from './shared/services/cart.service';
import { CartResolve } from './shared/cartResolve';
import { CalculateCostCartComponent } from './cart/calculate-cost-cart/calculate-cost-cart.component';
import { CommonModule } from '@angular/common';
import { FiltersproductComponent } from './products/filtersproduct/filtersproduct.component';
import { SortingNavbarComponent } from './products/sorting-navbar/sorting-navbar.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { ChangeOrderStateComponent } from './account/change-order-state/change-order-state.component';
import { KeysPipe } from './shared/keyspipe';
import { RatingStarComponent } from './products/rating-star/rating-star.component';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    CategoriesComponent,
    ProductsComponent,
    CreateCategoriesComponent,
    CreateProductsComponent,
    FileValueAccessorDirective,
    ProductsDetailsComponent,
    CategoriesDetailsComponent,
    CartComponent,
    CalculateCostCartComponent,
    FiltersproductComponent,
    SortingNavbarComponent,
    CheckoutComponent,
    AccountComponent,
    ChangeOrderStateComponent,
    KeysPipe,
    RatingStarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    NgxPaginationModule
  ],
  exports: [KeysPipe],
  providers: [AuthenticationService, CategoriesProductsService, CartService, GlobalApp, AuthGuard, CartResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
