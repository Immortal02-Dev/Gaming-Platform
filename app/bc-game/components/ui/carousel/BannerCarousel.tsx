"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Banner } from "@/types/game";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// I-import ang iyong updated CSS Module
import styles from "./carousel.module.css";

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  return (
    // Gagamitin natin ang carouselWrapper para sa hover effect ng arrows
    <div
      className={`${styles.carouselWrapper} banner-bg relative -mx-4 -mt-4 pt-sh sm:mx-0 sm:mt-0 sm:pt-0`}
    >
      <div className="carousel-wrap relative group">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={8}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className={`${styles.swiperContainer} mySwiper h-44 sm:h-auto`}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {banners.map((item) => (
            <SwiperSlide key={item.id} style={{ width: "394.667px" }}>
              <div className="px-3 pt-0.5 sm:px-0! ">
                {/* --- BADGE LOGIC START --- */}
                {item.badgeImage && (
                  <div className="absolute -top-0.5 right-4 w-12 z-20 pointer-events-none sm:right-0">
                    <img src={item.badgeImage} alt="badge" className="w-full" />
                  </div>
                )}

                {/* --- BADGE LOGIC END --- */}
                {item.isPromo ? (
                  <div
                    className="relative z-0 flex h-auto cursor-pointer flex-col justify-center rounded-xl bg-layer4 px-7 py-4"
                    style={{
                      backgroundImage: `linear-gradient(240deg, ${
                        item.gradientColor || "#DF9148"
                      } -16%, transparent 70%)`,
                    }}
                  >
                    <div className="absolute right-0 top-0 -z-10">
                      <Image
                        className="h-full"
                        src={item.image}
                        alt="bonus"
                        width={170}
                        height={170}
                        priority
                      />
                    </div>
                    <div>
                      <div className="flex flex-col gap-y-1">
                        <div className="text-2xl font-extrabold text-brand">
                          {item.title}
                        </div>
                        <div className="max-w-44 text-wrap text-xl font-semibold text-primary">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 flex items-end gap-x-2">
                      <Link
                        href={item.href}
                        className="button button-brand button-s px-2! text-sm"
                      >
                        {item.buttonText || "Deposit Now"}
                      </Link>
                      <button className="button button-xs text-xs font-extrabold underline">
                        Learn More
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="center size-full overflow-hidden rounded-xl text-5xl"
                  >
                    <img
                      className="banner-img size-full"
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
