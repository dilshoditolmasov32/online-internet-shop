import CategDropdown from "../categories/CategoryDropdown.jsx";
import useCategories from "../../hooks/useCategories.jsx";
import ChooseLang from "../tools/ChooseLangLight.jsx";
import { useTranslation } from "react-i18next";
import instagram from "../../assets/img/instagram.svg";
import facebook from "../../assets/img/facebook.svg";
import telegram from "../../assets/img/telegram.svg";

export default function HeaderAdaptNav() {
  const { categories } = useCategories();
  const { t } = useTranslation();
  return (
    <div className="headernav">
      <div className="container">
        <div className="headernav__wrap">
          <div className="headernav__top">
            <h3 className="headernav__title">{t("categories")}</h3>
             <CategDropdown />
          
          </div>
          <div className="headernav__btm">
            <div className="headernav__btm-list">
              <img src={instagram} alt="social-icons" />
              <img src={facebook} alt="social-icons" />
              <img src={telegram} alt="social-icons" />
            </div>
            <ChooseLang />
          </div>
        </div>
      </div>
    </div>
  );
}
