import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard.jsx";
import ProdsMainAdapt from "./ProductsMainAdapt.jsx";
import CategDropdown from "../categories/CategoryDropdown.jsx";
import ProductsPagePagination from "../pagination/ProductsPagePagination.jsx";
import ProductFilter from "../buttons/ProductFilter.jsx";
import Skeleton from "../skeleton/skeleton.jsx";

export default function ProdsMain({
  products,
  categories,
  handleChange,
  filters,
  activeStatus,
  setActiveStatus,
  setFilters,
  loading,
  addToCart
}) { 
  const t = useTranslation();

  if (loading) return <Skeleton count={12} />;

  return (
    <div className="main">
      <ProdsMainAdapt
        categs={categories}
        filters={filters}
        handleChange={handleChange}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        setFilters={setFilters}
      />

      <div className="container">
        <ProductFilter />
        <div className="main__wrap">
          <div className="main__left">
            <div className="main__left-categories">
              {loading ? (
                <div className="sidebar-skeleton">
                  <div
                    className="skeleton-item"
                    style={{
                      height: "30px",
                      marginBottom: "10px",
                      background: "#eee",
                    }}
                  ></div>
                  <div
                    className="skeleton-item"
                    style={{
                      height: "30px",
                      marginBottom: "10px",
                      background: "#eee",
                    }}
                  ></div>
                  <div
                    className="skeleton-item"
                    style={{
                      height: "30px",
                      marginBottom: "10px",
                      background: "#eee",
                    }}
                  ></div>
                  <div
                    className="skeleton-item"
                    style={{
                      height: "30px",
                      marginBottom: "10px",
                      background: "#eee",
                    }}
                  ></div>
                </div>
              ) : (
                <CategDropdown filters={filters} handleChange={handleChange} />
              )}
            </div>
          </div>
          <div className="main__products">
            <div className="subcategory-products__section">
              <div className="main__products-grid">
                {loading ? (
                  <Skeleton count={12} />
                ) : (
                  products?.data?.map((product, index) => (
                    <ProductCard info={product} key={index} addToCart={addToCart} />
                  ))
                )}
              </div>
            </div>

            <div className="pagination">
              <ProductsPagePagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
