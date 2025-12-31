import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgPlaceholder from "../../assets/img/product.svg";
import basket from "../../assets/img/basket.svg";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, optimisticAdd } from "../../store/cart";
import { toast } from "react-toastify";

export default function ProductCard({ info, addToCart }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.cart.status);

  const isAdding = status === "loading";
  if (!info) return null;

  const handleAddToCart = async () => {
    if (isAdding) return; // Agar jarayon ketayotgan bo'lsa, funksiyani to'xtatish

    try {
      // Optimistik tarzda UI ni yangilash (darhol)
      dispatch(
        optimisticAdd({
          product_id: info.id,
          quantity: 1,
        })
      );

      toast.success("Mahsulot savatchaga qo'shildi");

      await dispatch(
        addCartItem(
          {
            product_id: info.id,
            quantity: 1,
          }        )
      ).unwrap();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const productImage = info.images?.[0]?.original_image_url || imgPlaceholder;

  return (
    <div className="product__main">
      <div className="product__wrap">
        <Link to={`/product/${info.id}`} className="product__img">
          <img src={productImage} alt={info.name} />
        </Link>

        <div className="product__desc">
          <p className="product__desc-title">
            {info?.name || "Nomsiz mahsulot"}
          </p>{" "}
        </div>
      </div>

      <div className="product__desc-btns">
        <Link to={`/product/${info.id}`} className="product__desc-btns__buy">
          {t("buyBtn")}
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`product__desc-btns__basket ${isAdding ? "loading" : ""}`}
        >
          {isAdding ? <div className="spinner" /> : <img src={basket} />}
        </button>
      </div>
    </div>
  );
}
