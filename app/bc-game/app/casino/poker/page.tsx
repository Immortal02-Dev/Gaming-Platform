"use client";

import React, { useState } from "react";
import BannerCarousel from "@/components/ui/carousel/BannerCarousel";
import GameCard from "@/components/ui/game-card/GameCard";
import Holdem from "@/components/modules/games/Holdem";
import TeenPatti from "@/components/modules/games/TeenPatti";
import HighRollerTable from "@/components/modules/games/HighRollerTables";
import { Banner, Game } from "@/types/game";

import GameLobbyNav from "@/components/shared/navigation/game-filter";
import { useGames } from "@/lib/useGames";
import Image from "next/image";
import Link from "next/link";

import TagStar from "@/public/assets/images/tag/star-tag.webp";
import CardTagStar from "@/public/assets/images/tag/card-tag.webp";

export default function CasinoPoker() {
  const myBanners: Banner[] = [
    {
      id: 1,
      title: "10% Bonus",
      description: "in Casino",
      image: "/assets/images/carousel/casino-top.webp",
      href: "/deposit",
      gradientColor: "#DF9148",
      isPromo: true,
    },
    {
      id: 2,
      image: "https://imgxcut.com/banner/d088ecf4bf.png?width=480",
      href: "/promotion/new-player",
      isPromo: false,
      badgeImage: "https://bc.game/assets/newplayer-C27ouDOw.png",
    },
    {
      id: 3,
      image: "	https://imgxcut.com/banner/fca210ebf3.png?_v=4,dpr=1,width=480",
      href: "/promo/1",
      isPromo: false,
    },
    {
      id: 4,
      image: "https://imgxcut.com/banner/d088ecf4bf.png?width=480",
      href: "/promo/1",
      isPromo: false,
    },
    {
      id: 5,
      image: "https://imgxcut.com/banner/d088ecf4bf.png?width=480",
      href: "/promo/1",
      isPromo: false,
    },
    // Idagdag pa ang iba...
  ];

  const [page, setPage] = useState(1);
  const limit = 16;
  const { games: myPoker, pagination } = useGames({
    category: "poker",
    page,
    limit,
  });

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < (pagination?.totalPages || 0)) setPage(page + 1);
  };

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div>
        <BannerCarousel banners={myBanners} />

        <div className="-mx-4 min-h-screen bg-layer2 px-4">
          {/* Game Filter */}
          <GameLobbyNav />
          {/* Brand Games */}
          <div className="w-full py-4">
            <div className="mb-4 flex w-full flex-col gap-6">
              <div className="flex flex-col justify-between rounded-2xl bg-layer4 py-3 pl-3 pr-3 sm:pl-6 lg:flex-row">
                <div className="flex flex-col gap-2 pb-2 pt-0 sm:gap-6 sm:pb-4 sm:pt-4 lg:max-w-[40%] lg:pr-8">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex w-fit items-center sm:w-full">
                      <Image className="w-8" src={TagStar} alt="Tag Star" />
                      <div className="ml-3 text-xl font-extrabold">
                        Editor's Picks
                      </div>
                    </div>
                    <Link
                      href="/gamelist/editor"
                      className="button ml-auto flex h-8 items-center gap-1 rounded-lg bg-black_alpha5 px-2 font-extrabold sm:hidden dark:bg-layer5 inactive"
                    >
                      All
                      <div className="icon size-4! rotate-180 fill-secondary">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                        </svg>
                      </div>
                    </Link>
                  </div>
                  <div className="flex h-fit w-full flex-row justify-between gap-6 lg:flex-col lg:justify-start">
                    <div className="text-sm text-secondary">
                      Stack your luck and chase the big hands! Dive into this
                      week’s spotlight — Bonus Poker!
                    </div>
                    <button
                      className="button button-second button-s hidden w-fit min-w-24 px-4 sm:flex"
                      type="button"
                    >
                      View All
                    </button>
                  </div>
                </div>
                <div className="flex h-fit grow items-center justify-end gap-3">
                  <div
                    className="relative max-h-50 w-full max-w-37.5 transition-all hover:-translate-y-2 [&amp;&gt;*]:hover:!translate-y-0"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <Image
                      className="absolute left-4 top-0 z-10 w-8"
                      alt="Tag Start"
                      src={CardTagStar}
                    />
                    <Link
                      href="/game/texas-hold-em-bonus-poker-by-evolution-gaming"
                      className="game-item group relative flex size-full flex-col items-center overflow-hidden rounded-lg transition-all hover:-translate-y-2! inactive"
                    >
                      <img
                        className="w-full"
                        alt="Texas Hold'em Bonus Poker"
                        src="https://imgxcut.com/game/image/ca4ca9464b.png?_v=4,dpr=1,width=200"
                      />
                      <div className="absolute bottom-1 right-1 flex h-5 items-center rounded-md bg-black_alpha20 px-1.5">
                        <div className="icon size-4! fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M26.1137 20.6693C26.6674 23.8341 24.4618 26.132 21.3885 26.6484C18.4196 27.1469 13.5818 27.1469 10.6138 26.6484C7.5397 26.132 5.3341 23.8349 5.88853 20.6702C6.35798 17.9846 8.63481 16.3107 11.4143 16.4548C13.4451 16.56 14.6923 16.8239 16.1371 16.8239C17.5981 16.8239 18.5718 16.5592 20.588 16.4548C23.3674 16.3091 25.6443 17.9838 26.1137 20.6693ZM16.1007 4.66211C19.021 4.66211 21.3885 7.02959 21.3885 9.9499C21.3885 12.8702 19.021 15.2377 16.1007 15.2377C13.1804 15.2377 10.8121 12.8694 10.8121 9.9499C10.8121 7.0304 13.1796 4.66211 16.1007 4.66211Z"></path>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-alw_white">
                          11
                        </span>
                      </div>
                      <div className="center absolute left-0 top-0 h-full w-full cursor-pointer bg-[#00000099] opacity-0 group-hover:opacity-100">
                        <div className="center absolute left-0 top-0 flex h-[40%] w-full px-2 text-center font-extrabold leading-4 text-[white]">
                          Texas Hold'em Bonus Poker
                        </div>
                        <div className="center flex h-9 w-9 rounded-full bg-white_alpha20 transition-all duration-300 group-hover:scale-150">
                          <div className="icon size-full fill-alw_white">
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M24.9106 13.9439L13.964 6.44441C13.5849 6.18474 13.1412 6.03268 12.681 6.0047C12.2209 5.97673 11.7617 6.07391 11.3534 6.28572C10.945 6.49753 10.603 6.81589 10.3645 7.2063C10.1259 7.59671 9.99987 8.04429 10 8.50052V23.4995C9.99987 23.9557 10.1259 24.4033 10.3645 24.7937C10.603 25.1841 10.945 25.5025 11.3534 25.7143C11.7617 25.9261 12.2209 26.0233 12.681 25.9953C13.1412 25.9673 13.5849 25.8153 13.964 25.5556L24.9106 18.0561C25.2467 17.8261 25.5214 17.5189 25.7111 17.1608C25.9009 16.8027 26 16.4044 26 16C26 15.5956 25.9009 15.1973 25.7111 14.8392C25.5214 14.4811 25.2467 14.1739 24.9106 13.9439Z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="relative max-h-50 w-full max-w-37.5 transition-all hover:-translate-y-2 [&amp;&gt;*]:hover:!translate-y-0"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <Image
                      className="absolute left-4 top-0 z-10 w-8"
                      alt="Tag Start"
                      src={CardTagStar}
                    />
                    <Link
                      href="/game/texas-hold-em-bonus-poker-by-evolution-gaming"
                      className="game-item group relative flex size-full flex-col items-center overflow-hidden rounded-lg transition-all hover:-translate-y-2! inactive"
                    >
                      <img
                        className="w-full"
                        alt="Texas Hold'em Bonus Poker"
                        src="https://imgxcut.com/game/image/ca4ca9464b.png?_v=4,dpr=1,width=200"
                      />
                      <div className="absolute bottom-1 right-1 flex h-5 items-center rounded-md bg-black_alpha20 px-1.5">
                        <div className="icon size-4! fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M26.1137 20.6693C26.6674 23.8341 24.4618 26.132 21.3885 26.6484C18.4196 27.1469 13.5818 27.1469 10.6138 26.6484C7.5397 26.132 5.3341 23.8349 5.88853 20.6702C6.35798 17.9846 8.63481 16.3107 11.4143 16.4548C13.4451 16.56 14.6923 16.8239 16.1371 16.8239C17.5981 16.8239 18.5718 16.5592 20.588 16.4548C23.3674 16.3091 25.6443 17.9838 26.1137 20.6693ZM16.1007 4.66211C19.021 4.66211 21.3885 7.02959 21.3885 9.9499C21.3885 12.8702 19.021 15.2377 16.1007 15.2377C13.1804 15.2377 10.8121 12.8694 10.8121 9.9499C10.8121 7.0304 13.1796 4.66211 16.1007 4.66211Z"></path>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-alw_white">
                          11
                        </span>
                      </div>
                      <div className="center absolute left-0 top-0 h-full w-full cursor-pointer bg-[#00000099] opacity-0 group-hover:opacity-100">
                        <div className="center absolute left-0 top-0 flex h-[40%] w-full px-2 text-center font-extrabold leading-4 text-[white]">
                          Texas Hold'em Bonus Poker
                        </div>
                        <div className="center flex h-9 w-9 rounded-full bg-white_alpha20 transition-all duration-300 group-hover:scale-150">
                          <div className="icon size-full fill-alw_white">
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M24.9106 13.9439L13.964 6.44441C13.5849 6.18474 13.1412 6.03268 12.681 6.0047C12.2209 5.97673 11.7617 6.07391 11.3534 6.28572C10.945 6.49753 10.603 6.81589 10.3645 7.2063C10.1259 7.59671 9.99987 8.04429 10 8.50052V23.4995C9.99987 23.9557 10.1259 24.4033 10.3645 24.7937C10.603 25.1841 10.945 25.5025 11.3534 25.7143C11.7617 25.9261 12.2209 26.0233 12.681 25.9953C13.1412 25.9673 13.5849 25.8153 13.964 25.5556L24.9106 18.0561C25.2467 17.8261 25.5214 17.5189 25.7111 17.1608C25.9009 16.8027 26 16.4044 26 16C26 15.5956 25.9009 15.1973 25.7111 14.8392C25.5214 14.4811 25.2467 14.1739 24.9106 13.9439Z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div
                    className="relative max-h-50 w-full max-w-37.5 transition-all hover:-translate-y-2 [&amp;&gt;*]:hover:!translate-y-0"
                    style={{ aspectRatio: "3/4" }}
                  >
                    <Image
                      className="absolute left-4 top-0 z-10 w-8"
                      alt="Tag Start"
                      src={CardTagStar}
                    />
                    <Link
                      href="/game/texas-hold-em-bonus-poker-by-evolution-gaming"
                      className="game-item group relative flex size-full flex-col items-center overflow-hidden rounded-lg transition-all hover:-translate-y-2! inactive"
                    >
                      <img
                        className="w-full"
                        alt="Texas Hold'em Bonus Poker"
                        src="https://imgxcut.com/game/image/ca4ca9464b.png?_v=4,dpr=1,width=200"
                      />
                      <div className="absolute bottom-1 right-1 flex h-5 items-center rounded-md bg-black_alpha20 px-1.5">
                        <div className="icon size-4! fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M26.1137 20.6693C26.6674 23.8341 24.4618 26.132 21.3885 26.6484C18.4196 27.1469 13.5818 27.1469 10.6138 26.6484C7.5397 26.132 5.3341 23.8349 5.88853 20.6702C6.35798 17.9846 8.63481 16.3107 11.4143 16.4548C13.4451 16.56 14.6923 16.8239 16.1371 16.8239C17.5981 16.8239 18.5718 16.5592 20.588 16.4548C23.3674 16.3091 25.6443 17.9838 26.1137 20.6693ZM16.1007 4.66211C19.021 4.66211 21.3885 7.02959 21.3885 9.9499C21.3885 12.8702 19.021 15.2377 16.1007 15.2377C13.1804 15.2377 10.8121 12.8694 10.8121 9.9499C10.8121 7.0304 13.1796 4.66211 16.1007 4.66211Z"></path>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-alw_white">
                          11
                        </span>
                      </div>
                      <div className="center absolute left-0 top-0 h-full w-full cursor-pointer bg-[#00000099] opacity-0 group-hover:opacity-100">
                        <div className="center absolute left-0 top-0 flex h-[40%] w-full px-2 text-center font-extrabold leading-4 text-[white]">
                          Texas Hold'em Bonus Poker
                        </div>
                        <div className="center flex h-9 w-9 rounded-full bg-white_alpha20 transition-all duration-300 group-hover:scale-150">
                          <div className="icon size-full fill-alw_white">
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M24.9106 13.9439L13.964 6.44441C13.5849 6.18474 13.1412 6.03268 12.681 6.0047C12.2209 5.97673 11.7617 6.07391 11.3534 6.28572C10.945 6.49753 10.603 6.81589 10.3645 7.2063C10.1259 7.59671 9.99987 8.04429 10 8.50052V23.4995C9.99987 23.9557 10.1259 24.4033 10.3645 24.7937C10.603 25.1841 10.945 25.5025 11.3534 25.7143C11.7617 25.9261 12.2209 26.0233 12.681 25.9953C13.1412 25.9673 13.5849 25.8153 13.964 25.5556L24.9106 18.0561C25.2467 17.8261 25.5214 17.5189 25.7111 17.1608C25.9009 16.8027 26 16.4044 26 16C26 15.5956 25.9009 15.1973 25.7111 14.8392C25.5214 14.4811 25.2467 14.1739 24.9106 13.9439Z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                <Holdem />
                <TeenPatti />
                <HighRollerTable />
              </div>

              <div className="text-xl font-extrabold">Browse All</div>
            </div>

            <div className="flex flex-wrap gap-2 [&amp;&gt;*]:max-w-[50%] sm:[&amp;&gt;*]:max-w-72">
              <button
                className="button button-m select bg-input_bright flex-1"
                type="button"
              >
                <span className="mr-1 text-secondary">Sort By:</span>Popular
                <div className="size-6 ml-auto bg-input_button center rounded-md ">
                  <div className="icon size-4! transition-all -rotate-90">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </div>
              </button>
              <button
                className="button button-m select bg-input_bright flex-1"
                type="button"
              >
                <span className="mr-1 text-secondary">Providers:</span>
                <span>All</span>
                <div className="size-6 ml-auto bg-input_button center rounded-md">
                  <div className="icon size-4! transition-all -rotate-90">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </div>
              </button>
              <div className="flex items-center py-2 pl-2 sm:ml-auto">
                <span className="mr-2">Show Blocked</span>
                <div className="switch switch-xs bg-input_bright">
                  <div></div>
                </div>
              </div>
            </div>

            <div className="grid mt-4 gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {myPoker.map((item) => (
                <GameCard key={item.id} game={item} />
              ))}
            </div>

            <div className="w-full center mt-4 flex">
              <div className="flex items-center gap-x-[0.15rem] ">
                <button
                  disabled={page <= 1}
                  onClick={handlePrevPage}
                  className="button button-m pagination-button pagination-prev"
                  type="button"
                >
                  <div className="icon size-4! text-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
                <div className="pagination">
                  <input
                    size={2}
                    className="pagination-current"
                    value={String(page).padStart(2, "0")}
                    readOnly
                  />
                  <span className="text-tertiary">of</span>
                  <div className="p-2 min-w-8 h-8 justify-center flex items-center">
                    <span>
                      {String(pagination?.totalPages || 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <button
                  disabled={page >= (pagination?.totalPages || 1)}
                  onClick={handleNextPage}
                  className="button button-m pagination-button pagination-next"
                  type="button"
                >
                  <div className="icon size-4! rotate-180 text-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
