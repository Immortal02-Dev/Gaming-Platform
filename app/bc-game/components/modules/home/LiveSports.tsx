"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

export default function HomeLiveSports() {
  const swiperRef = useRef<SwiperType>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const LIVE_MATCHES = [
    {
      id: 1,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Navbahor",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/40263.png",
        score: 0,
      },
      team2: {
        name: "Bagdad",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png", // Fallback typical logo
        score: 0,
      },
      outcomes: [
        { name: "1", value: "1.65" },
        { name: "draw", value: "4.5" },
        { name: "2", value: "3.8" },
      ],
      extra: "+3",
    },
    {
      id: 2,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Fardu Ferghana",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Xavokand",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      outcomes: [
        { name: "1", value: "3.9" },
        { name: "draw", value: "3.7" },
        { name: "2", value: "1.8" },
      ],
      extra: "+3",
    },
    {
      id: 3,
      sport: "eSoccer",
      league: "FA Cup (2x6 min)",
      status: "2nd half",
      team1: {
        name: "Man. United",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Arsenal FC",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344890497778196512.png",
        score: 1,
      },
      outcomes: [
        { name: "1", value: "17.0" },
        { name: "draw", value: "3.0" },
        { name: "2", value: "1.39" },
      ],
      extra: "+1",
    },
    {
      id: 4,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Navbahor",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/40263.png",
        score: 0,
      },
      team2: {
        name: "Bagdad",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png", // Fallback typical logo
        score: 0,
      },
      outcomes: [
        { name: "1", value: "1.65" },
        { name: "draw", value: "4.5" },
        { name: "2", value: "3.8" },
      ],
      extra: "+3",
    },
    {
      id: 5,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Fardu Ferghana",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Xavokand",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      outcomes: [
        { name: "1", value: "3.9" },
        { name: "draw", value: "3.7" },
        { name: "2", value: "1.8" },
      ],
      extra: "+3",
    },
    {
      id: 6,
      sport: "eSoccer",
      league: "FA Cup (2x6 min)",
      status: "2nd half",
      team1: {
        name: "Man. United",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Arsenal FC",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344890497778196512.png",
        score: 1,
      },
      outcomes: [
        { name: "1", value: "17.0" },
        { name: "draw", value: "3.0" },
        { name: "2", value: "1.39" },
      ],
      extra: "+1",
    },
    {
      id: 7,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Navbahor",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/40263.png",
        score: 0,
      },
      team2: {
        name: "Bagdad",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png", // Fallback typical logo
        score: 0,
      },
      outcomes: [
        { name: "1", value: "1.65" },
        { name: "draw", value: "4.5" },
        { name: "2", value: "3.8" },
      ],
      extra: "+3",
    },
    {
      id: 8,
      sport: "Soccer",
      league: "Club Friendly Games",
      status: "1st half",
      team1: {
        name: "Fardu Ferghana",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Xavokand",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      outcomes: [
        { name: "1", value: "3.9" },
        { name: "draw", value: "3.7" },
        { name: "2", value: "1.8" },
      ],
      extra: "+3",
    },
    {
      id: 9,
      sport: "eSoccer",
      league: "FA Cup (2x6 min)",
      status: "2nd half",
      team1: {
        name: "Man. United",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344930974405632002.png",
        score: 0,
      },
      team2: {
        name: "Arsenal FC",
        logo: "https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2344890497778196512.png",
        score: 1,
      },
      outcomes: [
        { name: "1", value: "17.0" },
        { name: "draw", value: "3.0" },
        { name: "2", value: "1.39" },
      ],
      extra: "+1",
    },
  ];

  return (
    <>
      <div className="mt-2 flex items-center sm:mt-6 h-8">
        <h2 className="flex items-center text-base font-extrabold text-primary">
          Live Sports
        </h2>
        <a
          className="button ml-auto flex items-center gap-1 rounded-lg font-extrabold h-8! bg-black_alpha5 px-2 dark:bg-layer5"
          href="/sports/live"
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

      <div className="mt-3">
        {mounted ? (
          <Swiper
            modules={[Navigation]}
            spaceBetween={8}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="w-full"
          >
            {LIVE_MATCHES.map((match) => (
              <SwiperSlide key={match.id} className="w-85 md:w-100">
                <div className="relative flex h-full w-full cursor-pointer flex-col rounded-xl bg-layer4 px-3 py-2.5">
                  <p className="flex max-w-full items-center text-ellipsis whitespace-nowrap font-semibold">
                    <span>{match.sport}</span>
                    <span className="sports-dont ml-1.5" />
                    <span className="ml-1.5 truncate">{match.league}</span>
                  </p>
                  <div className="absolute right-2 top-2.5 flex h-6 items-center rounded-md px-1.5 bg-brand/10 text-brand">
                    <svg height="8" viewBox="0 0 7 8" width="7">
                      <path
                        className="fill-brand"
                        d="M6.00976 3.14495L1.51853 0.42138C0.852092 0.0172424 0 0.497043 0 1.27644V6.72358C0 7.50297 0.852091 7.98278 1.51852 7.57864L6.00976 4.85507C6.65173 4.46577 6.65173 3.53425 6.00976 3.14495Z"
                      />
                    </svg>
                    <span className="ml-0.5">Live</span>
                  </div>
                  <div className="flex grow flex-col justify-between">
                    <div className="center flex flex-1 items-center">
                      <div className="mt-4 flex w-full items-center justify-between">
                        <div className="flex w-1/3 flex-none flex-col items-center justify-center">
                          <div className="sports-banner-match-icon h-12">
                            <img
                              alt={match.team1.name}
                              className="h-12 w-auto object-contain"
                              src={match.team1.logo}
                            />
                          </div>
                          <p className="mt-1.5 text-center font-semibold truncate w-full">
                            {match.team1.name}
                          </p>
                        </div>
                        <div className="flex w-1/3 flex-none flex-col items-center justify-center">
                          <p className="text-2xl">
                            <span className="font-semibold">
                              {match.team1.score}
                            </span>
                            <span className="mx-1">:</span>
                            <span className="font-semibold">
                              {match.team2.score}
                            </span>
                          </p>
                          <p className="mt-2 text-secondary">{match.status}</p>
                        </div>
                        <div className="flex w-1/3 flex-none flex-col items-center justify-center">
                          <div className="sports-banner-match-icon h-12">
                            <img
                              alt={match.team2.name}
                              className="h-12 w-auto object-contain"
                              src={match.team2.logo}
                            />
                          </div>
                          <p className="mt-1.5 text-center font-semibold truncate w-full">
                            {match.team2.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex w-full items-center justify-between gap-2">
                      {match.outcomes.map((outcome, idx) => (
                        <div
                          key={idx}
                          className="flex h-10 flex-1 items-center justify-center rounded-lg font-semibold"
                          style={{
                            background: "rgba(252, 60, 60, 0.15)",
                          }}
                        >
                          <span>{outcome.name}</span>
                          <span className="ml-2 text-error">
                            {outcome.value}
                          </span>
                        </div>
                      ))}
                      <div className="flex h-10 flex-none px-3 items-center justify-center rounded-lg bg-layer5 font-semibold">
                        <span>{match.extra}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-[200px] w-full" />
        )}
      </div>
    </>
  );
}
