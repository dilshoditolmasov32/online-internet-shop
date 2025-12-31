import { useTranslation } from "react-i18next";
import { useCallback, useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts.jsx";
import useCategories from "../../hooks/useCategories.jsx";
import ProdsMain from "../../components/products/ProductsMain.jsx";

export default function Prods({addToCart}) {
    const { categories } = useCategories();
const t =useTranslation()
    const [filters, setFilters] = useState({
        subcategory: '',
        min_price: '',
        max_price: '',
        search: '',
        page: 1,
    });



    const handleChange = useCallback((e) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const { products, loading, error, nextPage, prevPage, currentPage, setCurrentPage } = useProducts(filters);

    const [activeStatus, setActiveStatus] = useState('all');
    const [prods, setProds] = useState(products);
    const [totalProducts, setTotalProducts] = useState(products.length || 0);

    useEffect(() => {
        const newProds = activeStatus === 'all'
            ? products
            : products.filter(e => e.status === activeStatus);
        setProds(newProds);
        setTotalProducts(newProds.length);
    }, [activeStatus, products]);

    return (
        <>

          
            <ProdsMain
                products={prods}
                categories={categories}
                handleChange={handleChange}
                filters={filters}
                setFilters={setFilters}
                loading={loading}
                error={error}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                addToCart={addToCart}
            />
        </>
    );
}
