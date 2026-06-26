"use client";
import React, { useState } from "react";
import BannerCarousel from "@/components/ui/carousel/BannerCarousel";
import GameCard from "@/components/ui/game-card/GameCard";
import { Banner } from "@/types/game";

import GameLobbyNav from "@/components/shared/navigation/game-filter";
import { useGames } from "@/lib/useGames";

export default function CasinoBrand() {
  const [page, setPage] = useState(1);
  const limit = 16;
  const { games: myBrand, pagination } = useGames({
    category: "brand",
    page,
    limit,
  });

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < (pagination?.totalPages || 0)) setPage(page + 1);
  };

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
  ];

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div>
        <BannerCarousel banners={myBanners} />

        <div className="-mx-4 min-h-screen bg-layer2 px-4">
          {/* Game Filter */}
          <GameLobbyNav />
          {/* Brand Games */}
          <div className="w-full py-4">
            <div className="grid mt-4 gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {myBrand.map((item) => (
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
