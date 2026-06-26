"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify-icon/react";

export function HeaderSection() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme !== "light";

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Defer the state update to avoid synchronous cascading renders warning
    requestAnimationFrame(() => {
      if (mounted) setIsDarkMode(isDark);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] md:w-full md:max-w-[1000px] md:top-6">
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? "rounded-full px-4 py-2.5 bg-elevated/60 backdrop-blur-sm shadow-lg"
            : "w-full bg-transparent px-4 py-2.5"
        }`}
      >
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="router-link-active router-link-exact-active flex items-center"
            aria-current="page"
          >
            <Image
              src="/assets/images/logo/icon_logo_dark.svg?v=1782265245119"
              alt="logo"
              width={0}
              height={0}
              className="h-5 w-auto"
            />
            <Image
              src="/assets/images/logo/soulution_txt_dark.svg?v=1782265245119"
              alt="logo text"
              width={0}
              height={0}
              className="h-5 w-auto ml-2"
            />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <div className="relative group">
              <Link
                href="/#features"
                className="router-link-active router-link-exact-active flex items-center gap-1 font-medium text-default/80 hover:text-default transition-colors"
                aria-current="page"
              >
                <span>제품 기능</span>
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/#sample-site"
                className="router-link-active router-link-exact-active flex items-center gap-1 font-medium text-default/80 hover:text-default transition-colors"
                aria-current="page"
              >
                <span>샘플 사이트</span>
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/#services"
                className="router-link-active router-link-exact-active flex items-center gap-1 font-medium text-default/80 hover:text-default transition-colors"
                aria-current="page"
              >
                <span>제공 서비스</span>
              </Link>
            </div>
            <div className="relative group">
              <Link
                href="/#providers"
                className="router-link-active router-link-exact-active flex items-center gap-1 font-medium text-default/80 hover:text-default transition-colors"
                aria-current="page"
              >
                <span>제공 게임사</span>
              </Link>
            </div>
            <Link
              href="/#faq"
              className="router-link-active router-link-exact-active text-default/80 hover:text-default transition-colors"
              aria-current="page"
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/icon_cs"
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-md font-medium disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-3 py-2 text-sm gap-2 bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hidden md:flex items-center text-white"
            >
              <Icon icon="mingcute:telegram-fill" className="size-5 shrink-0" />{" "}
              문의하기
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
              className="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-2 text-default bg-elevated hover:bg-accented/75 active:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated p-2 rounded-full"
            >
              <Icon
                icon={isDarkMode ? "lucide:moon" : "lucide:sun"}
                className="size-5 shrink-0"
              />
            </button>
            <a
              href="https://t.me/icon_cs"
              rel="noopener noreferrer"
              target="_blank"
              className="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-2 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 md:hidden p-2 rounded-full"
            >
              <Icon icon="mingcute:telegram-fill" className="size-5 shrink-0" />
            </a>
            <button
              type="button"
              className="font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-2 text-primary bg-primary/10 hover:bg-primary/15 active:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 md:hidden p-2 rounded-full"
            >
              <Icon icon="lucide:menu" className="size-5 shrink-0" />
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
