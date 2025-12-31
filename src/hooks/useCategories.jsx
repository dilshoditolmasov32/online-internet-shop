import { useEffect, useMemo, useState } from "react";
import { getCategories } from "../service/category.service";
import { useTranslation } from "react-i18next";

const useCategories = () => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => {
    return { sort: "id" };
  }, []);
  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCategories(params);

        if (active) {
      
          setCategories(res.data.data || []);
        }
      } catch (err) {
        if (active) {
          setError(err?.response?.data?.message || "Xatolik yuz berdi");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCategories();
    return () => {
      active = false;
    };
  }, [params, i18n.language]);

  return { categories, loading, error };
};

export default useCategories;
