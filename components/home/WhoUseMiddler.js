"use client";

import { useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Heading from "../ui/Heading";
import SwiperBtn from "../ui/SwiperBtn";

const cards = [
  {
    span: "Interior",
    title: "Designers",
    text: "Show clients accurate interior painting cost as part of design packages.",
    icon: "chair.png",
  },
  {
    span: "Homeowners",
    title: "& DIY’ers",
    text: "Estimate the cost to paint interior of house or exterior projects before hiring.",
    icon: "tools.png",
  },
  {
    span: "Painters",
    title: "& Contractors",
    text: "Win more jobs with professional, fast painting estimates.",
    icon: "brush.png",
  },
  {
    span: "Real Estate Agents",
    title: "& Property Managers",
    text: "Need a quick cost to paint a room or an entire property before listing? Middler delivers in seconds.",
    icon: "house.png",
  },
];

const WhoUseMiddler = () => {
  const swiperRef = useRef(null);
  return (
    <section className="lg:pt-[60px] lg:px-5">
      <div className="w-full max-w-[1024px] mx-auto lg:mb-[60px] max-lg:px-8">
        <div className="flex flex-col gap-5 text-center">
          <Heading
            oh
            heading="Who Uses Middler?"
            highlight="Middler?"
            className="text-[26px]"
          />
          <p className="text-sm lg:text-2xl">
            Middler is trusted by a wide range of professionals who need fast, accurate painting estimates—without the hassle.
          </p>
        </div>
      </div>
      <div className="w-full 2xl:w-[1380px]! 3xl:w-[1500px]! mx-auto relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{ clickable: true }}
          loop
          autoplay
          breakpoints={{
            0: {
              slidesPerView: 1,
              autoplay: { delay: 3000 },
            },
            768: {
              slidesPerView: 2,
              autoplay: { delay: 3000 },
            },
            1024: {
              slidesPerView: 3,
              autoplay: { delay: 3000 },
            },
            1200: {
              slidesPerView: 4,
              autoplay: false,
              spaceBetween: 20,
            },
            1400: {
              spaceBetween: 30,
              slidesPerView: 4,
            },
          }}
          className="pb-20! lg:pb-[140px]! max-lg:px-6! cards_slider"
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx} className="mt-24">
              <div
                className={`flex flex-col max-lg:justify-center items-start gap-[30px] max-lg:min-h-[330px] ${idx === 1
                  ? "p-5 rounded-[14px] shadow-[0_5px_40px] lg:shadow-[0_30px_50px] shadow-[#ababab] bg-white"
                  : "p-5 lg:py-[30px] max-lg:shadow-[0_5px_40px_#ababab] max-lg:bg-white max-lg:rounded-[14px]"
                  }`}
              >
                <div className="p-[15px] rounded-[10px] bg-primary/10">
                  <img
                    src={`/images/icons/${card.icon}`}
                    className="size-10"
                    alt={`${card.span} ${card.title}`}
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-xl lg:text-2xl font-medium leading-[34px]">
                    <span className="text-primary">{card.span}</span>{" "}
                    {card.title}
                  </h3>
                    <p className="text-sm leading-7">
                        {card.text}
                    </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="lg:hidden">
          <SwiperBtn
            direction={"prev"}
            onClick={() => swiperRef.current.slidePrev()}
          />
          <SwiperBtn
            direction={"next"}
            onClick={() => swiperRef.current.slideNext()}
          />
        </div>
      </div>
    </section>
  );
};

export default WhoUseMiddler;
