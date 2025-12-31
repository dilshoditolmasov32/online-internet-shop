import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api/axios";
import i18n from "../i18n";
import { withLang } from "../utils/withLang";


const useProducts = (initialParams = {}) => {
  const stableParams = useRef(initialParams);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(initialParams.page || 1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const filters = useMemo(() => {
    return withLang({
      ...stableParams.current,
      page,
    });
  }, [page, i18n.language]);

  useEffect(() => {
    let active = true;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await api.get("/products/", {
          params: filters,
        });

          console.log(res.data.results)

        if (!active) return;

        setProducts(res.data ?? []);
        setNextPage(res.data.next ?? null);
        setPrevPage(res.data.previous ?? null);
      } catch (err) {
        if (!active) return;
        setError(err?.message || "Noma’lum xatolik");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      active = false;
    };
  }, [filters]);

  return {
    products,
    loading,
    error,
    pagination: {
      page,
      canNext: Boolean(nextPage),
      canPrev: Boolean(prevPage),
      setPage,
    },
  };
};

export default useProducts;
