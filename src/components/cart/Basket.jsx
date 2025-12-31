import { useTranslation } from "react-i18next";
import { Trash2, Plus, Minus, Check } from "lucide-react";
import tableDefault from "../../assets/img/table.svg";
import { updateCartItem, removeCartItem } from "../../service/cart.service";
import "../../styles/scss/pages/_basket.scss";
export default function Cart({ prod, refresh }) {
  const { t } = useTranslation();
  const { id, name, quantity, formatted_price, product, formatted_total } =
    prod;

  const updateQty = async (newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(id, newQty);
      refresh();
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
    }
  };

  const removeItem = async () => {
    try {
      await removeCartItem(id);
      refresh();
    } catch (err) {
      console.error("O'chirishda xatolik:", err);
    }
  };
  return (
    <div className="cart-elem">
      {/* Tanlash doirasi */}
      <div className="cart-elem__select checked">
        <Check size={16} />
      </div>

      {/* Rasm qismi */}
      <div className="cart-elem__img-wrap">
        <img
          src={product?.base_image?.small_image_url || tableDefault}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Ma'lumot qismi */}
      <div className="cart-elem__info">
        <div className="cart-elem__top">
          <div className="cart-elem__price">
            {formatted_price}
            <span className="cart-elem__badge">-36%</span>
          </div>
        </div>
        <p className="cart-elem__name">{name}</p>
        <p className="cart-elem__code">Mahsulot kodi: {prod.sku || id}</p>
      </div>

      {/* Boshqaruv tugmalari */}
      <div className="cart-elem__controls">
        <div className="qty">
          <button className="qty__btn" onClick={() => updateQty(quantity - 1)}>
            <Minus size={16} />
          </button>
          <span className="qty__num">{quantity}</span>
          <button className="qty__btn" onClick={() => updateQty(quantity + 1)}>
            <Plus size={16} />
          </button>
        </div>

        <button className="del" onClick={removeItem}>
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
