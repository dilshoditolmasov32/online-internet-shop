import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AcountInput from "../components/inputs/AcountInput.jsx";
import { useOtp } from "../hooks/useOtp.jsx";

export default function Create({
  title,
  setCurrent,
  setBack,
  phone,
  setPhone,
  fullName,
}) {
  const { t } = useTranslation();
  const { requestOtp, verifyOtp, loading, error } = useOtp();
  useEffect(() => {
    setBack(false);
    title(t("Telefon raqamingizni kiriting"));
  }, [setBack, title, t]);

  const handleNextStep = async () => {
    const cleanPhone = phone.replace(/\D/g, "");
    const result = await requestOtp(cleanPhone, fullName);
    if (result.success) {
      setCurrent("code");
    }
  };

  const isFormValid =
    phone.replace(/\D/g, "").length >= 12 && fullName.trim().length >= 3;

  return (
    <div className="create__wrap">
      <div className="create__input">
        <p className="create__input-text">
          {t("Telefon")}.{" "}
          <span>{t("Tasdiqlash kodini telegram bot orqali yuboramiz.")}</span>
        </p>
        <AcountInput phone={phone} setPhone={setPhone} />
      </div>
      {error && (
        <div
          className="create__error-message"
          style={{ color: "red", marginTop: "10px", fontSize: "14px" }}
        >
          {error}
        </div>
      )}

      <button
        className="create__btn"
        onClick={handleNextStep}
        disabled={loading || !isFormValid}
      >
        {loading ? t("Yuborilmoqda...") : t("Ro'yxatdan o'tish")}
      </button>

      <p className="create__footer-text">
        {t("Akkauntingiz bormi?")}{" "}
        <span onClick={() => setCurrent("login")} className="create__link">
          {t("Akkauntga kirish")}
        </span>
      </p>
    </div>
  );
}
