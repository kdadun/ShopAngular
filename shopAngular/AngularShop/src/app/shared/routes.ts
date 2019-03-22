import { HomeComponent } from '../home/home.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { NotFoundComponent } from '../home/not-found/not-found.component';
import { CategoriesComponent } from '../categories/categories.component';
import { ProductsComponent } from '../products/products.component';
import { CreateCategoriesComponent } from '../categories/create-categories/create-categories.component';
import { CreateProductsComponent } from '../products/create-products/create-products.component';
import { ProductsDetailsComponent } from '../products/products-details/products-details.component';
import { CategoriesDetailsComponent } from '../categories/categories-details/categories-details.component';
import { AuthGuard } from './authGuard';
import { CartComponent } from '../cart/cart.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AccountComponent } from '../account/account.component';
import { ChangeOrderStateComponent } from '../account/change-order-state/change-order-state.component';

export const appRoutes: Routes = [


  { path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'create-categories',
    component: CreateCategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categories-details/:id',
    component: CategoriesDetailsComponent
  },
  {
    path: 'products-details/:id',
    component: ProductsDetailsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'change-order',
    component: ChangeOrderStateComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'create-products',
    component: CreateProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent

  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'

  },

];
