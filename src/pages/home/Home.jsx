import { useState } from "react";
import Slides from "../../components/slides/Slides.jsx";
import Categories from "../../components/categories/Categories.jsx";
import { useTranslation } from "react-i18next";
import Products from "../../components/products/Products.jsx";
import useNews from "../../hooks/useNews.jsx";
import ProductCard from "../../components/products/ProductCard.jsx";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, i18n } = useTranslation();
  const { news } = useNews();
  

  return (
    <>
      {/* <Header setSearchQuery={setSearchQuery} /> */}
      <ProductCard searchQuery={searchQuery} />
      <Slides lang="ru" />
      <Categories />
      <Products title={t("allProds")} />
      <Slides info={news} type="second" />
      <Products title={t("specialOffer")} />
    </>
  );
}
