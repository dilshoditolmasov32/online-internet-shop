import React, { useEffect } from "react";
import Nav from "../../components/media/Nav.jsx";
import Cart from "../../components/cart/Basket.jsx"; 
import NoProds from "../../components/cart/NoundProducts.jsx";
import useBasket from "../../hooks/useBasket.jsx";
import { useTranslation } from "react-i18next";

export default function Basket() {
  const { basket, fetchBasket } = useBasket();
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof fetchBasket === "function") fetchBasket();
  }, []);

  const navInfo = {
    title: t("myCart") || "Mening savatcham",
    total: basket ? basket.length : 0,
  };

  return (
    <>
      <Nav info={navInfo} status={false} />

      {basket && basket.length ? (
        <Cart products={basket} change={fetchBasket} />
      ) : (
        <NoProds />
      )}
    </>
  );
}