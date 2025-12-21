import bag from "../../assets/img/bag.svg";
import "../../styles/scss/components/noprods.scss";
import { useTranslation } from "react-i18next";

export default function NoOrders() {
  const { t, i18n } = useTranslation();
  return (
    <div className="noprod">
      <img src={bag} alt="bag image" />
      <div className="noprod__desc">
        <p className="noprod__title">{t("emptyOrders")}</p>
      </div>
    </div>
  );
}
