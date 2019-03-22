import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { WishList } from '../models/wishList';

@Injectable()
export class CartService {

  private cartSubjectList = new ReplaySubject<Products[]>(1);
  private totalCostSubject = new ReplaySubject<number>(1);
  currentTotalCost = this.totalCostSubject.asObservable();
  currentSubjectList = this.cartSubjectList.asObservable();
  orders: Order[];
  card: Products[];
  public cartCount = 0;
  constructor(private http: HttpClient) {}

    setData(cartList: Products[]) {
      this.cartSubjectList.next(cartList);
    }
    setTotalCost(totalCost: number) {
      this.totalCostSubject.next(totalCost);
    }
    getTotalCost() {
      return this.currentTotalCost;
    }

  getData() {
    return this.currentSubjectList;
  }

  getCartProducts(): Products[] {
    const products: Products[] = JSON.parse(localStorage.getItem('cart')) || [];
    return products;
   }

 addProductToCart(data: Products) {
   let product: Products[];
   product = JSON.parse(localStorage.getItem('cart')) || [];
   product.push(data);
   this.cartCount++;
      setTimeout(() => {
        localStorage.setItem('cart', JSON.stringify(product));
         this.getCartCount();
    }, 500);
 }

 removeProductFromCart(data: Products) {
  const products: Products[] = JSON.parse(localStorage.getItem('cart'));

  for (let i = 0; i < products.length; i++) {
    if (products[i].Id === data.Id) {
      products.splice(i, 1);
      this.cartCount--;
      break;
    }
  }
  localStorage.setItem('cart', JSON.stringify(products));
  this.getCartCount();
 }


 getCartCount() {
  this.cartCount = this.getCartProducts().length;
 }

 createOrder(newOrder, orderedProduct: Products[], totalCost: number) {
    const body = {
      UserId: localStorage.getItem('id'),
      firstName: newOrder.firstName,
      lastName: newOrder.lastName,
      email: newOrder.email,
      phoneNumber: newOrder.phoneNumber,
      address: newOrder.address,
      comment: newOrder.remarks,
      totalPrice: totalCost,
      orderState: 0,
      Products: orderedProduct
    };
    return this.http.post('http://localhost:61085/api/Order/CreateOrder', body);
 }

 getOrderList(userId) {
   return this.http.get<Order>('http://localhost:61085/api/Order/GetOrderList/' + userId);
 }

 changeOrderState(orderState, order) {
    let changeOrder = new Order();
    changeOrder = order;
    changeOrder.orderState = Number(orderState);
   return this.http.post('http://localhost:61085/api/Order/ChangeOrderState', changeOrder);
 }

  addToWishList(userId, productId) {

    let wishes = new WishList();
    wishes.UserId = userId;
    wishes.ProductId = productId;
    return this.http.post('http://localhost:61085/api/AddToWishlist', wishes);
  }

  getWishList(userId) {
    return this.http.get<WishList[]>('http://localhost:61085/api/GetWishList/' + userId);
  }

  deleteWishList(id) {
    return this.http.delete('http://localhost:61085/api/RemoveFromWishList/' + id);
  }
}
