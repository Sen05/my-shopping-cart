import axios from "axios";
import type { CartItemType, ProductInput } from "./types";
const API_URL = "http://localhost:5000/api/cart";
export const getCartItems = () => axios.get<CartItemType[]>(API_URL);
export const addToCart = (product: ProductInput) =>
  axios.post<CartItemType>(API_URL, product);
// xoá
export const deleteCartItem = (id: number) => axios.delete(`${API_URL}/${id}`);
// sửa
export const updateCartItem = (id: number, product: ProductInput) =>
  axios.put<CartItemType>(`${API_URL}/${id}`, product);
