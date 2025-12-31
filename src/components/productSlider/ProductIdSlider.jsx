import  { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import defaultImg from "../../assets/img/defaultImg.svg";

export default function ProductIdSlider({ info = [], onSelect }) {
  console.log(info, "slider")
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const slides = Array.isArray(info) && info.length > 0 ? info : [{ image: defaultImg }];

    return (
        <div id="slayder-component">
            <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={item.image || defaultImg}
                            alt={`slide-${index}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => onSelect && onSelect(item)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img src={item.image || defaultImg} alt={`thumb-${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
