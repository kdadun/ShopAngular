import { Products } from './products';
export class Order {
  id: number;
  UserId: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  comment: string;
  dateCreated: Date;
  orderState: OrderState;
  totalPrice: number;
  OrderIteams: OrderIteams;
}

export enum OrderState {
New,
InProgress,
Completed
}
export class OrderIteams {
 orderItemId: number;
 OrderId: number;
 ProductId: number;
 UnitPrice: number;
 Product: Products[];
}
