"use client";
import Image from "next/image";
import BannerCarousel from "@/components/ui/carousel/BannerCarousel";
import { Banner } from "@/types/game";

import HomeFavorites from "@/components/modules/home/Favotires";
import RecentBigWins from "@/components/modules/home/RecentBigWins";

import BcOriginals from "@/components/modules/games/BcOriginals";
import LiveCasino from "@/components/modules/games/LiveCasino";
import BcExclusive from "@/components/modules/home/BcExclusive";
import BingoGames from "@/components/modules/home/BingoGames";
import HotGames from "@/components/modules/games/HotGames";
import UpcomingLotteryDraw from "@/components/modules/home/UpcomingLotteryDraw";

import LiveSports from "@/components/modules/home/LiveSports";
import LatestRoundRace from "@/components/modules/games/LatestRoundRace";

import CasinoImg from "@/public/assets/images/substation/bc/platform/casino_w.png";
import SportImg from "@/public/assets/images/substation/bc/platform/sports.png";

import PokerImg from "@/public/assets/images/substation/bc/platform/poker.webp";
import RacingImg from "@/public/assets/images/substation/bc/platform/racing_w.png";
import LotteryImg from "@/public/assets/images/substation/bc/platform/lottery.png";
import UpdownImg from "@/public/assets/images/substation/bc/platform/updown.png";
import BingoImg from "@/public/assets/images/substation/bc/platform/bingo.png";

export default function Home() {
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
  return (
    <div className="page-content px-4 w-full mx-auto max-w-312">
      {/* Carousel Banner */}
      <BannerCarousel banners={myBanners} />

      <HomeFavorites />

      <RecentBigWins />

      <div className="-mx-4 bg-layer2 p-4">
        <div className="flex w-full flex-col items-stretch gap-2 sm:mt-6 lg:gap-3!">
          <div className="flex flex-3 gap-2 lg:gap-3!">
            <div className="center relative h-32 flex-1 overflow-hidden cursor-pointer rounded-xl bg-layer4 hover:bg-layer4 p-1.5 font-extrabold sm:h-44 sm:p-5 col-span-2 col-start-1">
              <Image
                className="absolute right-0 top-0 h-full w-auto"
                alt="Platform Casino"
                src={CasinoImg}
                width={0}
              />
              <div className="relative z-10 flex h-full flex-auto flex-col">
                <div className="flex items-center">
                  <div
                    className="color_icon_img casino_w"
                    style={{ transform: "scale(1)" }}
                  ></div>
                  <h2 className="ml-0.5 text-sm sm:text-[22px]">CASINO</h2>
                </div>
                <div className="hidden lg:block mb-1.5 mt-auto max-w-60 text-left font-semibold text-tertiary">
                  Dive into our in-house games, live casino and slots
                </div>
              </div>
            </div>
            <div className="center relative h-32 flex-1 overflow-hidden cursor-pointer rounded-xl bg-layer4 hover:bg-layer4 p-1.5 font-extrabold sm:h-44 sm:p-5 col-span-2 col-start-1">
              <Image
                className="absolute right-0 top-0 h-full w-auto"
                alt="Platform Sport"
                src={SportImg}
                width={0}
              />
              <div className="relative z-10 flex h-full flex-auto flex-col">
                <div className="flex items-center">
                  <div
                    className="color_icon_img sports_w"
                    style={{ transform: "scale(1)" }}
                  ></div>
                  <span className="ml-0.5 text-sm sm:text-[22px]">SPORTS</span>
                </div>
                <div className="hidden lg:block mb-1.5 mt-auto max-w-60 text-left font-semibold text-tertiary">
                  Bet on Football, Cricket, NFL, eSports &amp; over 80 sports!
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-4 flex-wrap gap-2 lg:gap-3!">
            <div className="center relative h-24 cursor-pointer flex-1 overflow-hidden rounded-xl bg-layer4 p-2 font-extrabold sm:h-30">
              <Image
                className="absolute left-[50%] top-[5%] h-[70%] w-auto -translate-x-[50%]  lg:top-0 lg:h-full lg:-translate-x-[10%]"
                alt="Poker"
                src={PokerImg}
                width={0}
              />
              <div className="absolute left-2 top-2 items-center hidden lg:flex">
                <div
                  className="color_icon_img bcpoker_w"
                  style={{
                    transform: "scale(0.8)",
                  }}
                />
                <h2 className="ml-1 text-lg font-extrabold">POKER</h2>
              </div>
              <div className="absolute bottom-2 left-0 block w-full text-center lg:hidden">
                <span className="text-sm font-extrabold">POKER</span>
              </div>
            </div>
            <div className="center relative h-24 cursor-pointer flex-1 overflow-hidden rounded-xl bg-layer4 p-2 font-extrabold sm:h-30">
              <Image
                className="absolute left-[50%] top-[5%] h-[70%] w-auto -translate-x-[50%]  lg:top-0 lg:h-full lg:-translate-x-[10%]"
                alt="Racing"
                src={RacingImg}
              />
              <div className="absolute left-2 top-2 items-center hidden lg:flex">
                <div
                  className="color_icon_img racing_w"
                  style={{
                    transform: "scale(1)",
                  }}
                />
                <h2 className="ml-1 text-lg font-extrabold">RACING</h2>
              </div>
              <div className="absolute bottom-2 left-0 block w-full text-center lg:hidden">
                <span className="text-sm font-extrabold">RACING</span>
              </div>
            </div>
            <div className="center relative h-24 cursor-pointer flex-1 overflow-hidden rounded-xl bg-layer4 p-2 font-extrabold sm:h-30">
              <Image
                className="absolute left-[50%] top-[5%] h-[70%] w-auto -translate-x-[50%]  lg:top-0 lg:h-full lg:-translate-x-[10%]"
                alt="Lottery"
                src={LotteryImg}
              />
              <div className="absolute left-2 top-2 items-center hidden lg:flex">
                <div
                  className="color_icon_img lottery_w"
                  style={{
                    transform: "scale(1)",
                  }}
                />
                <h2 className="ml-1 text-lg font-extrabold">LOTTERY</h2>
              </div>
              <div className="absolute bottom-2 left-0 block w-full text-center lg:hidden">
                <span className="text-sm font-extrabold">LOTTERY</span>
              </div>
            </div>
            <div className="center relative h-24 cursor-pointer flex-1 overflow-hidden rounded-xl bg-layer4 p-2 font-extrabold sm:h-30">
              <Image
                className="absolute left-[50%] top-[5%] h-[70%] w-auto -translate-x-[50%]  lg:top-0 lg:h-full lg:-translate-x-[10%]"
                alt="Updown"
                src={UpdownImg}
              />
              <div className="absolute left-2 top-2 items-center hidden lg:flex">
                <div
                  className="color_icon_img trading_w"
                  style={{
                    transform: "scale(1)",
                  }}
                />
                <h2 className="ml-1 text-lg font-extrabold">UPDOWN</h2>
              </div>
              <div className="absolute bottom-2 left-0 block w-full text-center lg:hidden">
                <span className="text-sm font-extrabold">UPDOWN</span>
              </div>
            </div>
            <div className="center relative h-24 cursor-pointer flex-1 overflow-hidden rounded-xl bg-layer4 p-2 font-extrabold sm:h-30">
              <Image
                className="absolute left-[50%] top-[5%] h-[70%] w-auto -translate-x-[50%]  lg:top-0 lg:h-full lg:-translate-x-[10%]"
                alt="Bingo"
                src={BingoImg}
              />
              <div className="absolute left-2 top-2 items-center hidden lg:flex">
                <div
                  className="color_icon_img bingo_w"
                  style={{
                    transform: "scale(1)",
                  }}
                />
                <h2 className="ml-1 text-lg font-extrabold">BINGO</h2>
              </div>
              <div className="absolute bottom-2 left-0 block w-full text-center lg:hidden">
                <span className="text-sm font-extrabold">BINGO</span>
              </div>
            </div>
          </div>
        </div>
        <BcOriginals />
        <LiveSports />
        <BcExclusive />

        <UpcomingLotteryDraw />
        <LiveCasino />

        <div className="mt-4 rounded-xl bg-layer4 sm:mt-7">
          <div className="center flex gap-2 pb-4 pt-3 lg:hidden!">
            <img className="w-6" src="/assets/images/coin/BTC.black.png" />
            <img className="w-6" src="/assets/images/coin/ETH.black.png" />
            <img className="w-6" src="/assets/images/coin/BNB.black.png" />
            <img className="w-6" src="/assets/images/coin/XRP.black.png" />
            <img className="w-6" src="/assets/images/coin/USDT.black.png" />
            <img className="w-6" src="/assets/images/coin/USDC.black.png" />
            <img className="w-6" src="/assets/images/coin/SOL.black.png" />
            <img className="w-6" src="/assets/images/coin/ADA.black.png" />
            <img className="w-6" src="/assets/images/coin/DOGE.black.png" />
            <img className="w-6" src="/assets/images/coin/MATIC.black.png" />
            <img className="w-6" src="/assets/images/coin/TRX.black.png" />
          </div>
          <div className="relative h-24 rounded-xl bg-alw_white/70 lg:px-8 dark:bg-alw_dark/70">
            <div className="pointer-events-none absolute left-0 size-full overflow-hidden blur">
              <img
                className="absolute -top-3 left-4 scale-[2]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute left-24 top-14 scale-150"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute -top-2 left-40 scale-[2]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute -top-3 left-72 scale-[3]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute left-80 top-15 scale-150"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute -bottom-3 right-4 scale-[2]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute bottom-14 right-24 scale-150"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute -bottom-2 right-40 scale-[2]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute -bottom-3 right-72 scale-[3]"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
              <img
                className="absolute bottom-15 right-80 scale-150"
                src="https://bc.game/assets/dot-C8z5Aoh_.png"
              />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center lg:flex-row-reverse!">
              <div className="center hidden! lg:flex!">
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/BTC.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/ETH.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/BNB.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/XRP.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/USDT.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/USDC.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/SOL.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/ADA.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/DOGE.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/MATIC.black.png"
                />
                <img
                  className="-ml-1 w-6"
                  src="/assets/images/coin/TRX.black.png"
                />
              </div>
              <div className="center mx-auto gap-6">
                <img
                  className="w-14"
                  src="https://bc.game/assets/apple_pay-DhGEreIw.png"
                />
                <img
                  className="w-7"
                  src="https://bc.game/assets/mastercard-CVVg_XRh.png"
                />
                <img
                  className="w-11"
                  src="https://bc.game/assets/visa-CHvdFeKw.png"
                />
                <img
                  className="w-12"
                  src="https://bc.game/assets/google_pay-FVJ2d1pF.png"
                />
                <img
                  className="w-15"
                  src="https://bc.game/assets/pic_pay-fE-XPIEr.png"
                />
              </div>
              <div className="center mt-4 gap-11 lg:mt-0!">
                <div className="text-lg font-extrabold sm:text-2xl">
                  <span className="text-brand">300%</span> Deposit Bonus
                </div>
              </div>
            </div>
          </div>
        </div>
        <BingoGames />
        <LatestRoundRace />

        <HotGames />
      </div>
    </div>
  );
}

