import { OrderStatuses } from "../common";

export interface UpdateOrderProduct {
  id: number;
  quantity: number;
}

export interface UpdateOrder {
  status: OrderStatuses;
  products: UpdateOrderProduct[];
}
