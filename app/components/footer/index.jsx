import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import useSWR from "swr";
import Snapchat from "../../assets/img/snapchat.png";
import Image from "next/image";
function Footer() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(
    "https://www.sporent.net/TheNews",
    fetcher,
    { fallback: false, revalidateOnFocus: false, keepPreviousData: true }
  );

  return (
    <footer className="px-5 my-5 lg:px-2">
      <div className="container px-5 h-full flex items-center justify-center overflow-y-hidden m-auto rounded-2xl bg-[#3F8CAA] text-center text-[#FFFFFF] font-[800] gap-2 text-md md:text-2xl py-5">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {data?.News?.map?.((item, index) => (
            <SwiperSlide key={item?.Details + index}>
              <div className="flex items-center justify-center">
                {item?.Details ?? "-"}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Image width={80} height={80} src={Snapchat} />
      </div>
    </footer>
  );
}

export default Footer;
