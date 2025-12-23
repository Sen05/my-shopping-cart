import { useEffect, useState } from "react";
import { getCartItems, addToCart, deleteCartItem, updateCartItem } from "./api";
import type { CartItemType, ProductInput } from "./types";
import CartItem from "./CartItem";
import "./App.css";
function App() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [product, setProduct] = useState<ProductInput>({
    name: "",
    price: 0,
    quantity: 1,
  });
  useEffect(() => {
    getCartItems().then((res) => setCart(res.data));
  }, []);
  const handleAddToCart = () => {
    addToCart(product).then((res) => {
      setCart([...cart, res.data]);
      setProduct({ name: "", price: 0, quantity: 1 });
    });
  };
  const handleDelete = (id: number) => {
    deleteCartItem(id).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };
  const handleUpdate = (id: number, product: ProductInput) => {
    updateCartItem(id, product).then((res) => {
      setCart(cart.map((item) => (item.id === id ? res.data : item)));
    });
  };
  return (
    <div>
      <h1>Giỏ hàng</h1>
      <input
        placeholder="Tên sản phẩm"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Giá"
        value={product.price}
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
      />
      <input
        type="number"
        placeholder="Số lượng"
        value={product.quantity}
        onChange={(e) =>
          setProduct({ ...product, quantity: Number(e.target.value) })
        }
      />
      <input
        placeholder="Đường dẫn ảnh"
        value={product.image || ""}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <button onClick={handleAddToCart}>Thêm</button>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hình ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
