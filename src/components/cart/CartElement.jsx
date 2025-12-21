import "../../styles/scss/pages/basket.scss";
import table from "../../assets/img/table.svg"
import { Check, Trash2 } from "lucide-react";
export default function CartElement({
  prod,
  updateQuantity,
  removeItemLocal,
  toggleSelection,
  isSelected,
}) {
  const { id, amount, product } = prod;
  const discount = Number(product.discount || 0);
  const price = Number(product.price);
  const finalPrice = discount ? Math.round(price * (1 - discount / 100)) : price;

  return (
    <div className="cart-elem">
      <button
        className={`cart-elem__select ${isSelected ? "checked" : ""}`}
        onClick={() => toggleSelection(id)}
        aria-label="Select product"
      >
        {isSelected ? <Check size={15} strokeWidth={2.5} absoluteStrokeWidth /> : ""}
      </button>

      <div className="cart-elem__img-wrap">
        <img className="cart-elem__img" src={table} alt={"product.name"} />
      </div>

      <div className="cart-elem__info">
        <div className="cart-elem__top">
          <div>
            <div className="cart-elem__price">
              {finalPrice.toLocaleString()} <span className="val">so'm</span>
              {discount > 0 && <span className="cart-elem__badge">-{discount}%</span>}
            </div>
            <div className="cart-elem__name">{product.name}</div>
            <div className="cart-elem__code">Mahsulot kodi: {product.code}</div>
          </div>

          <div className="cart-elem__controls">
            <div className="qty">
              <button
                className="qty__btn"
                onClick={() => updateQuantity(id, Math.max(1, amount - 1))}
              >
                -
              </button>
              <div className="qty__num">{amount}</div>
              <button className="qty__btn" onClick={() => updateQuantity(id, amount + 1)}>
                +
              </button>
            </div>

            <button className="del" onClick={() => removeItemLocal(id)} title="O'chirish">
              <Trash2 strokeWidth={1} />
            </button>
          </div>
        </div>
        <hr className="cart-elem__divider" />
      </div>
    </div>
  );
}