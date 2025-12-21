

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "../../styles/scss/components/fullScreenZoom.scss"

export default function FullscreenZoom({ images, activeIndex, onClose }) {
  return (
    <div className="fullscreen-overlay" onClick={onClose}>
      <div className="fullscreen-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <Swiper
          modules={[Navigation, Zoom]}
          navigation
          zoom={true}
          initialSlide={activeIndex}
          className="fullscreen-swiper"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="swiper-zoom-container">
                <img src={img.image} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
