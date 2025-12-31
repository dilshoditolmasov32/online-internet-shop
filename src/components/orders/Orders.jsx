import React, { useEffect, useState } from "react";
import Order from "./Order.jsx";
import useOrders from "../../hooks/useOrders.jsx";
import NoOrders from "../cart/NoundOrders.jsx";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { orders: allOrders } = useOrders();
  const { t, i18n } = useTranslation();
  const [Jarayonda, setJarayonda] = useState([]);
  const [Yetkazib, setYetkazib] = useState([]);
  const [Bekor, setBekor] = useState([]);

  useEffect(() => {
    if (allOrders?.results) {
      setJarayonda(
        allOrders.results.filter((order) => order.status === "Jarayonda")
      );
      setYetkazib(
        allOrders.results.filter((order) => order.status === "Yetkazib berildi")
      );
      setBekor(
        allOrders.results.filter((order) => order.status === "Bekor qilindi")
      );
    }
  }, [allOrders]);
  return (
    <div className="orders">
      {allOrders?.results?.length > 0 ? (
        <>
          {Jarayonda.length > 0 && (
            <>
              <h2 className="order__status-header">{t("inProcess")}</h2>
              {Jarayonda.map((order) => (
                <Order order={order} key={order.id} />
              ))}
            </>
          )}

          {Yetkazib.length > 0 && (
            <>
              <h2 className="order__status-header">{t("delivered")}</h2>
              {Yetkazib.map((order) => (
                <Order order={order} key={order.id} />
              ))}
            </>
          )}

          {Bekor.length > 0 && (
            <>
              <h2 className="order__status-header">{t("canceled")}</h2>
              {Bekor.map((order) => (
                <Order order={order} key={order.id} />
              ))}
            </>
          )}
        </>
      ) : (
        <NoOrders />
      )}
    </div>
  );
}
