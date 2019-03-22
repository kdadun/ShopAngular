import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import {  OrderState } from '../../shared/models/order';

@Component({
  selector: 'app-change-order-state',
  templateUrl: './change-order-state.component.html',
  styleUrls: ['./change-order-state.component.css']
})
export class ChangeOrderStateComponent implements OnInit {
  userOrderList: any;
   orderSelected: number;
   orderId: number;
   orderState = OrderState;
  constructor(private userOrder: CartService) {

   }

  ngOnInit() {
    this.getUserOrder();
  }
  getUserOrder() {
    const userId = localStorage.getItem('id');
    console.log(userId);
    this.userOrder.getOrderList(userId).subscribe( data => {
    this.userOrderList = data;
    });
  }
  changeOrderState(orderSelected, order) {
    this.userOrder.changeOrderState(orderSelected, order).subscribe(() => {
    });
  }
}
