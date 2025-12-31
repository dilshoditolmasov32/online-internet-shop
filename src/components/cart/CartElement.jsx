import { Trash2, Plus, Minus } from "lucide-react";
import tableDefault from "../../assets/img/table.svg";
import { updateCartItem, removeCartItem } from "../../service/cart.service";

export default function CartElement({ prod, refresh }) {
  const {
    id, // Savatchadagi item ID-si (sizda 8 ekan)
    name, // Mahsulot nomi
    quantity, // Soni (sizda 4 ekan)
    formatted_price, // Bir donasining narxi
    formatted_total, // Umumiy narxi (quantity * price)
  } = prod;

  const updateQty = async (newQty) => {
    if (newQty < 1) return;
    try {
      // API-ga savatchadagi qator ID-si va yangi sonni yuboramiz
      await updateCartItem(id, newQty);
      refresh(); // Basket.jsx-dagi getCart-ni qayta chaqirib, listni yangilaymiz
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
    }
  };

  // Savatchadan o'chirish
  const removeItem = async () => {
    try {
      await removeCartItem(id);
      refresh();
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    }
  };
  return (
    <tr className="cart-row" style={{ borderBottom: "1px solid #eee" }}>
      <td className="cart-item-info" style={{ padding: "15px" }}>
        <div
          className="cart-item-flex"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >

          <img
            src={prod.product?.base_image?.small_image_url || tableDefault}
            alt={name}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <div>
            <p className="item-name" style={{ fontWeight: "600", margin: 0 }}>
              {name}
            </p>
            <span
              className="item-sku"
              style={{ fontSize: "12px", color: "#999" }}
            >
              ID: {id}
            </span>
          </div>
        </div>
      </td>

      <td className="cart-item-price" style={{ textAlign: "center" }}>
        {formatted_price}
      </td>

      <td className="cart-item-qty" style={{ textAlign: "center" }}>
        <div
          className="qty-wrapper"
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <button
            onClick={() => updateQty(quantity - 1)}
            disabled={quantity <= 1}
            style={{
              padding: "5px 10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Minus size={14} />
          </button>

          <span style={{ padding: "0 10px", fontWeight: "bold" }}>
            {quantity}
          </span>

          <button
            onClick={() => updateQty(quantity + 1)}
            style={{
              padding: "5px 10px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Plus size={14} />
          </button>
        </div>
      </td>

      <td
        className="cart-item-total"
        style={{ textAlign: "center", fontWeight: "bold" }}
      >
        {formatted_total}
      </td>

      <td className="cart-item-action" style={{ textAlign: "center" }}>
        <button
          className="delete-btn"
          onClick={removeItem}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <Trash2 size={18} color="#e74c3c" />
        </button>
      </td>
    </tr>
  );
}
