"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useSports } from "@/lib/useSports";
import { cn } from "@/lib/utils";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SportIcon = ({ sport }: { sport: string }) => {
  if (sport === "soccer" || sport === "fifa") {
    return (
      <svg
        data-cy="sport-soccer"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        style={{ fill: "currentcolor", width: "auto", height: "16px" }}
      >
        <path d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4Z" />
      </svg>
    );
  }
  return (
    <svg
      data-cy={`sport-${sport}`}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      style={{ fill: "currentcolor", width: "auto", height: "16px" }}
    >
      <circle cx="16" cy="16" r="8" />
    </svg>
  );
};

export default function SportsCarousel() {
  const { matches, loading } = useSports({ type: "popular" });

  if (loading) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center opacity-50 text-white">
        Loading Highlights...
      </div>
    );
  }

  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="w-full" style={{ animationDuration: "0.4s" }}>
      <div
        className="relative flex items-center mt-4 mb-6"
        style={{ marginLeft: "-16px", marginRight: "-16px" }}
      >
        <div className="w-full h-full relative">
          <div className="w-full h-full relative max-w-full">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={"auto"}
              navigation={false}
              pagination={false}
              className="px-4"
              style={{ paddingLeft: "16px", paddingRight: "16px" }}
            >
              {matches.map((item) => (
                <SwiperSlide key={item.id} className="w-full md:w-90!">
                  <div
                    className="relative w-full h-full overflow-hidden rounded-xl text-white"
                    data-editor-id="banner"
                  >
                    <div className="relative w-full h-full cursor-pointer">
                      <div className="sports-carousel__banner">
                        <img
                          alt="banner"
                          src="https://static.sptpub.com/promo/images/2103509236163162112/banner/2262189213648818178_2612327308962443273_large.jpeg"
                        />
                      </div>
                      <div className="sports-carousel__content">
                        <div className="relative w-full h-4.75 flex items-center mb-1.5 font-semibold">
                          <div
                            className="relative flex text-start text-[11px] mr-2 text-white overflow-hidden"
                            style={{ flex: "1 1 0%" }}
                          >
                            <div className="sports-carousel__wrapper">
                              <div className="sports-carousel__head">
                                <span className="inline-block me-1">
                                  <SportIcon sport={item.sport} />
                                </span>
                                <span className="sports-carousel__league">
                                  {item.country && `${item.country} - `}
                                  {item.league}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="relative flex text-start text-[11px] mr-2 text-white overflow-hidden"
                            style={{ flex: "1 1 0%" }}
                          >
                            <div className="sc-16ixfl8-0 czSLDX sc-i0i4ac-4 kxKxHU">
                              {item.status}
                            </div>
                            {item.isLive && (
                              <span className="sc-i0i4ac-2 fHdwoQ ml-1">
                                <svg
                                  data-cy="ic-live-simple"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="#FF4E4E"
                                  style={{ height: "16px", width: "auto" }}
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="4"
                                    fill="rgb(205, 48, 48)"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="sports-carousel__team">
                          <div className="sc-1djzvw3-9 hYSQcR">
                            <div className="sc-1djzvw3-6 jNbDHg">
                              <img
                                alt={item.teams[0].name}
                                height="32"
                                width="32"
                                className="bt221 block"
                                src={
                                  item.teams[0].logo ||
                                  "https://d1bvoel1nv172p.cloudfront.net/additional_images/medium/default.png"
                                }
                              />
                            </div>
                            <div className="sc-1djzvw3-7 faLVpZ">
                              {item.teams[0].name}
                            </div>
                          </div>
                          <div className="sc-1djzvw3-4 hQMUyc">
                            <div className="sc-1djzvw3-5 hoSVJk">
                              {item.teams[0].score ?? 0}
                            </div>
                            <div className="sc-1djzvw3-5 hoSVJk">
                              {item.teams[1].score ?? 0}
                            </div>
                          </div>
                          <div className="sc-1djzvw3-9 hYSQQj">
                            <div className="sc-1djzvw3-6 jNbDHg">
                              <img
                                alt={item.teams[1].name}
                                height="32"
                                width="32"
                                className="bt221 block"
                                src={
                                  item.teams[1].logo ||
                                  "https://d1bvoel1nv172p.cloudfront.net/additional_images/medium/default.png"
                                }
                              />
                            </div>
                            <div className="sc-1djzvw3-7 faLVpZ">
                              {item.teams[1].name}
                            </div>
                          </div>
                        </div>
                        <div className="sc-1djzvw3-11 fqnvqe">
                          <div className="sc-rw1scb-0 fxXyNB">
                            <div
                              className={cn(
                                "sports-carousel__grid sc-rw1scb-1 hrpbWo",
                                item.outcomes.length === 3
                                  ? "sport-carousel__cols3"
                                  : "sport-carousel__cols2",
                              )}
                            >
                              {item.outcomes.map((outcome, idx) => (
                                <div key={idx} className="sc-7elhv3-0 brpFEg">
                                  <div className="bt366"></div>
                                  <div className="sc-7elhv3-2 gqtgDA">
                                    <span className="sc-7elhv3-3 eLRtIa">
                                      {outcome.name}
                                    </span>
                                  </div>
                                  <div className="bt370 sc-7elhv3-1 czEJPY">
                                    <span className="bt372">
                                      {outcome.value}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
