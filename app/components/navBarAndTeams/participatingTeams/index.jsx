"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
function ParticipatingTeams({ Teams }) {
  return (
    <div className="px-5 lg:px-0">
      <div className="container dark:bg-gradient-to-b from-[#2C303C] to-[#1D1E23] py-2 m-auto my-8 border lg:px-14 px-4 rounded-2xl border-main dark:border-[#4A4E57] items-center gap-5 flex overflow-x-auto">
        <div className="lg:text-2xl md:text-xl min-w-fit text-md font-bold text-[#2A2A2A] dark:text-[#FFFFFF]">
          الفرق المشاركة
        </div>

        <Swiper
          spaceBetween={5}
          /*  slidesPerView={Teams?.length > 4 ? 6 : 4} // Default number of slides to show */
          breakpoints={{
            0: {
              slidesPerView: 2, // Adjust for smaller screens
            },
            400: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: Teams?.length > 4 ? 5 : 4,
            },
            800: {
              slidesPerView: Teams?.length > 4 ? 5 : 4,
            },
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {Teams?.map?.((image, index) => (
            <SwiperSlide key={image?.Name + index + Math.random()}>
              <div className="flex flex-col items-center justify-center gap-1 text-xs font-bold min-w-fit max-w-fit">
                <div className="relative w-[60px] h-[60px] overflow-hidden">
                  <Image
                    className="rounded-full"
                    alt="سبورنت"
                    fill
                    src={image?.Logo}
                  />
                </div>
                <div className="text-center">{image?.Name}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ParticipatingTeams;
