"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import DarkModeToggle from "./DarkModeToggle";

export default function MobileMenu() {
  const { theme, setTheme } = useTheme();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    casino: false,
    sports: false,
    lottery: false,
    trading: false,
    promotions: false,
    sponsorships: false,
    support: false,
    legal: false,
    about: false,
  });

  const toggleSection = (section: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <nav>
        <div className="overflow-hidden w-full sm:w-52">
          <div className="mb-2">
            <Link
              className="transition-none inactive"
              href="/events/app-download-recall"
            >
              <div
                className="flex cursor-pointer justify-between overflow-hidden rounded-lg bg-layer4"
                style={{
                  background: "var(--Sidebar-Unit_bg)",
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
                  <img
                    alt=""
                    className="h-auto w-full"
                    src="https://bc.game/substation/bc/platform/pwa-guide/pwa_w.png"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="bc-token-entry">
          <Link
            className="relative z-10 block rounded-lg text-primary inactive"
            href="/bc"
            style={{
              backgroundColor: "var(--Sidebar-Unit_bg)",
              backgroundImage:
                "radial-gradient(85.75% 170.25% at 0% 100%, rgba(252, 60, 60, 0.15) 0%, rgba(252, 60, 60, 0) 100%)",
            }}
          >
            <div className="flex h-16 items-center rounded-lg px-3">
              <div className="rounded-full center mr-3 size-10 shrink-0 py-1.5">
                <img
                  alt="coin logo"
                  className="h-full"
                  src="https://bc.game/substation/bc/logo/logo_small_w.png"
                />
              </div>
              <div className="mr-2.5">
                <div className="text-lg font-extrabold leading-tight">
                  BC Token
                </div>
                <div className="text-sm leading-tight text-error">-4.99%</div>
              </div>
              <div className="mr-3 flex-1 text-right">
                <div className="mb-0.5 text-sm leading-tight">1 BC</div>
                <div className="text-base leading-5">$0.00614</div>
              </div>
              <div className="arrow-button center flex size-6 rounded sm:size-5!">
                <div className="icon size-5! rotate-180 fill-secondary transition-all">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.casino ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("casino")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/casino"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="color_icon_img casino_w"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Casino
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.casino ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.casino ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/favorite"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites1"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Favorites
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/recent"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal recent"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Recent
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/brand"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  BC Originals
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/section/exclusive"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal bc_exlusive"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  BC Exclusive
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/hot"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal hotgame"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Hot Games
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/slots"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal slots"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Slots
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/live"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal liveevents"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Live Casino
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/feature-buy-in"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal featurebuy_in"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Feature Buy-in
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/new"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal newreleases"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  New Releases
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/burst-games"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal burst_games"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Burst Games
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/poker"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal poker"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Poker
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/bingo"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal bingo_home"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Bingo
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/table-game"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal tablegame"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Table Games
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/blackjack"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal blackjack"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Blackjack
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/roulette"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal roulette"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Roulette
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/baccarat"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal baccarat"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Baccarat
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/game-shows"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal game_shows"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Game Shows
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/provider"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Providers
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/casino/themes"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal themes"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Themes
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.sports ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("sports")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/sports"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="color_icon_img sports_w"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Sports
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.sports ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.sports ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/soccer-1"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal soccer"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Soccer
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/basketball-2"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal basketball"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Basketball
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/counter-strike-109"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal counter_strike"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Counter-Strike
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/dota-2-111"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal dota_2"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Dota 2
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/tennis-5"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal tennis"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Tennis
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/ice-hockey-4"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal icehockey"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Ice Hockey
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/american-football-16"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal americanfootball"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  American Football
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/esoccer-300"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal eSoccer"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  eSoccer
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/mixed-martial-arts-117"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal mma"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  MMA
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sports/handball-6"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal handball"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Handball
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.lottery ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("lottery")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/lottery"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="color_icon_img lottery_w"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Lottery
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.lottery ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.lottery ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/myBets"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal my_bets"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  My bets
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/allLotteries?sort=letter_asc"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal alllotteries"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  All lotteries
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/allLotteries?sort=lottery_picks_for_you"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal picksforyou"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Picks for you
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/favourite"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal favorites1"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Favorites
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/detail/0"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal bclottery"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  BC Lottery
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/lottery/allLotteries?sort=lottery_popular"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal popular"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Popular
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.trading ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("trading")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/trading/contract"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="color_icon_img trading_w"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Crypto Futures
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.trading ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.trading ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/trading"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal futures"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  High Low
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/trading/up-down"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal up_down"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Up Down
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/trading/spread"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal high_low_spread"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  High Low Spread
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/trading/tap"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal tap_trading"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Tap Trading
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.promotions ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("promotions")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/promotions/promotion"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="color_icon_img promotion_w"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Promotions
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.promotions ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.promotions ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/promotions/daily-contest"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal dailycontest"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Daily Contest
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/promotions/weekly-raffle"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal weekly_raffle"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Weekly Raffle
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg relative my-3 w-full rounded-lg px-0 pb-2 pt-1 sm:my-2 sm:p-0">
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/vip"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal vip_club"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              <span className="text-brand">VIP</span>
              <span className="mx-1">Club</span>
            </span>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/bonus"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal bonus"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Bonus
            </span>
            <div
              className="center ml-auto flex h-4 rounded-md px-1 text-[10px] font-semibold"
              style={{
                background: "rgba(173, 166, 0, 0.2)",
                color: "rgb(173, 166, 0)",
              }}
            >
              +180%
            </div>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/quests"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal quest"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Quest Hub
            </span>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/referral"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal affiliate"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Referral
            </span>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="https://forum.bc.game/"
            target="_blank"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal forum"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Forum
            </span>
            <div className="icon ml-1 size-4! flex-none text-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                <path
                  clipRule="evenodd"
                  d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/help/provably-fair"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal fair"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Provably Fair
            </span>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="/responsible/faq"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal account"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Responsible Gambling
            </span>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="https://blog.BC.GAME/"
            target="_blank"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal blog"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Blog
            </span>
            <div className="icon ml-1 size-4! flex-none text-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                <path
                  clipRule="evenodd"
                  d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </Link>
          <Link
            className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
            href="https://betting.BC.GAME/"
            target="_blank"
          >
            <div className="nav-scale-box center flex flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal betting_insights"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Sport Betting Insights
            </span>
            <div className="icon ml-1 size-4! flex-none text-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                <path
                  clipRule="evenodd"
                  d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.sponsorships ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("sponsorships")}
          >
            <Link
              className="pointer-events-none invisible size-0 inactive"
              href="/sponsorship/journey/#"
            />
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal sponsorships"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Sponsorships
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.sponsorships ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.sponsorships ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/journey"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal sponsorship"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Sponsorship Journey
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/ohiggins"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal o_higgins"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  O'HIGGINS
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/jason"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal jason_derulo"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Jason Derulo
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/pump"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal lil_pump"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Lil Pump
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/colby"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal colby_covington"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Colby Covington
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/miami"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal miami"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Miami Club
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/esports"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  BC Game Esports
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/patriots"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal st_kitts"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  St. Kitts & Nevis Patriots
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/kwara"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal kwara_united"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Kwara United
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/sashimi"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal sashimi_poker"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Sashimi Poker
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/lcfc"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal leicester_city"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Leicester City
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/krasava"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal krasava"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  KRASAVA
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/deccan"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal deccan_gladiators"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Deccan Gladiators
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/silva"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal jean_silva"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Jean Silva
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/sponsorship/abu"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div className="icon menu_icon_img menu_icon_img_light menu_icon_img_normal size-6 bg-none!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M22.3989 7.848C20.3229 6.648 18.8739 6.009 17.4609 5.943H17.1279C15.9939 6 14.8389 6.414 13.3539 7.2C13.2819 4.008 12.1869 3 8.78787 3H7.60587C6.81687 3 6.77487 3.126 7.04787 3.774C7.24696 4.28438 7.33096 4.83242 7.29387 5.379V16.839C7.32687 21.6 7.96887 22.668 12.3399 25.113C14.5869 26.37 15.8949 27 17.2929 27C18.6909 27 19.9929 26.37 22.2489 25.113C26.7399 22.602 27.2949 21.537 27.2949 16.437C27.2949 11.337 26.7159 10.347 22.3989 7.848ZM14.1339 16.614L17.0079 19.461C17.0762 19.5273 17.1677 19.5645 17.2629 19.5645C17.3581 19.5645 17.4496 19.5273 17.5179 19.461L19.8309 17.169C19.9498 17.0513 20.1105 16.9855 20.2779 16.986H23.8419C23.8644 16.9859 23.8866 16.9905 23.9072 16.9996C23.9278 17.0087 23.9462 17.022 23.9612 17.0387C23.9762 17.0555 23.9875 17.0752 23.9944 17.0966C24.0012 17.118 24.0034 17.1407 24.0009 17.163C23.7964 18.8586 22.9522 20.4122 21.6409 21.5064C20.3296 22.6006 18.6499 23.1529 16.9451 23.0504C15.2403 22.948 13.6389 22.1986 12.468 20.9552C11.2971 19.7119 10.6451 18.0684 10.6451 16.3605C10.6451 14.6526 11.2971 13.0091 12.468 11.7658C13.6389 10.5224 15.2403 9.773 16.9451 9.67057C18.6499 9.56813 20.3296 10.1204 21.6409 11.2146C22.9522 12.3088 23.7964 13.8624 24.0009 15.558C24.003 15.5805 24.0003 15.6032 23.9931 15.6246C23.9859 15.646 23.9743 15.6657 23.9591 15.6824C23.9438 15.699 23.9252 15.7123 23.9045 15.7214C23.8838 15.7305 23.8615 15.7351 23.8389 15.735H20.2779C20.1105 15.7355 19.9498 15.6697 19.8309 15.552L17.5179 13.26C17.4496 13.1937 17.3581 13.1565 17.2629 13.1565C17.1677 13.1565 17.0762 13.1937 17.0079 13.26L14.1339 16.107C14.1004 16.1402 14.0738 16.1797 14.0557 16.2232C14.0376 16.2667 14.0282 16.3134 14.0282 16.3605C14.0282 16.4076 14.0376 16.4543 14.0557 16.4978C14.0738 16.5413 14.1004 16.5808 14.1339 16.614Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Abu Dhabi T10 League
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.support ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("support")}
          >
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal help"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Support
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.support ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.support ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal inform"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Help Center
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/faq"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal tips_help"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  FAQ
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/ceo-inbox/enter"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal ceo_inbox"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  CEO Inbox
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.legal ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("legal")}
          >
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal legal"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              Legal
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.legal ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.legal ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/licenses"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal bc_licenses"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  BC Licenses
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/gameble-aware"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal gamble_ware"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Gamble Aware
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/provably-fair"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal fair"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Fairness
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/privacy"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal two_factor"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Privacy Policy
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/terms-service"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal bank"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Terms Of Service
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/help/aml"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal ban"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  AML
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg mt-1 overflow-hidden rounded-lg">
          <div
            className={`toggle-link-item rounded-none! flex h-10 w-full cursor-pointer items-center px-3 sm:px-0 ${
              openMenus.about ? "toggle-link-item-open" : ""
            }`}
            onClick={() => toggleSection("about")}
          >
            <div className="nav-scale-box center flex-none sm:size-10">
              <div
                className="menu_icon_img menu_icon_img_light menu_icon_img_normal tips_help"
                style={{
                  transform: "scale(0.8)",
                }}
              />
            </div>
            <span className="ml-2 flex-1 overflow-hidden whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
              About Us
            </span>
            <button className="arrow-button center ml-auto flex size-6 rounded p-0 sm:mr-2 sm:size-5!">
              <div
                className={`icon size-4! fill-secondary transition ease-out ${
                  openMenus.about ? "rotate-90" : "-rotate-90"
                }`}
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ height: openMenus.about ? "auto" : 0 }}
          >
            <div className="h-0 w-full border-t border-third" />
            <div className="px-1.5 pb-1">
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/achievement"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal achievement"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Achievement
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="https://blog.bc.game/en/"
                target="_blank"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal personal_verification"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  News
                </span>
                <div className="icon ml-1 size-4! flex-none text-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                    <path
                      clipRule="evenodd"
                      d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="https://angel.co/company/bc-game-2"
                target="_blank"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal at"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Work with us
                </span>
                <div className="icon ml-1 size-4! flex-none text-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                    <path
                      clipRule="evenodd"
                      d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/business"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal webchat"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Business Contacts
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/license"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal license"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  License
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="https://help.bc.support/en/"
                target="_blank"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal tips_help"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Help Desk
                </span>
                <div className="icon ml-1 size-4! flex-none text-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                    <path
                      clipRule="evenodd"
                      d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="/verify_representative"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal referral_codes"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Verify Representative
                </span>
              </Link>
              <Link
                className="nav-link-item relative flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:pl-0 sm:pr-2 mt-1 inactive"
                href="https://drive.google.com/drive/folders/1Q48CUgrJOAeDGpBqmdHGNwWGxNEdTZzQ"
                target="_blank"
              >
                <div className="nav-scale-box center flex flex-none sm:size-10">
                  <div
                    className="menu_icon_img menu_icon_img_light menu_icon_img_normal laptop"
                    style={{
                      transform: "scale(0.8)",
                    }}
                  />
                </div>
                <span className="ml-2 whitespace-nowrap text-base font-semibold sm:ml-0 sm:text-sm">
                  Design Resources
                </span>
                <div className="icon ml-1 size-4! flex-none text-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3284 18.5643H18.9958V14.6514L11.9914 21.6313L10.344 19.9795L17.3552 12.9973H13.2815V10.667H21.3284V18.5643Z" />
                    <path
                      clipRule="evenodd"
                      d="M21.5472 5.30762C24.3449 5.30817 26.6141 7.57668 26.6141 10.3746V21.6268C26.6136 24.4243 24.3446 26.6932 21.5472 26.6938H10.4556C7.6577 26.6938 5.38917 24.4246 5.38867 21.6268V10.3746C5.38867 7.57634 7.65739 5.30762 10.4556 5.30762H21.5472ZM10.4556 7.70717L10.1833 7.72056C8.8381 7.85662 7.78823 8.99349 7.78823 10.3746V21.6268L7.80162 21.8991C7.92937 23.1542 8.928 24.1516 10.1833 24.2786L10.4556 24.292H21.5472L21.8195 24.2786C23.074 24.1509 24.0713 23.1537 24.1989 21.8991L24.2123 21.6268V10.3746C24.2123 8.9941 23.1638 7.85743 21.8195 7.72056L21.5472 7.70717H10.4556Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="Sidebar-Unit_bg nav-link-same rounded-lg">
          <div className="nav-link-item mt-3 flex h-10 w-full cursor-pointer items-center overflow-hidden rounded-lg px-3 sm:mt-1 sm:p-0">
            <div className="nav-scale-box center size-8 flex-none sm:size-10">
              <div className="icon size-6 fill-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0434 17.0183C12.9801 17.0183 13.7395 17.7778 13.7395 18.7145V25.3283C13.7395 26.265 12.9801 27.0244 12.0434 27.0244H10.2648C8.85937 27.0244 7.721 25.8852 7.721 24.4806V19.5629C7.721 18.1575 8.86019 17.0191 10.2648 17.0191L12.0434 17.0183ZM21.8077 17.0183C23.2132 17.0183 24.3515 18.1575 24.3515 19.5621V24.4798C24.3515 25.8852 23.2123 27.0236 21.8077 27.0236H20.0291C19.0925 27.0236 18.333 26.2641 18.333 25.3275V18.7136C18.333 17.777 19.0925 17.0175 20.0291 17.0175L21.8077 17.0183ZM15.9999 4.97559C22.6881 4.97559 28.1292 10.2983 28.2926 16.9261L28.2966 17.2331V22.2398C28.2966 22.9307 27.7348 23.4909 27.0415 23.4909C26.3915 23.4909 25.8574 22.9985 25.7929 22.368L25.7863 22.2398V17.2331C25.7863 11.845 21.4043 7.47772 15.9991 7.47772C10.6853 7.47772 6.36132 11.6988 6.21596 16.9603L6.21188 17.2331V22.2553C6.21188 22.9462 5.65004 23.5064 4.95673 23.5064C4.30669 23.5064 3.77262 23.014 3.70893 22.3835L3.70239 22.2553V17.2331C3.70239 10.4641 9.20807 4.9764 15.9991 4.9764L15.9999 4.97559Z" />
                </svg>
              </div>
            </div>
            <span className="ml-2 whitespace-nowrap text-base font-semibold text-primary sm:ml-0 sm:text-sm">
              Live Support
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 sm:mt-2 sm:flex-col sm:gap-0">
          <div className="Sidebar-Unit_bg nav-link-same flex-1 overflow-hidden rounded-lg sm:w-full">
            <div className="nav-link-item flex h-11 flex-1 cursor-pointer items-center px-3 sm:h-10 sm:p-0">
              <div className="nav-scale-box center size-8 flex-none sm:size-10">
                <div className="icon size-6 fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C9.3726 4 4 9.3726 4 16C4 22.6274 9.3726 28 16 28C22.6274 28 28 22.6274 28 16C28 9.3726 22.6274 4 16 4ZM25.1671 12.0007C25.7022 13.2252 26.0008 14.578 26.0008 16.001C26.0008 17.424 25.7022 18.7768 25.1671 20.0013H20.6577C20.8782 18.7607 20.9984 17.412 20.9984 16.001C20.9984 14.59 20.8781 13.2413 20.6577 12.0007H25.1671ZM13.0018 16.001C13.0018 14.5641 13.112 13.2052 13.3125 12.0007H18.6857C18.8862 13.2052 18.9984 14.564 18.9984 16.001C18.9984 17.4381 18.8862 18.7969 18.6857 20.0014H13.3146C13.1142 18.7969 13.0018 17.4381 13.0018 16.001ZM24.0007 10.0004H20.1927C19.7277 8.4392 19.0904 7.15453 18.3388 6.27668C20.6017 6.82169 22.6039 8.1385 24.0007 10.0004ZM16 7.00222C16.8878 7.00222 17.6875 8.16266 18.2367 10.0025H13.7634C14.3125 8.16073 15.1122 7.00222 16 7.00222ZM13.6611 6.27879C12.9095 7.15458 12.2722 8.44329 11.8092 10.0025H8.0012C9.3974 8.14096 11.3989 6.82423 13.6611 6.27879ZM6.83291 12.0007H11.3423C11.1218 13.2413 11.0015 14.59 11.0015 16.001C11.0015 17.412 11.1219 18.7607 11.3423 20.0013H6.83286C6.28161 18.7398 5.99776 17.3777 5.99915 16.001C5.99915 14.578 6.29784 13.2252 6.83291 12.0007ZM7.9994 22.0015H11.8074C12.2724 23.5627 12.9097 24.8474 13.6612 25.7253C11.3983 25.1802 9.3962 23.8634 7.9994 22.0015ZM16 24.9997C15.1122 24.9997 14.3125 23.8393 13.7633 21.9994H18.2366C17.6835 23.8412 16.8879 24.9997 16 24.9997ZM18.3388 25.7233C19.0904 24.8475 19.7277 23.5588 20.1908 21.9995H23.9988C22.6025 23.8611 20.601 25.1779 18.3388 25.7233Z" />
                  </svg>
                </div>
              </div>
              <span className="ml-2 whitespace-nowrap text-base font-semibold text-primary sm:ml-0 sm:text-sm">
                English
              </span>
              <div className="arrow-button ml-auto flex size-6 items-center justify-center rounded p-0 sm:mr-2 sm:size-5!">
                <div className="icon size-4! rotate-180 fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="Sidebar-Unit_bg nav-link-same flex-1 overflow-hidden rounded-lg sm:mt-1 sm:w-full">
            <div className="nav-link-item flex h-11 flex-1 items-center px-3 sm:h-10 sm:p-0 cursor-pointer">
              <div className="nav-scale-box center size-8 flex-none sm:size-10">
                <img
                  alt="coin"
                  className="h-6 sm:h-5"
                  src="https://imgxcut.com/coin/KRW.rect.png"
                />
              </div>
              <span className="ml-2 whitespace-nowrap text-base font-semibold text-primary sm:ml-0 sm:text-sm">
                KRW
              </span>
              <div className="arrow-button ml-auto flex size-6 items-center justify-center rounded p-0 sm:mr-2 sm:size-5!">
                <div className="icon size-4! rotate-180 fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div
            className="Sidebar-Unit_bg mt-2 h-10 w-full cursor-pointer rounded-lg p-0.5 font-semibold"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div className="relative flex h-9 w-full">
              <div
                className="absolute top-0 h-full w-1/2 rounded-lg bg-layer6 transition-all ease-out"
                style={{
                  left: theme === "light" ? "50%" : "0%",
                }}
              />
              <div className="center relative h-9 w-1/2">
                <div className="icon size-4! fill-quarterary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.4301 19.6621C18.7339 18.9421 14.2649 14.488 13.5284 8.86041L13.5217 8.79669C13.4696 8.37131 13.4398 7.87807 13.4398 7.37821C13.4398 6.64165 13.5044 5.92 13.6285 5.21903L13.6177 5.29352C13.626 5.24138 13.631 5.18179 13.631 5.12138C13.631 4.50234 13.1286 4 12.5096 4C12.378 4 12.2514 4.02234 12.1347 4.06455L12.1421 4.06207C7.48201 5.91338 4.2478 10.3832 4.2478 15.6086C4.2478 22.4519 9.79594 28 16.6393 28C21.3921 28 25.5201 25.3236 27.599 21.3959L27.6313 21.3288C27.7074 21.1823 27.7521 21.0094 27.7521 20.8257C27.7521 20.2149 27.2564 19.7192 26.6456 19.7192C26.6241 19.7192 26.6017 19.72 26.5802 19.7208H26.5835C26.3593 19.7357 26.0977 19.744 25.8346 19.744C25.3397 19.744 24.8514 19.7142 24.3722 19.6563L24.4301 19.6621Z" />
                  </svg>
                </div>
                <span className="ml-1 text-quarterary">Dark</span>
              </div>
              <div className="center relative h-9 w-1/2">
                <div className="icon size-4! fill-primary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9053 24.3657C10.9583 24.3699 11.0104 24.3841 11.0584 24.4083L13.1591 25.458C13.3675 25.5624 13.4547 25.8202 13.3529 26.0338C13.3293 26.0831 13.2967 26.1273 13.2576 26.164L10.9265 28.3303C10.7547 28.4897 10.4893 28.4764 10.3329 28.3003C10.2556 28.2127 10.2165 28.0967 10.2255 27.9799L10.4559 24.7638C10.473 24.5268 10.6741 24.3482 10.9053 24.3657ZM21.5024 24.6069C21.526 24.6561 21.5399 24.7095 21.5439 24.7638L21.7744 27.9799C21.7915 28.2169 21.6172 28.4238 21.386 28.4405C21.2712 28.4488 21.158 28.4088 21.0733 28.3303L18.7422 26.164C18.5704 26.0046 18.5574 25.7318 18.7129 25.5557C18.7487 25.5148 18.7919 25.4822 18.8399 25.458L20.9406 24.4083C21.149 24.304 21.4006 24.3924 21.5024 24.6069ZM15.9999 8.83009C20.1769 8.83009 23.5624 12.3007 23.5624 16.5816C23.5624 20.8625 20.176 24.3323 15.9991 24.3323C11.8222 24.3323 8.43581 20.8617 8.43581 16.5816C8.43581 12.3015 11.8222 8.83009 15.9991 8.83009H15.9999ZM25.5328 17.1825C25.5849 17.195 25.6346 17.2175 25.6777 17.2484L28.2612 19.0884C28.4518 19.2244 28.499 19.4923 28.3663 19.6876C28.3003 19.7844 28.1994 19.8495 28.0854 19.867L24.9759 20.3602C24.7463 20.3969 24.5321 20.2358 24.4963 20.0005C24.4882 19.9463 24.4898 19.8912 24.502 19.8378L25.028 17.5037C25.0801 17.2717 25.3056 17.1274 25.532 17.1808L25.5328 17.1825ZM6.90671 17.356C6.93683 17.4011 6.95882 17.4512 6.97103 17.5046L7.49702 19.8386C7.54913 20.0706 7.40827 20.3018 7.18191 20.3552C7.1298 20.3677 7.07607 20.3694 7.02314 20.361L3.91364 19.8678C3.68403 19.8311 3.52688 19.6116 3.56271 19.3763C3.58062 19.2595 3.64331 19.156 3.73776 19.0884L6.32128 17.2484C6.51181 17.1124 6.7748 17.1608 6.90671 17.356ZM26.0376 8.61312C26.0718 8.72578 26.0588 8.84761 26.0034 8.95025L24.4686 11.765C24.3554 11.9728 24.0998 12.047 23.897 11.931C23.8506 11.9043 23.8091 11.8685 23.7757 11.8259L22.3052 9.96415C22.1595 9.77973 22.1872 9.50852 22.3671 9.35832C22.4086 9.3241 22.4567 9.29823 22.5072 9.28154L25.5124 8.32773C25.7339 8.25763 25.9692 8.38447 26.0384 8.61145L26.0376 8.61312ZM6.4882 8.3294L9.49348 9.28321C9.71495 9.35331 9.83953 9.59448 9.77032 9.82229C9.75485 9.87486 9.72879 9.92326 9.69541 9.96582L8.22493 11.8276C8.07918 12.012 7.81456 12.0412 7.63381 11.891C7.59228 11.8568 7.55727 11.8142 7.53121 11.7666L5.99641 8.95192C5.88323 8.74414 5.9557 8.48211 6.15844 8.36611C6.25859 8.30853 6.37746 8.29602 6.48738 8.33107L6.4882 8.3294ZM16.1562 3.58868C16.2629 3.63208 16.3476 3.71886 16.3899 3.82818L17.5583 6.82231C17.6446 7.04345 17.5396 7.2938 17.3247 7.38225C17.275 7.40228 17.2221 7.41313 17.1683 7.41313H14.8315C14.5995 7.41313 14.4114 7.22036 14.4114 6.98254C14.4114 6.92746 14.422 6.87322 14.4415 6.82231L15.6099 3.82818C15.6962 3.60704 15.9405 3.50023 16.1562 3.58868Z" />
                  </svg>
                </div>
                <span className="ml-1 text-primary">Light</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

