import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCategoryWithProducts from "../../hooks/useCategoryWithProducts";
import ProductCard from "../products/ProductCard";

export default function CategoryDetailScreen({category}) {
  const { id } = useParams(); 
  const { i18n } = useTranslation();

  // const { category, products, loading, error } = useCategoryWithProducts(id, i18n.language);

  // if (loading) return <div className="loading-state">Yuklanmoqda...</div>;
  // if (error) return <div className="error-state">{error}</div>;

  return (
    <div className="category-page">
      <header className="category-header">
        <div className="container">
          <h1>{category?.name}</h1>
          {category?.description && (
            <div 
              className="category-desc" 
              dangerouslySetInnerHTML={{ __html: category.description }} 
            />
          )}
        </div>
      </header>

      <section className="category-products">
        <div className="container">
          <div className="product-list-wrapper">
            {category.length > 0 ? (
              category?.map((product) => (
                <ProductCard key={product.id} info={product} />
              ))
            ) : (
              <div className="no-products">
                Ushbu kategoriyada hozircha mahsulotlar yo'q.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}