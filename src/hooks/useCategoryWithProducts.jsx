import { useEffect, useState, useMemo } from "react";
import { getCategories } from "../service/category.service";
import { getProducts } from "../service/product.service";

const useCategoryWithProducts = (categoryId, locale) => {
    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    const params = useMemo(() => ({
        category_id: categoryId,
        locale: locale || 'uz'
    }), [categoryId, locale]);

    useEffect(() => {
        if (!categoryId) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Ikkala so'rovni parallel yuboramiz
                const [categoryRes, productsRes] = await Promise.all([
                    getCategoryById(categoryId, { locale: params.locale }),
                    getProducts(params)
                ]);

                // Bagisto API formatiga ko'ra ma'lumotlarni o'qiymiz
                setCategory(categoryRes.data.data || categoryRes.data);
                setProducts(productsRes.data.data || productsRes.data.results || []);

            } catch (err) {
                console.error("Xatolik:", err);
                setError(err.response?.data?.message || "Ma'lumot yuklashda xatolik");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params, categoryId]);

    return { category, products, loading, error };
};

export default useCategoryWithProducts;