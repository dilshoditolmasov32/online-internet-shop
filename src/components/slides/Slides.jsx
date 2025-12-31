import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useBanners } from "../../hooks/useBanner";
import  BannerSkeleton from "../skeleton/BannerSkeleton"
import "swiper/swiper-bundle.css";

export default function Slides({ lang = "ru" }) {
  const { images, loading } = useBanners(lang);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!loading) {
        setShowLoading(false);
        clearInterval(timer);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [loading]);

  if (showLoading) {
    return <BannerSkeleton/>
  }

  return (
    <a href="/products" className="container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2000,

          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        className="slide"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
         
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </a>
  );
}
