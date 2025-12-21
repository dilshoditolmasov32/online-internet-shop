import { useEffect, useMemo, useState } from "react";
import { getNews } from "../api/news.service";
import i18n from "../i18n";
import { withLang } from "../utils/withLang";

const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useMemo(() => withLang(), [i18n.language]);

  useEffect(() => {
    let active = true;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await getNews(params);
        if (!active) return;
        setNews(res.data.results ?? res.data);
      } catch (err) {
        if (!active) return;
        setError("News yuklanmadi");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchNews();

    return () => {
      active = false;
    };
  }, [params]);

  return { news, loading, error };
};

export default useNews;
