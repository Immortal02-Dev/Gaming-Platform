"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function RecentBigWins() {
  const [activeTab, setActiveTab] = useState("All");

  const allGames = [
    {
      id: 1,
      user: "Gjdksocorie",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/15029_Gates of Olympus 1000.png?_v=4,dpr=1,width=200",
      win: "₩2,138M",
    },
    {
      id: 2,
      user: "daBaby90",
      category: "Slots",
      img: "https://imgxcut.com/game/image/5941_Fruit Party 2.png?_v=4,dpr=1,width=200",
      win: "₩1,744M",
    },
    {
      id: 3,
      user: "Hidden",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/13106_The Zeus vs Hades.png?_v=4,dpr=1,width=200",
      win: "₩809M",
    },
    {
      id: 4,
      user: "Zakimfyokwb",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/5686_Buffalo King Megaways.png?_v=4,dpr=1,width=200",
      win: "₩532M",
    },
    {
      id: 5,
      user: "7starsz",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/706cbc66f8.png?_v=4,dpr=1,width=200",
      win: "₩152M",
    },
    {
      id: 6,
      user: "Gjdksocorie",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/15029_Gates of Olympus 1000.png?_v=4,dpr=1,width=200",
      win: "₩2,138M",
    },
    {
      id: 7,
      user: "daBaby90",
      category: "Slots",
      img: "https://imgxcut.com/game/image/5941_Fruit Party 2.png?_v=4,dpr=1,width=200",
      win: "₩1,744M",
    },
    {
      id: 8,
      user: "Hidden",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/13106_The Zeus vs Hades.png?_v=4,dpr=1,width=200",
      win: "₩809M",
    },
    {
      id: 9,
      user: "Zakimfyokwb",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/5686_Buffalo King Megaways.png?_v=4,dpr=1,width=200",
      win: "₩532M",
    },
    {
      id: 10,
      user: "7starsz",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/706cbc66f8.png?_v=4,dpr=1,width=200",
      win: "₩152M",
    },
    {
      id: 11,
      user: "Gjdksocorie",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/15029_Gates of Olympus 1000.png?_v=4,dpr=1,width=200",
      win: "₩2,138M",
    },
    {
      id: 12,
      user: "daBaby90",
      category: "Slots",
      img: "https://imgxcut.com/game/image/5941_Fruit Party 2.png?_v=4,dpr=1,width=200",
      win: "₩1,744M",
    },
    {
      id: 13,
      user: "Hidden",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/13106_The Zeus vs Hades.png?_v=4,dpr=1,width=200",
      win: "₩809M",
    },
    {
      id: 14,
      user: "Zakimfyokwb",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/5686_Buffalo King Megaways.png?_v=4,dpr=1,width=200",
      win: "₩532M",
    },
    {
      id: 15,
      user: "7starsz",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/706cbc66f8.png?_v=4,dpr=1,width=200",
      win: "₩152M",
    },
    {
      id: 16,
      user: "Gjdksocorie",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/15029_Gates of Olympus 1000.png?_v=4,dpr=1,width=200",
      win: "₩2,138M",
    },
    {
      id: 17,
      user: "daBaby90",
      category: "Slots",
      img: "https://imgxcut.com/game/image/5941_Fruit Party 2.png?_v=4,dpr=1,width=200",
      win: "₩1,744M",
    },
    {
      id: 18,
      user: "Hidden",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/13106_The Zeus vs Hades.png?_v=4,dpr=1,width=200",
      win: "₩809M",
    },
    {
      id: 19,
      user: "Zakimfyokwb",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/5686_Buffalo King Megaways.png?_v=4,dpr=1,width=200",
      win: "₩532M",
    },
    {
      id: 20,
      user: "7starsz",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/706cbc66f8.png?_v=4,dpr=1,width=200",
      win: "₩152M",
    },
    {
      id: 21,
      user: "Zakimfyokwb",
      category: "BC Originals",
      img: "https://imgxcut.com/game/image/5686_Buffalo King Megaways.png?_v=4,dpr=1,width=200",
      win: "₩532M",
    },
    {
      id: 22,
      user: "7starsz",
      category: "Live Casino",
      img: "https://imgxcut.com/game/image/706cbc66f8.png?_v=4,dpr=1,width=200",
      win: "₩152M",
    },
  ];

  const categories = ["All", "BC Originals", "Slots", "Live Casino"];

  const filteredGames = useMemo(() => {
    if (activeTab === "All") return allGames;
    return allGames.filter((g) => g.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="mt-2 flex items-center sm:mt-6 h-8">
        <h2 className="flex items-center text-base font-extrabold text-primary">
          <div className="relative mx-4 mr-2 h-2 w-2">
            <div className="absolute left-0 top-0 h-full w-full rounded-full bg-success z-10" />
            <div className="absolute left-0 top-0 h-full w-full rounded-full bg-success animate-ping" />
          </div>
          <div>Recent Big Wins</div>
          <div className="ml-2 hidden gap-2 lg:flex!">
            {categories.map((category) => (
              <button
                key={category}
                className={`center h-auto cursor-pointer flex-1 whitespace-nowrap rounded-none border-b-2 p-1 text-xs border-b-${
                  category === activeTab ? "brand" : "transparent"
                } font-${category === activeTab ? "semibold" : "normal"} text-${
                  category === activeTab ? "primary" : "secondary"
                }`}
                type="button"
                onClick={() => setActiveTab(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </h2>
        <span className="ml-auto" />
      </div>

      <Swiper
        key={activeTab}
        modules={[Autoplay]}
        spaceBetween={14}
        slidesPerView={"auto"}
        loop={filteredGames.length > 8}
        speed={2000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="overflow-hidden sm:rounded-xl sm:bg-layer3 h-32"
      >
        {filteredGames.map((allGames) => (
          <SwiperSlide
            key={allGames.id}
            style={{ width: "auto" }}
            className="recent-big-win flex! items-center! gap-3 sm:gap-3.5 "
          >
            <Link
              className="sm:w-13 w-14! flex h-28  flex-none flex-col items-center text-xs hover:opacity-80 sm:h-26.5"
              href={`/game-detail/${allGames.id}`}
            >
              <div className="relative mb-1 w-full rounded-lg pt-[133%]">
                <img
                  className="absolute left-0 top-0 w-full rounded-lg"
                  src={allGames.img}
                />
              </div>
              <div className="w-[118%]">
                <div className="flex items-center justify-center font-extrabold text-secondary">
                  <img
                    className="size-3.5"
                    src="https://bc.game/assets/vip/badge-platinum.png"
                  />
                  <span className="ellipsis -ml-0.5 text-xxs">
                    {allGames.user}
                  </span>
                </div>
                <div className="whitespace-nowrap text-nowrap text-center font-extrabold text-brand text-xxs">
                  {allGames.win}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
