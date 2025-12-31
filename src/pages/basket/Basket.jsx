import Nav from "../../components/media/Nav.jsx";
import NoProds from "../../components/cart/NoundProducts.jsx";
import { useTranslation } from "react-i18next";
import useCart from "../../hooks/useCart.jsx";
import { useEffect } from "react";
import BasketComponent from "../../components/cart/Basket.jsx";
import "../../styles/scss/pages/_basket.scss";
import { toast } from "react-toastify";

export default function Basket() {
  const { t } = useTranslation();
  const { cart, cartItems, loading, getCart } = useCart();
  const cartData = cart?.data || cart;
  const items = cartItems || cartData?.items || [];

  useEffect(() => {
    getCart();
  }, []);

  if (loading) return <div className="loading">Yuklanmoqda...</div>;
  const data = cart?.data;

  const handleBuyProduct=()=>{
    toast.success("Muvaqqiyatli amalga oshirildi")
  }
  return (
    <>
      <Nav info={{ title: t("myCart"), total: cartData?.items_qty || 0 }} />
      {cartItems.length > 0 ? (
        <div className="basket">
          <div className="basket__wrap">
            <div className="basket__prods">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <BasketComponent
                    key={item.id}
                    prod={item}
                    refresh={getCart}
                  />
                ))
              ) : (
                <NoProds />
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="basket__total">
                <div className="basket__total-top">
                  <h2 className="basket__total-title">Jami</h2>
                  <div className="basket__total-desc">
                    <span className="basket__total-desc__text">
                      {data?.formatted_grand_total}
                    </span>
                    <span className="basket__total-desc__old">
                      {/* Agar API-da eski narx bo'lsa shuni qo'ying */}6 045
                      000 so'm
                    </span>
                  </div>
                </div>

                <div className="basket__total-categ">
                  <div className="basket__total-categ__text">
                    <span>Savatchadagi mahsulotlar</span>
                    <span>{data?.items_qty} ta</span>
                  </div>
                </div>

                <button className="basket__total-btn" onClick={handleBuyProduct}>Rasmiylashtirish</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoProds />
      )}
    </>
  );
}
