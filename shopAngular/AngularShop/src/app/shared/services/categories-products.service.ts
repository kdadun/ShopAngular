import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders   } from '@angular/common/http';
import { Categories } from '../models/categories';
import 'rxjs/add/operator/map';
import { Products } from '../models/products';
import { Rating } from '../models/rating';

@Injectable()
export class CategoriesProductsService {

  constructor(private http: HttpClient) { }
  products: Products;
  createCategories(name: string) {
    const body = JSON.stringify({'Name': name});
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:61085/api/Categories/AddCategories', body, {headers: reqHeader});
  }
  getCategories() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Categories[]>('http://localhost:61085/api/Categories/allCategories', {headers: headers, responseType: 'json'});
  }

  getCategoriesById(id) {
    return this.http.get<Categories[]>('http://localhost:61085/api/Categories/GetCategoriesById/' + id)
     .map((data: any) => data.Products );
  }

  deleteCategories(id) {
    return this.http.delete('http://localhost:61085/api/Categories/DeleteCategories/' + id);
  }


  // ---------------------------------------------------Products--------------------------------------------------
  createProducts(products) {
    console.log(products);
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:61085/api/Products/AddProducts', products /* {headers: reqHeader}*/);
  }

  getProducts() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Products[]>('http://localhost:61085/api/Products/allProducts');
  }
  getPromotionalProducts() {
    return this.http.get<Products[]>('http://localhost:61085/api/Products/allProducts')
    .map( products => products.filter(product => product.PromotionalProduct === true));
  }
  getNewProducts() {
    return this.http.get<Products[]>('http://localhost:61085/api/Products/allProducts')
    .map( products => products.filter(product => product.IsNewProduct === true));
  }
  searchProduct() {
    return this.http.get<Products[]>('http://localhost:61085/api/Products/allProducts');
    }
  getCheapestProduct() {
    return this.http.get<Products[]>('http://localhost:61085/api/Products/allProducts')
    .map(products => products.sort((a, b) => a.Price - b.Price)[0]);
  }
  getProductById(id) {
    return this.http.get<Products>('http://localhost:61085/api/Products/GetProductsById/' + id);
  }
  getProductByCartId(id) {
    return this.http.get<Products[]>('http://localhost:61085/api/Products/GetProductsById/' + id);
  }

  addComment(productId, rate, comment) {

  let rating: Rating = {
    UserId: localStorage.getItem('id'),
    ProductId: productId,
    Username: localStorage.getItem('userName'),
    Rate: rate,
    Comment: comment,
    DateCreated: null
  };
     return this.http.post('http://localhost:61085/api/Products/AddComment', rating);
  }
  getComment() {
    return this.http.get<Rating[]>('http://localhost:61085/api/Products/GetComments');
  }
}
