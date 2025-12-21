import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts.jsx";
import ProductCard from "./ProductCard.jsx";
import arrowR from "../../assets/img/arrowR.svg";
import "../../styles/scss/components/products.scss";
import Skeleton from "../skeleton/skeleton.jsx";

export default function Products({ title }) {
  const { t } = useTranslation();
  const { products, loading } = useProducts();

  if (title === "Mahsus taklif.") {
    filteredProducts = products.filter((e) => e.status === "mahsus_taklif");
  } else if (title === "Yangi mahsulotlar.") {
    filteredProducts = products.filter((e) => e.status === "yangilik");
  }

  if (loading) return <Skeleton count={12}/>

  return (
    <div className="container">
      <div className="products">
        <div className="products__wrap">
          <div className="products__top">
            <h2 className="products__top-title">{title}</h2>

            <Link to="/products" className="products__top-txt">
              <p className="products__top-text">{t("all")}</p>
              <img src={arrowR} alt="arrow icon" />
            </Link>
          </div>

          <div className="products__main">
            {products?.data?.map((product, index) => (
              <ProductCard info={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
