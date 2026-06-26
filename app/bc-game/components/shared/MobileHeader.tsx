"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useSidePanel } from "@/contexts/SidePanelContext";
import { useAuth } from "@/contexts/AuthContext";

export default function MobileHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { toggleNotice } = useSidePanel();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div
      className={clsx(
        "page-header left-0 top-0 w-full fixed z-99 transition-colors duration-300 h-14",
        isHomePage && !scrolled
          ? "bg-transparent"
          : "alpha-layer4 dark:bg-layer2",
      )}
    >
      <div className="flex size-full! items-center justify-start gap-2 px-3">
        <Link href="/" className="shrink-0">
          <img
            alt="logo"
            className="h-9! w-9!"
            src="https://bc.game/substation/bc/logo/logo_small_w.png"
          />
        </Link>

        {isLoggedIn ? (
          <>
            <div className="relative flex h-10 flex-1 min-w-0 items-center rounded-lg border-2 p-0.5 border-third bg-alw_white dark:bg-layer3">
              <div className="mr-1 flex flex-1 cursor-pointer select-none items-center overflow-hidden">
                <img
                  className="flex-none mx-1 size-6!"
                  src="https://imgxcut.com/coin/KRW.rect.png"
                />

                <div className="flex-1 truncate font-extrabold text-sm">₩0</div>
                <div className="icon size-5! shrink-0 -rotate-90 fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </div>

              <button
                className="button button-brand not-full ml-auto h-8! flex-none rounded-md bg-brand! bg-none shadow-none px-2"
                type="button"
              >
                <div className="icon size-4!">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0247 5.11523C14.962 5.11523 14.1005 5.97674 14.1005 7.03946L14.1005 14.0761H7.06388C6.00116 14.0761 5.13965 14.9376 5.13965 16.0003C5.13965 17.063 6.00115 17.9245 7.06388 17.9245H14.1003V24.9615C14.1003 26.0242 14.9618 26.8857 16.0245 26.8857C17.0872 26.8857 17.9487 26.0242 17.9487 24.9615V17.9249L24.9854 17.9249C26.0481 17.9249 26.9096 17.0634 26.9096 16.0006C26.9096 14.9379 26.0481 14.0764 24.9854 14.0764L17.949 14.0764L17.949 7.03946C17.949 5.97674 17.0874 5.11523 16.0247 5.11523Z" />
                  </svg>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Gift Button */}
              <Link
                href="/bonus"
                className="button relative size-10! bg-alw_white dark:bg-white_alpha5 shrink-0"
              >
                <div className="icon size-6! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.4724 13.2852C19.9993 13.2769 11.8971 13.2769 5.6079 13.2852C4.95181 13.2863 4.41968 12.7548 4.41968 12.0987V10.0112C4.41968 9.35626 4.95058 8.82476 5.60554 8.82476C6.45562 8.82476 7.47058 8.83008 7.82056 8.83008C7.79805 8.76722 7.78678 8.72096 7.76599 8.67997C6.82632 6.84811 8.01218 4.65801 10.057 4.43851C10.9688 4.34066 11.7441 4.62598 12.4144 5.23221C13.051 5.80825 13.6863 6.38544 14.3222 6.96205C14.3595 6.99584 14.3993 7.0279 14.4497 7.07117C14.9047 6.61322 15.444 6.35511 16.0911 6.35579C16.7306 6.35579 17.268 6.60197 17.7284 7.06703C17.7794 7.02611 17.8304 6.98871 17.8778 6.94598C18.5197 6.36523 19.1591 5.78091 19.8028 5.20251C21.5178 3.66255 24.179 4.50491 24.6803 6.74787C24.825 7.39686 24.7538 8.02626 24.4448 8.62246C24.4157 8.67884 24.3891 8.73695 24.3457 8.82714C24.6518 8.82714 25.4296 8.82536 26.4742 8.82599C27.1291 8.82599 27.66 9.35749 27.66 10.0124V12.0981C27.66 12.7542 27.1285 13.2857 26.4724 13.2852ZM13.9099 8.81469C13.8613 8.68421 13.8529 8.55902 13.7865 8.49732C12.9542 7.73208 12.1226 6.96504 11.2707 6.22116C10.7967 5.80709 10.1151 5.80119 9.58 6.15411C9.06035 6.49642 8.8171 7.127 8.97432 7.72259C9.15523 8.40833 9.70634 8.82127 10.4722 8.82539C11.5441 8.83134 12.6161 8.82717 13.6874 8.82654C13.7384 8.82654 13.7895 8.82122 13.9099 8.81469ZM18.2736 8.75897C18.2973 8.78148 18.3216 8.80468 18.3453 8.82719C18.4996 8.82719 18.6532 8.82835 18.8075 8.82719C19.8569 8.81949 20.9074 8.83252 21.9557 8.79401C22.5418 8.77265 23.0508 8.304 23.2032 7.75174C23.361 7.17869 23.1659 6.58129 22.7031 6.2236C22.2131 5.84512 21.5979 5.80067 21.0664 6.12334C20.9039 6.22179 20.7573 6.35054 20.615 6.47869C19.8954 7.1271 19.177 7.77664 18.4657 8.43391C18.3774 8.51579 18.3358 8.64982 18.2736 8.75897Z"></path>
                    <path d="M7.52341 27.1389C7.44806 27.1152 7.3733 27.0897 7.29736 27.0677C6.61931 26.8726 6.20054 26.3007 6.19994 25.5532C6.19816 23.6811 6.19936 21.8089 6.19936 19.9373C6.19936 18.3096 6.19936 16.6817 6.19936 15.054C6.19936 14.9662 6.19936 14.8778 6.19936 14.7711H14.6206C14.6206 14.8482 14.6206 14.9265 14.6206 15.0048C14.6206 18.9633 14.6206 22.9224 14.6188 26.881C14.6188 26.967 14.5963 27.0536 14.5838 27.1396L7.52341 27.1389Z"></path>
                    <path d="M17.6032 27.1389C17.5914 27.06 17.5682 26.9811 17.5682 26.9028C17.5664 22.9295 17.5664 18.9561 17.5664 14.9822C17.5664 14.9169 17.5664 14.8511 17.5664 14.7692H25.9877C25.9877 14.8665 25.9877 14.9602 25.9877 15.054C25.9877 18.5171 25.9877 21.9797 25.9877 25.4429C25.9877 26.3772 25.6021 26.8743 24.6951 27.1104C24.6827 27.1134 24.6738 27.1294 24.6637 27.1395L17.6032 27.1389Z"></path>
                  </svg>
                </div>
              </Link>

              {/* Notif Button */}
              <div className="center relative bg-alw_white dark:bg-white_alpha5 text-secondary rounded-lg shrink-0">
                <button
                  className="button relative size-10! p-0"
                  type="button"
                  onClick={toggleNotice}
                >
                  <svg
                    className="icon flex-none size-6! text-secondary"
                    viewBox="0 0 32 32"
                  >
                    <circle
                      cx="17.5869"
                      cy="24.0712"
                      r="2.90558"
                      transform="rotate(-15 17.5869 24.0712)"
                      className="fill-brand"
                    ></circle>
                    <path d="M24.1189 16.055L25.7539 17.9422C26.0732 18.152 26.3332 18.4567 26.5015 18.8182C26.6699 19.1797 26.7389 19.5821 26.7002 19.975C26.6614 20.3678 26.5165 20.7338 26.2835 21.0271C26.0506 21.3203 25.74 21.5279 25.3905 21.6239L21.7425 22.6014L19.571 23.1832L15.2281 24.3469L13.0566 24.9288L9.40857 25.9063C9.05793 25.9979 8.68512 25.9734 8.33676 25.8359C7.98839 25.6984 7.67992 25.4539 7.44991 25.1331C7.2199 24.8122 7.07855 24.4292 7.04353 24.032C7.00852 23.6347 7.08139 23.2408 7.25304 22.8995L7.47901 20.5136C7.29893 17.5003 6.5022 14.0972 6.8904 11.1031C7.04095 9.94195 7.41895 8.84145 7.99918 7.87502C8.57941 6.90859 9.34853 6.09846 10.2552 5.49867C11.1619 4.89889 12.1853 4.52324 13.2571 4.3968C15.1153 4.22128 17.0024 4.78814 18.57 5.99271C21.5499 8.2825 22.6057 12.7441 24.1189 16.055Z"></path>
                  </svg>
                </button>
              </div>

              {/* Profile Avatar */}
              <Link
                href="/user/enter"
                className="button relative size-9.5! rounded-full! bg-black_alpha5 p-1! shrink-0"
                type="button"
              >
                <img
                  className="rounded-full size-full"
                  src="//img2.distributedresourcestorage.com/avatar/102324897/s?t=1770797008049"
                />
              </Link>
            </div>
          </>
        ) : (
          <div className="flex ml-auto items-center gap-2 px-1">
            <Link
              href="/login/signin"
              className="button button-m h-9! min-w-20! rounded-lg border border-solid border-third px-3 text-sm font-bold"
            >
              Sign In
            </Link>
            <Link
              href="/login/signup"
              className="button button-brand button-m h-9! min-w-20! rounded-lg px-3 text-sm font-bold"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

