import { Link } from "react-router";

import CategoryCard from "./CategoryCard.jsx";
import useCategories from "../../hooks/useCategories.jsx";
import { useTranslation } from "react-i18next";
import arrowR from "../../assets/img/arrowR.svg";
import "../../styles/scss/vendors/categories.scss";

export default function Categories() {
  const { categories } = useCategories();
  const { t, i18n } = useTranslation();

  return (
    <div className="categories">
      <div className="container">
        <div className="categories__top">
          <h2 className="categories__title">{t("categ")}.</h2>
          <div className="categories__txt">
            <Link to="/products" className="link">
              <p className="categories__text">{t("all")} </p>
            </Link>
            <img src={arrowR} alt="arrow-icon" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="categories__wrap">
          {categories.slice(0, 4).map((item, i) => (
            <Link className="link" key={i} to="/products">
              <CategoryCard info={item} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
