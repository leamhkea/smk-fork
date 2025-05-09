import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import Image from "next/image";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/effect-coverflow/effect-coverflow.scss";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export default function SwiperCoverflow() {
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
}
