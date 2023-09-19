import axios from 'axios';
import { Order } from '../types/order';

const BASE_URL = 'https://fe-may23-bughunters-mt0o.onrender.com/orders';

export function getOrdersByUserId(userId: string): Promise<Order[]> {
  return axios.get(`${BASE_URL}/${userId}`).then((response) => response.data);
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
  return axios.post(BASE_URL, order);
}
