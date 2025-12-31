import api from "../api/axios";

export const getCarouselImages = async (lang = "ru") => {
  try {
    const response = await api.get("theme/customizations");

    const data = response.data.data.find(
      (item) => item.type === "image_carousel"
    );

    if (!data) return [];

    const translation = data.translations.find(
      (t) => t.locale === lang
    );

    const images = translation?.options?.images || data.options.images;

    return images.map((img) => ({
      ...img,
      image: `https://shop.milliybiz.uz/${img.image}`,
    }));
  } catch (error) {
    console.error("Carousel error:", error);
    return [];
  }
};

