import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"; // Redux-dan o'qish uchun
import useProducts from "../../hooks/useProducts";
import Skeleton from "../skeleton/skeleton";
import { Link } from "react-router";
import arrowR from "../../assets/img/arrowR.svg";
import ProductCard from "./ProductCard";
export default function Products({ title }) {
  const { t } = useTranslation();
  const { products, loading } = useProducts();
  // Products.jsx ichida
  const searchQuery = useSelector((state) => state.search?.query) || "";

  // 1. Redux-dan qidiruv so'zini olamiz (store-dagi nomini tekshiring)

  if (loading) return <Skeleton count={12} />;

  // 2. Dastlabki massivni aniqlab olamiz
  let allItems = products?.data || [];

  // 3. Status bo'yicha filtrlaymiz
  let displayProducts = allItems;
  if (title === "Mahsus taklif.") {
    displayProducts = allItems.filter((e) => e.status === "mahsus_taklif");
  } else if (title === "Yangi mahsulotlar.") {
    displayProducts = allItems.filter((e) => e.status === "yangilik");
  }

  // 4. Qidiruv so'zi bo'yicha filtrlaymiz (bu eng muhimi)
  const filteredProducts = allItems.filter((item) => {
    // 1. Status bo'yicha filtr
    const matchesStatus =
      title === "Mahsus taklif."
        ? item.status === "mahsus_taklif"
        : title === "Yangi mahsulotlar."
        ? item.status === "yangilik"
        : true;

    // 2. Nomi bo'yicha qidiruv (XAVFSIZ VARIANT)
    // item.name mavjudligini tekshiramiz (null bo'lsa false qaytaradi)
    const matchesSearch = item.name
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

    return matchesStatus && matchesSearch;
  });
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
            {allItems.length > 0 ? (
              allItems.map((product) => (
                <ProductCard info={product} key={product.id} />
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                {t("Topilmadi")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
