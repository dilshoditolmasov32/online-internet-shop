import { useState, useEffect } from "react";
import { getCarouselImages } from "../service/bannerService";

export const useBanners = (currentLang = 'ru') => {
const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCarouselImages(currentLang)
      .then((data) => setImages(data))
      .finally(() => setLoading(false));
  }, [currentLang]);

  return { images, loading };
};
