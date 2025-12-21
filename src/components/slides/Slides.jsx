import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

import banner1 from "../../assets/img/banner-1.svg";
import banner2 from "../../assets/img/banner-2.svg";
import banner3 from "../../assets/img/banner-3.svg";
import banner4 from "../../assets/img/banner-4.svg";

import "../../styles/scss/components/slide.scss";

export default function Slides({ info, type }) {
  const banners = [
    {
      id: 1,
      bannerImg: banner1,
    },
    {
      id: 2,
      bannerImg: banner2,
    },
    {
      id: 3,
      bannerImg: banner3,
    },
    {
      id: 4,
      bannerImg: banner4,
    },
  ];
  if (type === "first") {
    info = info.filter((item) => item.new_type === "first");
  } else if (type === "second") {
    info = info.filter((item) => item.new_type === "second");
  }

  return (
    <div className="container">
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
        {banners?.map((slide) => (
          <SwiperSlide key={slide.id} className="swiper-slide">
            <img src={slide.bannerImg} alt="swagger image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
