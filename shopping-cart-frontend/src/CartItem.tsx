import React, { useState } from "react";
import type { CartItemType, ProductInput } from "./types";
interface Props {
  item: CartItemType;
  onDelete: (id: number) => void;
  onUpdate: (id: number, product: ProductInput) => void;
}
const CartItem: React.FC<Props> = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState<ProductInput>({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  });
  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        ) : (
          item.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editItem.price}
            onChange={(e) =>
              setEditItem({ ...editItem, price: Number(e.target.value) })
            }
          />
        ) : (
          `${item.price} VND`
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) =>
              setEditItem({ ...editItem, quantity: Number(e.target.value) })
            }
          />
        ) : (
          item.quantity
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={editItem.image}
            onChange={(e) =>
              setEditItem({ ...editItem, image: e.target.value })
            }
          />
        ) : (
          item.image && <img src={item.image} alt={item.name} width={80} />
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button
              onClick={() => {
                onUpdate(item.id, editItem);
                setIsEditing(false);
              }}
            >
              Lưu
            </button>
            <button onClick={() => setIsEditing(false)}>Huỷ</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Sửa</button>
            <button onClick={() => onDelete(item.id)}>Xoá</button>
          </>
        )}
      </td>
    </tr>
  );
};
export default CartItem;
