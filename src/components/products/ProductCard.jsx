import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCart } from "../cart/CartContext.jsx";
import imgPlaceholder from "../../assets/img/product.svg";
import basket from "../../assets/img/basket.svg";
import "../../styles/scss/components/product.scss";

export default function ProductCard({ info }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addItem } = useCart();
const [isAdding, setIsAdding] = useState(false);
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addItem(info.id, 1);
      // Bu yerda navigate("/basket") qilsangiz ham bo'ladi,
      // lekin foydalanuvchi xaridni davom ettirishi uchun shart emas.
    } catch (err) {
      // Xato Context ichida toast orqali chiqadi
    }
  };

  const productImage = info.images?.[0]?.original_image_url || imgPlaceholder;

  return (
    <div className="product__main">
      <div className="product__wrap">
        <Link to={`/product/${info.id}`} className="product__img">
          <img src={productImage} alt={info.name} />

          {info?.status && (
            <div className="product__special">
              <p className="product__special-text">
                {info.status.replace(/_/g, " ")}
              </p>
            </div>
          )}

          {info?.discount > 0 && (
            <div className="product__disc">
              <p className="product__disc-text">
                -{Math.round(info.discount)}%
              </p>
            </div>
          )}
        </Link>

        <div className="product__desc">
          <p className="product__desc-title">{info.name}</p>
          <div className="product__desc-price">
            {info.discount > 0 ? (
              <>
                <p className="product__desc-price__disc">
                  {Math.round(info.price).toLocaleString()} {t("value")}
                </p>
                <h3 className="product__desc-price__text">
                  {Math.round(
                    info.price * (1 - info.discount / 100)
                  ).toLocaleString()}{" "}
                  {t("value")}
                </h3>
              </>
            ) : (
              <h3 className="product__desc-price__text">
                {Math.round(info.price).toLocaleString()} {t("value")}
              </h3>
            )}
          </div>
        </div>
      </div>

      <div className="product__desc-btns">
        <Link to={`/product/${info.id}`} className="product__desc-btns__buy">
          {t("buyBtn")}
        </Link>

      <button
      onClick={handleAddToCart}
      disabled={isAdding} // loading o'rniga isAdding ishlatamiz
      className={`product__desc-btns__basket ${isAdding ? "loading" : ""}`}
    >
      {isAdding ? <div className="spinner"></div> : <img src={basket} />}
    </button>
      </div>
    </div>
  );
}
