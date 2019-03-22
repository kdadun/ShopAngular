import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Products } from '../../shared/models/products';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-calculate-cost-cart',
  templateUrl: './calculate-cost-cart.component.html',
  styleUrls: ['./calculate-cost-cart.component.css']
})
export class CalculateCostCartComponent implements OnInit, OnChanges {
  @Input() products: Products;
  totalCost = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const dataChanges: SimpleChange = changes.products;
    const cartProduct: Products[] = dataChanges.currentValue;
    this.totalCost = 0;
    // tslint:disable-next-line:indent
		cartProduct.forEach((product) => {
    // tslint:disable-next-line:indent
     this.totalCost += product.Price;
     this.cartService.setTotalCost(this.totalCost);
});
  }
}
