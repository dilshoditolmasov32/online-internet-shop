import { Link } from "react-router";

import useCategories from "../../hooks/useCategories.jsx";
import { useTranslation } from "react-i18next";
import arrowR from "../../assets/img/arrowR.svg";

export default function Categories() {
  const { categories } = useCategories();
  const { t, i18n } = useTranslation();

  console.log(categories, "categoru");

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
          {categories?.slice(0, 4)?.map((item) => (
            <Link to={"/products"} className="card" key={item.id}>
              <div className="card__wrap">
                <div className="card__desc">
                  <h3 className="card__desc-title">{item?.name}</h3>
                  <p dangerouslySetInnerHTML={{ __html: item?.description }} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
