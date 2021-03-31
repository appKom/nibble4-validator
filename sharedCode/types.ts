export type Product = {
  pk: number;
  name: string;
  description: string;
  price: number;
  image: {
    sm: string;
  };
  category: {
    pk: number;
    name: string;
  };
};

export type OrderLineFormat = {
  user: number;
  orders: CartItem[];
};

export type User = {
  pk: number;
  balance: number;
  first_name: string;
};


export type CartItem = {
  object_id: number;
  quantity: number;
};