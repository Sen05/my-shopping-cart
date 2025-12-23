export type ProductInput = {
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
};

export type CartItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
};
