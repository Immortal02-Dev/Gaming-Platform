"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify-icon/react";
import Image from "next/image";

const images = [
  { src: "/assets/images/carousel/admin/back_img_1.png", alt: "Dashboard 1" },
  { src: "/assets/images/carousel/admin/back_img_2.png", alt: "Dashboard 2" },
  { src: "/assets/images/carousel/admin/back_img_3.png", alt: "Dashboard 3" },
  { src: "/assets/images/carousel/admin/back_img_4.png", alt: "Dashboard 4" },
  { src: "/assets/images/carousel/admin/back_img_5.png", alt: "Dashboard 5" },
  { src: "/assets/images/carousel/admin/back_img_6.png", alt: "Dashboard 6" },
  { src: "/assets/images/carousel/admin/back_img_7.png", alt: "Dashboard 7" },
  { src: "/assets/images/carousel/admin/back_img_8.png", alt: "Dashboard 8" },
];

export function DashboardSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let swiperInstance: import("swiper").default | null = null;

    const init = async () => {
      const { default: Swiper } = await import("swiper");
      const { Autoplay, Navigation } = await import("swiper/modules");
      await import("swiper/css");

      if (!containerRef.current || !nextRef.current || !prevRef.current) return;

      swiperInstance = new Swiper(containerRef.current, {
        modules: [Autoplay, Navigation],
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        },
        grabCursor: true,
        spaceBetween: 16,
        slidesPerView: 1,
      });
    };

    init();

    return () => {
      swiperInstance?.destroy(true, true);
    };
  }, []);

  return (
    <div className="relative">
      <div
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        className="relative focus:outline-none w-full max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:grid !pb-0 sm:py-24 lg:py-32 !pt-0 gap-4 sm:gap-4"
      >
        <div className="overflow-hidden">
          {/* Swiper container — minimal wrapper, no style changes to siblings */}
          <div className="swiper" ref={containerRef}>
            <div className="swiper-wrapper">
              {images.map((img) => (
                <div
                  key={img.src}
                  role="group"
                  aria-roledescription="slide"
                  className="swiper-slide"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} className="rounded-lg" alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          {/* <div className="">
            <button
              type="button"
              ref={prevRef}
              aria-label="Prev"
              className="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted p-1.5 absolute rounded-full start-4 sm:-start-12 top-1/2 -translate-y-1/2"
            >
              <Icon
                icon="lucide:arrow-left"
                className="size-5 shrink-0"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              ref={nextRef}
              aria-label="Next"
              className="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-1.5 ring ring-inset ring-accented text-default bg-default hover:bg-elevated active:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted p-1.5 absolute rounded-full end-4 sm:-end-12 top-1/2 -translate-y-1/2"
            >
              <Icon
                icon="lucide:arrow-right"
                className="size-5 shrink-0"
                aria-hidden="true"
              />
            </button>
          </div> */}
          {/**/}
        </div>
      </div>
      <div className="absolute bottom-[-30%] sm:bottom-[20%] left-1/2 -translate-x-1/2 flex gap-2 flex-col sm:flex-row">
        <a
          href="https://agent-dash.iconsold.com"
          rel="noopener noreferrer"
          target="_blank"
          className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-3 py-2 gap-2 justify-center bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white h-[46px] w-full max-w-[180px] text-sm"
        >
          <span
            className="iconify i-heroicons:arrow-top-right-on-square shrink-0 size-6"
            aria-hidden="true"
          />
          <span className="truncate">관리자 데모 확인하기</span>
          {/**/}
        </a>
        <a
          href="https://partner-dash.iconsold.com"
          rel="noopener noreferrer"
          target="_blank"
          className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-3 py-2 gap-2 justify-center bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white h-[46px] w-full max-w-[180px] text-sm"
        >
          <span
            className="iconify i-heroicons:arrow-top-right-on-square shrink-0 size-6"
            aria-hidden="true"
          />
          <span className="truncate">파트너 데모 확인하기</span>
          {/**/}
        </a>
      </div>
    </div>
  );
}
