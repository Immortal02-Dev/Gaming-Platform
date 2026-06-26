import BannerCarousel from "@/components/ui/carousel/BannerCarousel";
import { Banner, Game } from "@/types/game";

import GameLobbyNav from "@/components/shared/navigation/game-filter";
import GameProvider from "@/components/modules/provider/CasinoProvider";

export default function CasinoProvider() {
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

          <div className="grid py-4 gap-2 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
            <GameProvider />
          </div>
        </div>
      </div>
    </div>
  );
}
