"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ReferralLink from "@/components/shared/modals/ReferralLink";

import ImgPwa from "@/public/assets/images/substation/bc/platform/pwa-guide/pwa_w.png";
import ImgLogo from "@/public/assets/images/substation/bc/logo/logo_small_w_festival.png";
import ImgCountry from "@/public/assets/images/coin/KRW.rect.png";
import DarkModeToggle from "./DarkModeToggle";
import { useSidePanel } from "@/contexts/SidePanelContext";

export default function SideMenu() {
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const { isSidebarCollapsed } = useSidePanel();
  const [openMenus, setOpenMenus] = useState({
    casino: false,
    sports: false,
    lottery: false,
    cryptoFutures: false,
    promotions: false,
    sponsorships: false,
    bcOriginals: false,
    bcOriginalsLogo: false,
  });

  const [isBCOriginalsHovered, setIsBCOriginalsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{
    text: string;
    y: number;
  } | null>(null);

  const handleMouseOver = (e: React.MouseEvent) => {
    if (!isSidebarCollapsed) return;
    const target = (e.target as HTMLElement).closest(
      ".nav-link-item, .toggle-link-item",
    );
    if (target) {
      const span = target.querySelector("span");
      if (span) {
        const rect = target.getBoundingClientRect();
        setActiveTooltip({
          text: span.innerText,
          y: rect.top + rect.height / 2,
        });
      }
    } else {
      setActiveTooltip(null);
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (
      !relatedTarget ||
      !relatedTarget.closest(".nav-link-item, .toggle-link-item")
    ) {
      setActiveTooltip(null);
    }
  };

  const toggleMenu = (menuName: keyof typeof openMenus) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleBCOriginalsHover = (isHovered: boolean) => {
    setIsBCOriginalsHovered(isHovered);
  };

  return (
    <div className={`sidebar ${isSidebarCollapsed ? "collapsed" : ""}`}>
      <div className="w-full hidden-scroll-bar absolute left-0 top-0 h-full transition-all overflow-y-auto bg-layer3! duration-200">
        <div className="overflow-hidden bg-layer3 p-4">
          <nav onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            {/* Hide to section width 72px */}

            {!isSidebarCollapsed && (
              <div className="mb-2 overflow-hidden w-full sm:w-52">
                <Link
                  href="/events/app-download-recall"
                  className="transition-none inactive"
                >
                  <div
                    className="flex cursor-pointer justify-between overflow-hidden rounded-lg bg-layer4"
                    style={{
                      background: "#f9f9f9",
                      backgroundImage:
                        "radial-gradient(circle at 400% 400%, rgb(var(--brand)), transparent 92%)",
                    }}
                  >
                    <div className="p-4 sm:p-2.5 sm:pr-0">
                      <h3 className="text-base font-extrabold text-primary sm:text-sm">
                        Application
                      </h3>
                      <p className="mt-1 text-wrap text-sm text-secondary sm:text-xs">
                        Unlock Fun with Exclusive Features
                      </p>
                    </div>
                    <div className="h-1 w-32 flex-none pr-5 pt-1 sm:w-20 sm:p-1">
                      <Image
                        className="h-auto w-full"
                        alt="Platform"
                        src={ImgPwa}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {!isSidebarCollapsed && (
              <ul className="bc-token-entry list-none">
                <li>
                  <Link
                    href="/bc"
                    className="relative z-10 block rounded-lg text-primary inactive"
                    style={{
                      backgroundImage:
                        "radial-gradient(85.75% 170.25% at 0% 100%, rgba(35, 238, 136, 0.15) 0%, rgba(35, 238, 136, 0) 100%)",
                      backgroundColor: "var(--Sidebar-Unit_bg)",
                    }}
                  >
                    <div className="flex items-center rounded-lg px-2 py-2">
                      <div className="rounded-full center mr-1 size-9 py-1.5">
                        <Image
                          className="size-6"
                          alt="coin logo"
                          src={ImgLogo}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="mr-1 whitespace-nowrap text-sm font-extrabold leading-tight text-primary">
                            BC Token
                          </div>
                          <div className="flex items-center text-sm font-semibold leading-tight text-brand">
                            <div className="icon mr-0.5 size-4! rotate-90">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.9069 25.6438L9.5905 15.58L16.9069 5.51611L10.2572 5.51611L2.9408 15.58L10.2572 25.6438L16.9069 25.6438ZM28.1005 25.6438L20.784 15.58L28.1005 5.51611L21.4508 5.51611L14.1343 15.58L21.4508 25.6438L28.1005 25.6438Z"
                                ></path>
                              </svg>
                            </div>
                            <span className="text-xs">1.19%</span>
                          </div>
                        </div>
                        <div className="text-sm leading-tight text-primary">
                          $0.008
                        </div>
                      </div>
                      <div className="bg-arrow size-6 rounded-md center btn-like">
                        <div className="rotate-180 fill-secondary transition-all size-5">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
            )}

            {/* End */}

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.casino ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/casino"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="color_icon_img casino_w"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Casino
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("casino")}
                  className="bg-arrow ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`size-4 fill-secondary transition ease-out ${
                      openMenus.casino ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openMenus.casino ? "2000px" : "0",
                }}
              >
                <ul className="list-none">
                  <li>
                    <Link
                      href="/favorite"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites1"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Favorites
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/recent"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal recent"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Recent
                      </span>
                    </Link>
                  </li>
                  <div>
                    <div
                      onClick={() => toggleMenu("bcOriginals")}
                      onMouseEnter={() => handleBCOriginalsHover(true)}
                      onMouseLeave={() => handleBCOriginalsHover(false)}
                      className="game-link-item nav-link-item-game mt-1 flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:h-10 sm:p-0"
                    >
                      <div className="center flex-none sm:size-10">
                        <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        BC Originals
                      </span>
                      <div className="ml-auto mr-1.5 size-4.5">
                        <div className="icon size-4! rotate-180 fill-secondary transition ease-out">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <li>
                    <Link
                      href="/section/exclusive"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal bc_exlusive"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        BC Exclusive
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/hot"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal hotgame"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Hot Games
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/slots"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal slots"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Slots
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/live"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal liveevents"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Live Casino
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/feature-buy-in"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal featurebuy_in"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Feature Buy-in
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/new"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal newreleases"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        New Releases
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/burst-games"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal burst_games"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Burst Games
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/poker"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal poker"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Poker
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bingo"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal bingo_home"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Bingo
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/table-game"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal tablegame"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Table Games
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/blackjack"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal blackjack"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Blackjack
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/roulette"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal roulette"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Roulette
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/baccarat"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal baccarat"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Baccarat
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/game-shows"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal game_shows"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Game Shows
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/provider"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Providers
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/casino/themes"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal themes"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Themes
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.sports ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/sports"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="color_icon_img sports_w"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Sports
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("sports")}
                  className="bg-arrow ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`icon size-4! fill-secondary transition ease-out ${
                      openMenus.sports ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openMenus.sports ? "2000px" : "0" }}
              >
                <ul>
                  <li>
                    <Link
                      href="/sports/soccer-1"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal soccer"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Soccer
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/tennis-5"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal tennis"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Tennis
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/basketball-2"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal basketball"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Basketball
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/cricket-21"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal cricket"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Cricket
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/fifa-300"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal fifa"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        FIFA
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/american-football-16"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal americanfootball"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        American Football
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/ice-hockey-4"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal icehockey"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Ice Hockey
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/baseball-3"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal baseball"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Baseball
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sports/handball-6"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal handball"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Handball
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/racing"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal racing"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Racing
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.lottery ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/lottery"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="color_icon_img lottery_w"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Lottery
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("lottery")}
                  className="bg-arrow  ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`icon size-4! fill-secondary transition ease-out ${
                      openMenus.lottery ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openMenus.lottery ? "2000px" : "0" }}
              >
                <ul>
                  <li>
                    <Link
                      href="/lottery/myBets"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal my_bets"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        My bets
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lottery/allLotteries?sort=letter_asc"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal alllotteries"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        All lotteries
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lottery/allLotteries?sort=lottery_picks_for_you"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal picksforyou"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Picks for you
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lottery/favourite"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites1"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Favorites
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lottery/detail/0"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal bclottery"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        BC Lottery
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/lottery/allLotteries?sort=lottery_popular"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal popular"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Popular
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.cryptoFutures ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/trading/contract"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="color_icon_img trading_w"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Crypto Futures
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("cryptoFutures")}
                  className="bg-arrow  ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`icon size-4! fill-secondary transition ease-out ${
                      openMenus.cryptoFutures ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openMenus.cryptoFutures ? "2000px" : "0" }}
              >
                <ul>
                  <li>
                    <Link
                      href="/trading"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal futures"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        High Low
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trading/up-down"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal up_down"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Up Down
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trading/spread"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal high_low_spread"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        High Low Spread
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trading/tap"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal tap_trading"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Tap Trading
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.promotions ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/promotions/promotion"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="color_icon_img promotion_w"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Promotions
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("promotions")}
                  className="bg-arrow ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`icon size-4! fill-secondary transition ease-out ${
                      openMenus.promotions ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openMenus.promotions ? "2000px" : "0" }}
              >
                <ul>
                  <li>
                    <Link
                      href="/promotions/daily-contest"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal dailycontest"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Daily Contest
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/promotions/weekly-raffle"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal weekly_raffle"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Weekly Raffle
                      </span>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 active"
                      aria-current="page"
                      onClick={() => setIsReferralOpen(true)}
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal referearn"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Refer and Earn
                      </span>
                    </button>
                    {isReferralOpen && (
                      <ReferralLink onClose={() => setIsReferralOpen(false)} />
                    )}
                  </li>
                </ul>
              </div>
            </div>

            <ul className="sidebar_bg sidebar_bg_sp relative my-3 w-full rounded-lg px-0 pb-2 pt-1 sm:my-2 sm:py-1 list-none">
              <li>
                <Link
                  href="/vip"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal vip_club"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    <span className="text-brand">VIP</span>
                    <span className="mx-1">Club</span>
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/bonus"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal bonus"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Bonus
                  </span>
                  <div
                    className="center ml-auto flex h-4 rounded-md px-1 text-[10px] font-semibold"
                    style={{
                      background: "rgba(173, 166, 0, 0.2)",
                      color: "rgb(173, 166, 0)",
                    }}
                  >
                    +10%
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/quests"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal quest"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Quest Hub
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/referral"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal affiliate"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Referral
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  target="_blank"
                  href="https://forum.bc.game/"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal forum"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Forum
                  </span>
                  <div className="icon ml-1 size-4! flex-none text-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.8999 17.1C25.6082 17.1 25.3284 17.2159 25.1221 17.4222C24.9158 17.6285 24.7999 17.9083 24.7999 18.2V21.5C24.7999 22.3752 24.4522 23.2146 23.8334 23.8335C23.2145 24.4523 22.3751 24.8 21.4999 24.8H10.5C9.62476 24.8 8.7854 24.4523 8.16653 23.8335C7.54767 23.2146 7.19999 22.3752 7.19999 21.5V10.5C7.19999 9.62479 7.54767 8.78542 8.16653 8.16655C8.7854 7.54768 9.62476 7.2 10.5 7.2H16C16.2917 7.2 16.5715 7.08411 16.7778 6.87782C16.9841 6.67153 17.0999 6.39174 17.0999 6.1C17.0999 5.80826 16.9841 5.52847 16.7778 5.32218C16.5715 5.11589 16.2917 5 16 5H10.5C9.04183 5.00175 7.6439 5.58177 6.61283 6.61284C5.58177 7.64391 5.00175 9.04185 5 10.5V21.5C5.00175 22.9582 5.58177 24.3561 6.61283 25.3872C7.6439 26.4182 9.04183 26.9983 10.5 27H21.4999C22.9581 26.9983 24.356 26.4182 25.3871 25.3872C26.4181 24.3561 26.9982 22.9582 26.9999 21.5V18.2C26.9999 17.9083 26.884 17.6285 26.6777 17.4222C26.4714 17.2159 26.1916 17.1 25.8999 17.1Z"></path>
                      <path d="M10.511 17.2562C10.5443 17.4882 10.6508 17.7035 10.8151 17.8707C10.9793 18.0379 11.1926 18.1482 11.424 18.1857C11.4821 18.1953 11.541 18.2001 11.6 18.2C11.8044 18.2001 12.0048 18.1432 12.1787 18.0358C12.3526 17.9283 12.4931 17.7746 12.5845 17.5917C13.9496 14.8604 17.5817 14.6965 19.2999 14.7988V17.1C19.3 17.3175 19.3645 17.5302 19.4854 17.711C19.6063 17.8919 19.778 18.0328 19.979 18.116C20.18 18.1993 20.4011 18.2211 20.6145 18.1786C20.8278 18.1362 21.0238 18.0315 21.1776 17.8777L26.6776 12.3777C26.787 12.2683 26.8721 12.1371 26.9274 11.9926C26.9827 11.8481 27.0068 11.6936 26.9983 11.5391C26.9898 11.3847 26.9488 11.2337 26.878 11.0962C26.8072 10.9586 26.7082 10.8376 26.5874 10.7409L21.0874 6.3409C20.9256 6.21135 20.7305 6.13016 20.5246 6.10667C20.3186 6.08318 20.1103 6.11836 19.9234 6.20815C19.7366 6.29794 19.579 6.43868 19.4687 6.61416C19.3583 6.78965 19.2999 6.99273 19.2999 7.2V9.3098C16.2199 9.1657 13.866 9.8983 12.3249 11.4867C11.6331 12.2663 11.114 13.1833 10.8014 14.1776C10.4888 15.1719 10.3898 16.221 10.511 17.2562Z"></path>
                    </svg>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  href="/help/provably-fair"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal fair"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Provably Fair
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/responsible/faq"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal account"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Responsible Gambling
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  target="_blank"
                  href="https://blog.BC.GAME/"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal blog"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Blog
                  </span>
                  <div className="icon ml-1 size-4! flex-none text-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.8999 17.1C25.6082 17.1 25.3284 17.2159 25.1221 17.4222C24.9158 17.6285 24.7999 17.9083 24.7999 18.2V21.5C24.7999 22.3752 24.4522 23.2146 23.8334 23.8335C23.2145 24.4523 22.3751 24.8 21.4999 24.8H10.5C9.62476 24.8 8.7854 24.4523 8.16653 23.8335C7.54767 23.2146 7.19999 22.3752 7.19999 21.5V10.5C7.19999 9.62479 7.54767 8.78542 8.16653 8.16655C8.7854 7.54768 9.62476 7.2 10.5 7.2H16C16.2917 7.2 16.5715 7.08411 16.7778 6.87782C16.9841 6.67153 17.0999 6.39174 17.0999 6.1C17.0999 5.80826 16.9841 5.52847 16.7778 5.32218C16.5715 5.11589 16.2917 5 16 5H10.5C9.04183 5.00175 7.6439 5.58177 6.61283 6.61284C5.58177 7.64391 5.00175 9.04185 5 10.5V21.5C5.00175 22.9582 5.58177 24.3561 6.61283 25.3872C7.6439 26.4182 9.04183 26.9983 10.5 27H21.4999C22.9581 26.9983 24.356 26.4182 25.3871 25.3872C26.4181 24.3561 26.9982 22.9582 26.9999 21.5V18.2C26.9999 17.9083 26.884 17.6285 26.6777 17.4222C26.4714 17.2159 26.1916 17.1 25.8999 17.1Z"></path>
                      <path d="M10.511 17.2562C10.5443 17.4882 10.6508 17.7035 10.8151 17.8707C10.9793 18.0379 11.1926 18.1482 11.424 18.1857C11.4821 18.1953 11.541 18.2001 11.6 18.2C11.8044 18.2001 12.0048 18.1432 12.1787 18.0358C12.3526 17.9283 12.4931 17.7746 12.5845 17.5917C13.9496 14.8604 17.5817 14.6965 19.2999 14.7988V17.1C19.3 17.3175 19.3645 17.5302 19.4854 17.711C19.6063 17.8919 19.778 18.0328 19.979 18.116C20.18 18.1993 20.4011 18.2211 20.6145 18.1786C20.8278 18.1362 21.0238 18.0315 21.1776 17.8777L26.6776 12.3777C26.787 12.2683 26.8721 12.1371 26.9274 11.9926C26.9827 11.8481 27.0068 11.6936 26.9983 11.5391C26.9898 11.3847 26.9488 11.2337 26.878 11.0962C26.8072 10.9586 26.7082 10.8376 26.5874 10.7409L21.0874 6.3409C20.9256 6.21135 20.7305 6.13016 20.5246 6.10667C20.3186 6.08318 20.1103 6.11836 19.9234 6.20815C19.7366 6.29794 19.579 6.43868 19.4687 6.61416C19.3583 6.78965 19.2999 6.99273 19.2999 7.2V9.3098C16.2199 9.1657 13.866 9.8983 12.3249 11.4867C11.6331 12.2663 11.114 13.1833 10.8014 14.1776C10.4888 15.1719 10.3898 16.221 10.511 17.2562Z"></path>
                    </svg>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  target="_blank"
                  href="https://betting.BC.GAME/"
                  className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal betting_insights"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Sport Betting Insights
                  </span>
                  <div className="icon ml-1 size-4! flex-none text-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M25.8999 17.1C25.6082 17.1 25.3284 17.2159 25.1221 17.4222C24.9158 17.6285 24.7999 17.9083 24.7999 18.2V21.5C24.7999 22.3752 24.4522 23.2146 23.8334 23.8335C23.2145 24.4523 22.3751 24.8 21.4999 24.8H10.5C9.62476 24.8 8.7854 24.4523 8.16653 23.8335C7.54767 23.2146 7.19999 22.3752 7.19999 21.5V10.5C7.19999 9.62479 7.54767 8.78542 8.16653 8.16655C8.7854 7.54768 9.62476 7.2 10.5 7.2H16C16.2917 7.2 16.5715 7.08411 16.7778 6.87782C16.9841 6.67153 17.0999 6.39174 17.0999 6.1C17.0999 5.80826 16.9841 5.52847 16.7778 5.32218C16.5715 5.11589 16.2917 5 16 5H10.5C9.04183 5.00175 7.6439 5.58177 6.61283 6.61284C5.58177 7.64391 5.00175 9.04185 5 10.5V21.5C5.00175 22.9582 5.58177 24.3561 6.61283 25.3872C7.6439 26.4182 9.04183 26.9983 10.5 27H21.4999C22.9581 26.9983 24.356 26.4182 25.3871 25.3872C26.4181 24.3561 26.9982 22.9582 26.9999 21.5V18.2C26.9999 17.9083 26.884 17.6285 26.6777 17.4222C26.4714 17.2159 26.1916 17.1 25.8999 17.1Z"></path>
                      <path d="M10.511 17.2562C10.5443 17.4882 10.6508 17.7035 10.8151 17.8707C10.9793 18.0379 11.1926 18.1482 11.424 18.1857C11.4821 18.1953 11.541 18.2001 11.6 18.2C11.8044 18.2001 12.0048 18.1432 12.1787 18.0358C12.3526 17.9283 12.4931 17.7746 12.5845 17.5917C13.9496 14.8604 17.5817 14.6965 19.2999 14.7988V17.1C19.3 17.3175 19.3645 17.5302 19.4854 17.711C19.6063 17.8919 19.778 18.0328 19.979 18.116C20.18 18.1993 20.4011 18.2211 20.6145 18.1786C20.8278 18.1362 21.0238 18.0315 21.1776 17.8777L26.6776 12.3777C26.787 12.2683 26.8721 12.1371 26.9274 11.9926C26.9827 11.8481 27.0068 11.6936 26.9983 11.5391C26.9898 11.3847 26.9488 11.2337 26.878 11.0962C26.8072 10.9586 26.7082 10.8376 26.5874 10.7409L21.0874 6.3409C20.9256 6.21135 20.7305 6.13016 20.5246 6.10667C20.3186 6.08318 20.1103 6.11836 19.9234 6.20815C19.7366 6.29794 19.579 6.43868 19.4687 6.61416C19.3583 6.78965 19.2999 6.99273 19.2999 7.2V9.3098C16.2199 9.1657 13.866 9.8983 12.3249 11.4867C11.6331 12.2663 11.114 13.1833 10.8014 14.1776C10.4888 15.1719 10.3898 16.221 10.511 17.2562Z"></path>
                    </svg>
                  </div>
                </Link>
              </li>
            </ul>

            <div className="navtoggle">
              <div
                className={`toggle-link-item ${
                  openMenus.sponsorships ? "toggle-link-item-open" : ""
                }`}
              >
                <Link
                  href="/sponsorship/journey/#"
                  className="flex flex-1 items-center h-full inactive"
                >
                  <div className="center flex-none sm:size-10">
                    <div
                      className="menu_icon_img menu_icon_img_light menu_icon_img_normal sponsorships"
                      style={{ transform: "scale(0.75)" }}
                    ></div>
                  </div>
                  <span className="ml-3 flex-1 overflow-hidden whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                    Sponsorships
                  </span>
                </Link>
                <button
                  onClick={() => toggleMenu("sponsorships")}
                  className="bg-arrow  ml-auto flex size-6 items-center justify-center rounded-lg p-0 sm:mr-1.5"
                >
                  <div
                    className={`icon size-4! fill-secondary transition ease-out ${
                      openMenus.sponsorships ? "rotate-90" : "-rotate-90"
                    }`}
                  >
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: openMenus.sponsorships ? "2000px" : "0" }}
              >
                <ul>
                  <li>
                    <Link
                      href="/sponsorship/journey"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal sponsorship"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Sponsorship Journey
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/ohiggins"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal o_higgins"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        O Higgins
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/jason"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal jason_derulo"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Jason Derulo
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/pump"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal lil_pump"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Lil Pump
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/colby"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal colby_covington"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Colby Covington
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/miami"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal miami"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Miami Club
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/esports"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        BC Game Esports
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/patriots"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal st_kitts"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        St. Kitts &amp; Nevis Patriots
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/kwara"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal kwara_united"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Kwara United
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/sashimi"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal sashimi_poker"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Sashimi Poker
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/lcfc"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal leicester_city"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Leicester City
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/krasava"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal krasava"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        KRASAVA
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/deccan"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal deccan_gladiators"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Deccan Gladiators
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/silva"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div
                          className="menu_icon_img menu_icon_img_light menu_icon_img_normal jean_silva"
                          style={{ transform: "scale(0.75)" }}
                        ></div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Jean Silva
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sponsorship/abu"
                      className="nav-link-item relative flex h-11 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:h-10 sm:pl-0 sm:pr-2 inactive"
                    >
                      <div className="center flex-none sm:size-10">
                        <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                        Abu Dhabi T10 League
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="sidebar_bg side-nav-item flex w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 mt-3 h-11 sm:mt-1 sm:h-10 sm:p-0">
              <div className="icon-wrap flex-none center sm:size-10">
                <div className="icon size-6! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0434 17.0183C12.9801 17.0183 13.7395 17.7778 13.7395 18.7145V25.3283C13.7395 26.265 12.9801 27.0244 12.0434 27.0244H10.2648C8.85937 27.0244 7.721 25.8852 7.721 24.4806V19.5629C7.721 18.1575 8.86019 17.0191 10.2648 17.0191L12.0434 17.0183ZM21.8077 17.0183C23.2132 17.0183 24.3515 18.1575 24.3515 19.5621V24.4798C24.3515 25.8852 23.2123 27.0236 21.8077 27.0236H20.0291C19.0925 27.0236 18.333 26.2641 18.333 25.3275V18.7136C18.333 17.777 19.0925 17.0175 20.0291 17.0175L21.8077 17.0183ZM15.9999 4.97559C22.6881 4.97559 28.1292 10.2983 28.2926 16.9261L28.2966 17.2331V22.2398C28.2966 22.9307 27.7348 23.4909 27.0415 23.4909C26.3915 23.4909 25.8574 22.9985 25.7929 22.368L25.7863 22.2398V17.2331C25.7863 11.845 21.4043 7.47772 15.9991 7.47772C10.6853 7.47772 6.36132 11.6988 6.21596 16.9603L6.21188 17.2331V22.2553C6.21188 22.9462 5.65004 23.5064 4.95673 23.5064C4.30669 23.5064 3.77262 23.014 3.70893 22.3835L3.70239 22.2553V17.2331C3.70239 10.4641 9.20807 4.9764 15.9991 4.9764L15.9999 4.97559Z"></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                Live Support
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 sm:mt-2 sm:flex-col sm:gap-0">
              <div
                className="side-nav-item flex flex-1 cursor-pointer items-center overflow-hidden rounded-lg px-3 h-11 sm:h-10 sm:w-full sm:p-0"
                style={{ background: "var(--Sidebar-Unit_bg)" }}
              >
                <div className="icon-wrap flex-none center sm:size-10">
                  <div className="icon fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 4C9.3726 4 4 9.3726 4 16C4 22.6274 9.3726 28 16 28C22.6274 28 28 22.6274 28 16C28 9.3726 22.6274 4 16 4ZM25.1671 12.0007C25.7022 13.2252 26.0008 14.578 26.0008 16.001C26.0008 17.424 25.7022 18.7768 25.1671 20.0013H20.6577C20.8782 18.7607 20.9984 17.412 20.9984 16.001C20.9984 14.59 20.8781 13.2413 20.6577 12.0007H25.1671ZM13.0018 16.001C13.0018 14.5641 13.112 13.2052 13.3125 12.0007H18.6857C18.8862 13.2052 18.9984 14.564 18.9984 16.001C18.9984 17.4381 18.8862 18.7969 18.6857 20.0014H13.3146C13.1142 18.7969 13.0018 17.4381 13.0018 16.001ZM24.0007 10.0004H20.1927C19.7277 8.4392 19.0904 7.15453 18.3388 6.27668C20.6017 6.82169 22.6039 8.1385 24.0007 10.0004ZM16 7.00222C16.8878 7.00222 17.6875 8.16266 18.2367 10.0025H13.7634C14.3125 8.16073 15.1122 7.00222 16 7.00222ZM13.6611 6.27879C12.9095 7.15458 12.2722 8.44329 11.8092 10.0025H8.0012C9.3974 8.14096 11.3989 6.82423 13.6611 6.27879ZM6.83291 12.0007H11.3423C11.1218 13.2413 11.0015 14.59 11.0015 16.001C11.0015 17.412 11.1219 18.7607 11.3423 20.0013H6.83286C6.28161 18.7398 5.99776 17.3777 5.99915 16.001C5.99915 14.578 6.29784 13.2252 6.83291 12.0007ZM7.9994 22.0015H11.8074C12.2724 23.5627 12.9097 24.8474 13.6612 25.7253C11.3983 25.1802 9.3962 23.8634 7.9994 22.0015ZM16 24.9997C15.1122 24.9997 14.3125 23.8393 13.7633 21.9994H18.2366C17.6835 23.8412 16.8879 24.9997 16 24.9997ZM18.3388 25.7233C19.0904 24.8475 19.7277 23.5588 20.1908 21.9995H23.9988C22.6025 23.8611 20.601 25.1779 18.3388 25.7233Z"></path>
                    </svg>
                  </div>
                </div>
                <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                  English
                </span>
                <div className="bg-arrow button ml-auto flex size-6! items-center justify-center p-0! sm:mr-1.5">
                  <div className="icon size-4! rotate-180 fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div
                style={{ background: "var(--Sidebar-Unit_bg)" }}
                className="side-nav-item flex flex-1 items-center overflow-hidden rounded-lg px-3 h-11 sm:mt-1 sm:h-10 sm:w-full sm:p-0 cursor-pointer"
              >
                <div className="icon-wrap flex-none center sm:size-10">
                  <Image
                    alt="coin"
                    src={ImgCountry}
                    style={{ width: "20px", height: "20px" }}
                  />
                </div>
                <span className="ml-3 whitespace-nowrap text-base font-extrabold text-primary sm:ml-0 sm:text-sm sm:font-semibold">
                  KRW
                </span>
                <div className="bg-arrow ml-auto flex size-6 rotate-180 items-center justify-center rounded-lg p-0 sm:mr-1.5">
                  <div className="icon size-4! fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {!isSidebarCollapsed && <DarkModeToggle />}
          </nav>
        </div>
      </div>

      <div
        className={`absolute top-0 h-full cursor-pointer pl-4 left-full -ml-4 select-none transition-all duration-300 ${
          isBCOriginalsHovered
            ? "pointer-events-auto w-[256px] bg-layer3"
            : "pointer-events-none w-0 bg-transparent"
        }`}
        onMouseEnter={() => handleBCOriginalsHover(true)}
        onMouseLeave={() => handleBCOriginalsHover(false)}
      >
        <div
          className={`hidden-scroll-bar h-full w-full px-2 py-3 overflow-y-auto select-none transition-opacity duration-300 ${
            isBCOriginalsHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "4px 0px 8px 0px rgba(0, 0, 0, 0.05)",
            background: "var(--Sidebar-Unit_bg)",
          }}
        >
          <Link
            href="/game/crash"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light crash"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Crash
            </span>
          </Link>

          <Link
            href="/game/bubble-shooter"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light bubble_shooter"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Bubble Shooter
            </span>
          </Link>

          <Link
            href="/game/torture-block-by-croco-gaming"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light bc_originallogo"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              TORTURE BLOCK
            </span>
          </Link>

          <Link
            href="/game/sugar-fiesta-1000-by-croco-gaming"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light sugar_fiesta_1000"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Sugar Fiesta 1000
            </span>
          </Link>

          <Link
            href="/game/classic-dice"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light classicdice"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Classic Dice
            </span>
          </Link>

          <Link
            href="/game/keno"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light keno"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Keno
            </span>
          </Link>

          <Link
            href="/game/twist"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light twist"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Twist
            </span>
          </Link>

          <Link
            href="/game/fast-crash"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light fast_crash"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Fast Crash
            </span>
          </Link>

          <Link
            href="/game/color"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light color_game"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Perya Color Game
            </span>
          </Link>

          <Link
            href="/game/ring-of-fortune"
            className="nav-link-item nav-link-item-game flex h-10 w-full items-center overflow-hidden rounded-lg mt-1 inactive"
          >
            <div className="relative flex-none center size-10">
              <div
                className="game_icon_img game_icon_img_light ringoffortune"
                style={{ transform: "scale(0.75)" }}
              ></div>
            </div>
            <span className="ml-2 whitespace-nowrap font-semibold text-secondary">
              Ring of Fortune
            </span>
          </Link>
        </div>
      </div>
      {activeTooltip && (
        <div
          className="fixed z-1000 rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-gray-800 shadow-lg transition-opacity duration-200"
          style={{
            left: "80px",
            top: `${activeTooltip.y}px`,
            transform: "translateY(-50%)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {activeTooltip.text}
          {/* Triangle pointer */}
          <div
            className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-white"
            style={{
              boxShadow: "-2px 2px 2px rgba(0,0,0,0.03)",
            }}
          />
        </div>
      )}
    </div>
  );
}

