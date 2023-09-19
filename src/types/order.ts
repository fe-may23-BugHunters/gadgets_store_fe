interface OrderDetails {
  quantity: number;
  product: {
    id: string;
    name: string;
    category: string;
    priceRegular: number;
    priceDiscount: number;
  }
}

interface OrderProducts {
  quantity: number;
  productId: string;
}

export interface Order {
  id: string;
  userId: string;
  totalItems: number;
  totalPrice: number;
  createdAt?: string;
  details?: OrderDetails[];
  products?: OrderProducts[];
}
