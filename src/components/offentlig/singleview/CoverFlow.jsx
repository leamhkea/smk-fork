import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

const CoverFlow = ({ event }) => {
  return (
    <div className="App">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={2}
        centeredSlides
        style={{ height: "500px" }}
      >
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt={`Billede af ${event.title}`}
            width={500}
            height={500}
            src="/placeholder.png"
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CoverFlow;
