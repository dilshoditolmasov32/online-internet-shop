import React, { useEffect } from "react";
import AcountInput from "../components/inputs/AcountInput.jsx";
import "../styles/scss/vendors/create.scss";
import api from "../api/axios.js";
import { useTranslation } from "react-i18next";

export default function Create({
  title,
  setCurrent,
  setBack,
  phone,
  setPhone,
  setFullName,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    setBack(false);
    title(t("enterPhoneNumber"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async () => {
    try {
      let cleanPhone = phone ? phone.replace(/\s/g, "") : "";
      if (cleanPhone.startsWith("+")) {
        cleanPhone = cleanPhone.slice(1);
      }

      const response = await fetch(`${api}/auth/send-code/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanPhone }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(`Ошибка: ${errorData.error || "Неизвестная ошибка"}`);
        return;
      }

      const data = await response.json();
      console.log("Ответ от сервера:", data);
      setPhone(cleanPhone);
      setCurrent("code");
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      alert("Tarmoq xatosi!");
    }
  };

  return (
    <div className="create__wrap">
      <div className="create__input">
        <p className="create__input-text">{t("firstLastName")}</p>
        <input
          type="text"
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          className="create__input-inp"
        />
      </div>
      <div className="create__input">
        <p className="create__input-text">
          {t("tel")} <span>{t("codeSendViaTgBot")}</span>
        </p>
        <AcountInput phone={phone} setPhone={setPhone} />
      </div>
      <button className="create__btn" onClick={handleRegister}>
        {t("createAcc")}
      </button>
      <p className="create__text">
        {t("haveAcc")}{" "}
        <span
          onClick={() => {
            setCurrent("login");
          }}
          className="create__link"
        >
          {t("login")}
        </span>
      </p>
    </div>
  );
}