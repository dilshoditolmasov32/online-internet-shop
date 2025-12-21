import { useEffect, useMemo, useState } from "react";
import { getCategories } from "../api/category.service";
import i18n from "../i18n";
import { withLang } from "../utils/withLang";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    return withLang();
  }, [i18n.language]);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getCategories(params);
        if (!active) return;
        setCategories(res.data.results ?? res.data);
      } catch (err) {
        if (!active) return;
        setError(err?.message || "Category yuklanmadi");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      active = false;
    };
  }, [params]);

  return { categories, loading, error };
};

export default useCategories;
