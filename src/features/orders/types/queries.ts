import { OrderStatuses } from "../common";

export interface OrderProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  ownerId: number;
  status: OrderStatuses;
  total: number;
  date: string;
  products: OrderProduct[];
  comment: string | null;
}
