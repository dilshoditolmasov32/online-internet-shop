import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import api from "../../api/axios.js";
import CartElem from "./CartElement.jsx";
import galka from "../../assets/img/toast.svg";
import close from "../../assets/img/close.svg";
import "../../styles/scss/pages/basket.scss";
import "../../styles/scss/components/tost.scss";

export default function Cart({ products, change, setInfo }) {
  const { t, i18n } = useTranslation();

  const [localBasket, setLocalBasket] = useState(products);
  const [selectedIds, setSelectedIds] = useState([]);
  const [total, setTotal] = useState(0);
  const [oldTotal, setOldTotal] = useState(0);

  useEffect(() => {
    setLocalBasket(products);
  }, [products]);

  const errorBuy = () => {
    toast(
      <div className="tost">
        <img src={close} alt="Error" />
        <span className="tost__text-red"> Ошибка, повторите попытку </span>
      </div>,
      {
        style: {
          width: "100%",
          padding: "10px",
          background: "none",
          boxShadow: "none",
        },
        autoClose: 3000,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        icon: false,
      }
    );
  };

  const succesBuy = () => {
    toast(
      <div className="tost">
        <img src={galka} alt="Done" />
        <span className="tost__text">Успешно отправлено на проверку</span>
      </div>,
      {
        style: {
          width: "100%",
          padding: "10px",
          background: "none",
          boxShadow: "none",
        },
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: false,
        icon: false,
      }
    );
  };

  useEffect(() => {
    const newTotal = localBasket.reduce((acc, item) => {
      const price = Number(item.product.price);
      const discount = Number(item.product.discount);
      const finalPrice = discount !== 0 ? price * (1 - discount / 100) : price;
      return acc + finalPrice * item.amount;
    }, 0);
    const newOldTotal = localBasket.reduce(
      (acc, item) => acc + Number(item.product.price) * item.amount,
      0
    );
    setTotal(newTotal);
    setOldTotal(newOldTotal);
  }, [localBasket]);

  const updateQuantity = (itemId, newQuantity) => {
    setLocalBasket((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, amount: newQuantity } : item
      )
    );
  };

  const removeItemLocal = (itemId) => {
    setLocalBasket((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedIds((prev) => prev.filter((id) => id !== itemId));
  };

  const toggleSelection = (itemId) => {
    setSelectedIds((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };


  const deleteSelectedItems = async () => {
    const token = localStorage.getItem("token");
    for (const id of selectedIds) {
      try {
        await axios.delete(`${api}/basket/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        removeItemLocal(id);
      } catch (err) {
        console.error("Ошибка удаления товара с id=", id, err);
      }
    }
    // После удаления очищаем выбранные товары
    setSelectedIds([]);
    if (typeof change === "function") {
      change();
    }
  };

  const navInfo = {
    title: t("myCart"),
    total: localBasket.length,
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${api}/orders/create/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      succesBuy();
      // Можно также выполнить редирект или обновить корзину
      if (typeof change === "function") {
        change();
      }
    } catch (error) {
      errorBuy();
      console.error(
        "Ошибка оформления заказа:",
        error.response ? error.response.data : error.message
      );
      alert("Ошибка оформления заказа");
    }
  };

  return (
    <div className="basket">
      <div className="basket__wrap">
        <div className="basket__prods">
          {localBasket?.map((item) => (
            <CartElem
              key={item.id}
              prod={item}
              updateQuantity={updateQuantity}
              removeItemLocal={removeItemLocal}
              toggleSelection={toggleSelection}
              isSelected={selectedIds.includes(item.id)}
              change={change}
            />
          ))}
        </div>

        <div className="basket__total">
          <div className="basket__total-top">
            <h3 className="basket__total-title">{t("sum")}</h3>
            <div className="basket__total-desc">
              <p className="basket__total-desc__text">
                {total.toLocaleString()} {t("value")}
              </p>
              {total === oldTotal ? null : (
                <p className="basket__total-desc__old">
                  {oldTotal.toLocaleString()} {t("value")}
                </p>
              )}
            </div>
          </div>

          <div className="basket__total-categ">
            {localBasket.map((item, i) => (
              <p key={i} className="basket__total-categ__text">
                {item.product.name}
                <span>
                  {item.product.discount === 0
                    ? Math.round(
                        item.product.price * item.amount
                      ).toLocaleString()
                    : Math.round(
                        item.product.price *
                          (1 - item.product.discount / 100) *
                          item.amount
                      ).toLocaleString()}
                </span>
              </p>
            ))}
          </div>

          <button className="basket__total-btn" onClick={handleOrder}>
            {t("order")}
          </button>
          {selectedIds.length > 0 && (
            <button className="basket__total-btn" onClick={deleteSelectedItems}>
              {t("clear2")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
