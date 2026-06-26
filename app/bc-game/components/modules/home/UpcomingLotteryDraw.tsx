"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const LOTTERY_DRAWS = [
  {
    id: 1,
    name: "Greece KENO",
    variant: "20/80",
    prize: "₩54,603,572",
    country: "Greece",
    countryOffset: "-1300%",
    bg: "https://bc.game/modules/lottery2/assets/bg-1_w-XjNVjf3I.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-1_w-BxOSQLbf.png",
    borderColor: "rgb(136, 119, 65)",
    time: { h: "00h", m: "00m", s: "00s" },
  },
  {
    id: 2,
    name: "Italy 10e Lotto",
    variant: "20/90",
    prize: "₩5,747,744",
    country: "Italy",
    countryOffset: "-1600%",
    bg: "https://bc.game/modules/lottery2/assets/bg-2_w-CKc56SJt.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-2_w-BK-dAhEe.png",
    borderColor: "rgb(87, 125, 80)",
    time: { h: "00h", m: "00m", s: "00s" },
  },
  {
    id: 3,
    name: "FAST KENO",
    variant: "20/80",
    prize: "₩4,310,808",
    country: "Malta",
    countryOffset: "-2000%",
    bg: "https://bc.game/modules/lottery2/assets/bg-3_w-MIQXL_5N.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-3_w-H5oLhD9D.png",
    borderColor: "rgb(124, 125, 80)",
    time: { h: "00h", m: "00m", s: "00s" },
  },
  {
    id: 4,
    name: "Slovakia EKlub Keno",
    variant: "20/80",
    prize: "₩14,369,361",
    country: "Slovakia",
    countryOffset: "-3000%",
    bg: "https://bc.game/modules/lottery2/assets/bg-4_w-Csr62FpN.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-4_w-CpB-Mm3P.png",
    borderColor: "rgb(125, 80, 107)",
    time: { h: "00h", m: "00m", s: "00s" },
  },
  {
    id: 5,
    name: "Poland Keno",
    variant: "20/70",
    prize: "₩2,155,404",
    country: "Poland",
    countryOffset: "-2600%",
    bg: "https://bc.game/modules/lottery2/assets/bg-5_w-BPVVcGAx.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-5_w-BgAMH9Yt.png",
    borderColor: "rgb(80, 100, 125)",
    time: { h: "00h", m: "01m", s: "22s" },
  },
  {
    id: 6,
    name: "Spanish Express",
    variant: "20/70",
    prize: "₩2,155,404",
    country: "Spain",
    countryOffset: "-3200%",
    bg: "https://bc.game/modules/lottery2/assets/bg-6_w-BdtrSW_o.png",
    ball: "https://bc.game/modules/lottery2/assets/ball-6_w-BNY-2VP6.png",
    borderColor: "rgb(87, 125, 80)",
    time: { h: "00h", m: "01m", s: "22s" },
  },
];

export default function UpcomingLotteryDraw() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <>
      <div className="mt-2 flex items-center sm:mt-6 h-8">
        <h2 className="flex items-center text-base font-extrabold text-primary">
          Upcoming Lottery Draw
        </h2>
        <a
          className="button ml-auto flex items-center gap-1 rounded-lg font-extrabold h-8! bg-black_alpha5 px-2 dark:bg-layer5"
          href="/lottery"
        >
          All
        </a>
        <div className="ml-2 flex gap-x-1">
          <button
            className="button button-second button-m size-8! bg-layer5 p-0!"
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <div className="icon size-4!">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"
                />
              </svg>
            </div>
          </button>
          <button
            className="button button-second button-m size-8! bg-layer5 p-0!"
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <div className="icon size-4! rotate-180">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="mt-2">
        <Swiper
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={2}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          className="w-full"
        >
          {LOTTERY_DRAWS.map((draw) => (
            <SwiperSlide key={draw.id} className="w-full sm:w-55!">
              <div className="shrink-0 flex flex-col mx-0.5 font-sans select-none group">
                <div
                  className="@container rounded-xl aspect-2/1 leading-[1.28] pt-[6.3%] pb-[4.2%] w-full relative bg-layer4 flex flex-col"
                  style={{
                    backgroundImage: `url("${draw.bg}")`,
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                  }}
                >
                  <div className="aspect-square w-[16.8%] absolute top-1 left-1 overflow-hidden rounded-full">
                    <img
                      alt={draw.country}
                      className="w-full absolute left-0 max-w-none"
                      src="https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png"
                      style={{
                        top: draw.countryOffset,
                      }}
                    />
                  </div>
                  <div
                    className="text-[7.37cqw] font-extrabold text-center mx-auto w-[56%] text-ellipsis line-clamp-2 text-primary"
                    title={`${draw.name} ${draw.variant}`}
                  >
                    {draw.name}
                    <span className="text-primary"> {draw.variant}</span>
                  </div>
                  <img
                    alt="ball"
                    className="h-[90%] absolute bottom-0 left-0 z-1"
                    src={draw.ball}
                  />
                  <div
                    className="mt-auto w-[70%] h-[40%] text-[9.47cqw] mx-auto flex center border bg-black_alpha10 border-dashed rounded-lg font-extrabold"
                    style={{
                      borderColor: draw.borderColor,
                    }}
                  >
                    {draw.prize}
                  </div>
                </div>
                <div
                  className="w-[90%] mx-auto"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgb(var(--layer4)) 50%, transparent 0)",
                    backgroundRepeat: "round",
                    backgroundSize: "10px 100%",
                    height: "5px",
                  }}
                />
                <div className="bg-layer4 rounded-xl p-2 flex flex-col gap-1">
                  <button
                    className="button button-brand button-m w-full h-8!"
                    type="button"
                  >
                    Bet Now
                  </button>
                  <div className="text-secondary text-sm">
                    Next Draw Starts in
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-layer5 px-1.5 py-1 flex-1 rounded-lg text-center">
                      {draw.time.h}
                    </span>
                    <span>:</span>
                    <span className="bg-layer5 px-1.5 py-1 flex-1 rounded-lg text-center">
                      {draw.time.m}
                    </span>
                    <span>:</span>
                    <span className="bg-layer5 px-1.5 py-1 flex-1 rounded-lg text-center">
                      {draw.time.s}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
