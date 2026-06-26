"use client";

import { useState } from "react";
import { useBonus } from "@/lib/useBonus";

export default function BonusPage() {
  const { stats, rakeback, tasks, spin, loading, redeemCode, claimRakeback } =
    useBonus();
  const [promoCode, setPromoCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const handleRedeem = async () => {
    if (!promoCode) return;
    const res = await redeemCode(promoCode);
    if (res) {
      setRedeemStatus({ message: res.message, success: res.success !== false });
      setPromoCode("");
      setTimeout(() => setRedeemStatus(null), 3000);
    }
  };

  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="">
        <h1 className="mb-4 items-end justify-between text-2xl font-extrabold text-primary hidden md:flex">
          Bonus
          <div className="relative w-106.5">
            <div className="input h-10 w-full pr-32 text-sm font-semibold">
              <input
                placeholder="Redeem your bonus here."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
            </div>
            <div className="absolute right-1 top-1/2 h-8 -translate-y-1/2">
              <button
                onClick={handleRedeem}
                className="button button-second button-m not-full flex h-8! shrink-0 gap-x-1 border border-solid text-sm text-primary! button-input border-white_alpha5 bg-none! backdrop-blur!"
                type="button"
              >
                <div className="icon size-5! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.0287 7.47756L27.6581 10.7718C28.145 11.2133 28.4234 11.8408 28.4234 12.4979L28.4365 25.1085C28.4373 25.968 27.741 26.6661 26.8814 26.667H19.1131C18.2545 26.667 17.5572 25.9715 17.5563 25.1119L17.5432 12.5014C17.5424 11.8425 17.8208 11.2133 18.3086 10.77L21.9361 7.47756C22.5295 6.93914 23.4353 6.93914 24.0287 7.47756ZM23.0077 10.722C22.2555 10.722 21.6455 11.3791 21.6455 12.1907C21.6455 13.0023 22.2555 13.6594 23.0077 13.6594C23.76 13.6594 24.3699 13.0023 24.3699 12.1907C24.3699 11.3791 23.76 10.722 23.0077 10.722Z" />
                    <path d="M19.0205 8.47922L17.6225 9.74804C16.831 10.4662 16.3746 11.5256 16.3755 12.6409L16.3886 24.9923C16.3886 25.1336 16.3851 25.2209 16.4165 25.4085C16.4479 25.5961 16.3764 25.6144 16.2403 25.5752C15.6355 25.4024 14.728 25.1397 13.5176 24.7881C12.6877 24.5481 12.1956 23.6292 12.4163 22.7347L15.3694 10.8004C15.5474 10.0823 16.0108 9.4845 16.6347 9.16948L18.7587 8.097C18.8739 8.03853 19.0144 8.08478 19.072 8.19997C19.1191 8.29334 19.0982 8.40853 19.0205 8.47922Z" />
                    <path d="M17.7826 7.38189L16.1046 8.2458C15.1542 8.73448 14.4396 9.63941 14.1516 10.7171L10.9673 22.6514C10.9429 22.7439 10.9176 22.8984 10.9149 23.0266C10.9123 23.1549 10.8992 23.3155 10.5423 23.0973C10.0327 22.7867 9.26827 22.3242 8.2464 21.7116C7.50727 21.2656 7.26904 20.2499 7.71409 19.4427L13.655 8.67951C14.0128 8.03113 14.615 7.57474 15.3 7.43163L17.6291 6.94556C17.7556 6.91938 17.8786 7.00054 17.9057 7.1262C17.9275 7.22917 17.8778 7.33302 17.7844 7.38189H17.7826Z" />
                    <path d="M16.9127 5.93183L15.0679 6.33151C14.0234 6.55752 13.0984 7.24691 12.5416 8.2138L6.37728 18.9168C6.31881 19.018 6.26645 19.1218 6.2202 19.2266C6.17919 19.3199 6.1722 19.5363 5.92786 19.3182C5.47147 18.9107 4.82659 18.2396 3.99147 17.305C3.39283 16.6828 3.42599 15.64 4.06477 14.9759L12.5888 6.11683C13.1019 5.58365 13.8017 5.2983 14.5007 5.33756L16.876 5.47108C17.0052 5.47806 17.1029 5.58889 17.096 5.71716C17.0898 5.82188 17.0148 5.91002 16.9127 5.93183Z" />
                  </svg>
                </div>
                Redeem Code
              </button>
            </div>
            {redeemStatus && (
              <div
                className={`absolute -bottom-6 left-0 text-xs font-bold ${redeemStatus.success ? "text-brand" : "text-red-500"}`}
              >
                {redeemStatus.message}
              </div>
            )}
          </div>
        </h1>
        <div className="bonus-root flex flex-col flex-wrap gap-4 sm:flex-row">
          <div className="relative flex flex-col justify-center rounded-xl px-0 md:px-4 pb-2 grow overflow-hidden py-4">
            <div className="absolute left-0 right-0 top-0 -z-10 h-screen bg-gradient-bonus sm:h-full sm:bg-layer3" />
            <img
              alt="Banner"
              className="absolute -bottom-44 left-18 -z-10 w-133.5 opacity-40 sm:left-full sm:top-1/2 sm:-translate-x-3/4 sm:-translate-y-1/2 sm:opacity-100"
              src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/banner_pc.png"
            />
            <div className="relative flex-none sm:flex flex-col items-start">
              <div className="flex gap-5 rounded-lg flex-col pr-20 bg-black_alpha5 px-3 py-2 backdrop-blur-sm">
                <div className="">
                  <h3 className="whitespace-nowrap text-sm text-secondary">
                    Total Bonus Claimed (<span>KRW</span>)
                  </h3>
                  <span className="text-2xl font-extrabold text-primary sm:text-xl">
                    ₩{stats?.total_claimed.toLocaleString() || 0}
                  </span>
                </div>
                <div className="mr-auto hidden w-auto gap-x-5 gap-y-3 sm:grid grid-cols-2 grid-rows-2">
                  <div className="flex flex-col text-xs leading-none">
                    <span className="flex h-4 items-center gap-x-1 whitespace-nowrap text-xs text-secondary">
                      Total VIP Bonus{" "}
                    </span>
                    <span className="whitespace-nowrap text-sm text-primary">
                      ₩{stats?.vip_bonus.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex flex-col text-xs leading-none">
                    <span className="flex h-4 items-center gap-x-1 whitespace-nowrap text-xs text-secondary">
                      Total Special Bonus{" "}
                    </span>
                    <span className="whitespace-nowrap text-sm text-primary">
                      ₩{stats?.special_bonus.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex flex-col text-xs leading-none">
                    <span className="flex h-4 items-center gap-x-1 whitespace-nowrap text-xs text-secondary">
                      Total General Bonus{" "}
                    </span>
                    <span className="whitespace-nowrap text-sm text-primary">
                      ₩{stats?.general_bonus.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex flex-col text-xs leading-none">
                    <span className="flex h-4 items-center gap-x-1 whitespace-nowrap text-xs text-secondary">
                      Total Locked Bonus
                    </span>
                    <span className="whitespace-nowrap text-sm text-primary">
                      ₩{stats?.locked_bonus.toLocaleString() || 0}
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="button button-s relative border-2 border-third bg-black_alpha5 px-3 py-1.5 backdrop-blur-sm self-start mt-3"
                type="button"
              >
                Details
                <div className="icon ml-1 size-4! rotate-180 fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between rounded-xl bg-layer4 p-4 sm:basis-104 bg-deposit-dashboard">
            <div className="relative z-20 flex justify-between">
              <div className="flex flex-col flex-wrap sm:flex-row sm:items-center sm:gap-x-2">
                <h3 className="text-lg font-extrabold text-primary">
                  Monthly Deposit Bonus
                </h3>
                <p className="text-sm font-semibold text-secondary">
                  Get up to: <span className="text-brand">₩142,960K</span>
                </p>
              </div>
              <button
                className="button button-m size-6 h-auto! shrink-0 items-start p-0 text-sm font-semibold text-brand underline sm:items-center"
                type="button"
              >
                <div className="icon size!-5 fill-tertiary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="relative z-10 -mb-6 mt-4">
              <div
                className="absolute left-1/2 top-1/2 h-5.5 -translate-x-1/2 -translate-y-1/2 bg-layer2"
                style={{
                  clipPath:
                    "polygon(0% 50%, 2% 0%, 3.2% 32%, 32.7% 32%, 34% 0%, 35.3% 32%, 64.7% 32%, 66% 0%, 67.3% 32%, 96.8% 32%, 98% 0%, 100% 50%, 100% 50%, 98% 100%, 96.8% 68%, 67.3% 68%, 66% 100%, 64.7% 68%, 35.3% 68%, 34% 100%, 32.7% 68%, 3.2% 68%, 2% 100%, 0% 50%)",
                  width: "95%",
                  maxWidth: "556px",
                }}
              />
              <div className="relative flex w-full">
                <div className="absolute">
                  <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                    <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                      <img
                        className=""
                        src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin.png"
                      />
                    </div>
                    <div
                      className="relative -z-20 bg-alw_dark"
                      style={{
                        height: "60px",
                      }}
                    />
                    <span className="flex items-center text-sm font-semibold text-[#FFBA08]">
                      180%
                    </span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    left: "33.3333%",
                    transform: "translateX(-33.3333%)",
                  }}
                >
                  <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                    <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                      <img
                        className="grayscale"
                        src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin2_closed.png"
                      />
                    </div>
                    <div
                      className="relative -z-20 bg-alw_dark"
                      style={{
                        height: "60px",
                      }}
                    />
                    <span className="flex items-center text-sm font-semibold text-secondary">
                      240%
                    </span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    left: "66.6667%",
                    transform: "translateX(-66.6667%)",
                  }}
                >
                  <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                    <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                      <img
                        className="grayscale"
                        src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin3_closed.png"
                      />
                    </div>
                    <div
                      className="relative -z-20 bg-alw_dark"
                      style={{
                        height: "60px",
                      }}
                    />
                    <span className="flex items-center text-sm font-semibold text-secondary">
                      300%
                    </span>
                  </div>
                </div>
                <div
                  className="absolute"
                  style={{
                    left: "100%",
                    transform: "translateX(-100%)",
                  }}
                >
                  <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                    <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                      <img
                        className="grayscale"
                        src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin4_closed.png"
                      />
                    </div>
                    <div
                      className="relative -z-20 bg-alw_dark"
                      style={{
                        height: "60px",
                      }}
                    />
                    <span className="flex items-center text-sm font-semibold text-secondary">
                      360%
                    </span>
                  </div>
                </div>
                <div className="invisible flex flex-row">
                  <div className="relative">
                    <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                      <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                        <img
                          className=""
                          src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin.png"
                        />
                      </div>
                      <div
                        className="relative -z-20 bg-alw_dark"
                        style={{
                          height: "60px",
                        }}
                      />
                      <span className="flex items-center text-sm font-semibold text-[#FFBA08]">
                        180%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                      <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                        <img
                          className="grayscale"
                          src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin2_closed.png"
                        />
                      </div>
                      <div
                        className="relative -z-20 bg-alw_dark"
                        style={{
                          height: "60px",
                        }}
                      />
                      <span className="flex items-center text-sm font-semibold text-secondary">
                        240%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                      <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                        <img
                          className="grayscale"
                          src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin3_closed.png"
                        />
                      </div>
                      <div
                        className="relative -z-20 bg-alw_dark"
                        style={{
                          height: "60px",
                        }}
                      />
                      <span className="flex items-center text-sm font-semibold text-secondary">
                        300%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="-mb-4 -mt-8 flex h-40 flex-col items-center justify-center">
                      <div className="flex size-16 cursor-pointer items-center justify-center absolute -top-4">
                        <img
                          className="grayscale"
                          src="https://bc.game/substation/bc/bonus/bonus/deposit-dashboard/coin4_closed.png"
                        />
                      </div>
                      <div
                        className="relative -z-20 bg-alw_dark"
                        style={{
                          height: "60px",
                        }}
                      />
                      <span className="flex items-center text-sm font-semibold text-secondary">
                        360%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex flex-col gap-y-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-semibold text-secondary">
                <span className="flex items-center">
                  <img
                    className="h-4 w-4"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKZSURBVHgB7VZLctpAEO0eAWtyA+UEwetUEQavUg6OOYHxCcwNXD5B7BMEnwAXVCorW0AWWZqcINwgrB1pOt1CVI1GHxRj7/yqKAmkntf95nUPAK94ZiD8J74HP/0QQn/7ne+Xfa3X9juTYPEFiTohGu0+q1XggGnwo4OGTgnpJKTHZnoBBdP7+ZIIr48P26O4CQKhXOvGG/Dlyn6/tMJxEDRr4H0FohPr5zUHxVkTgJA3rcVWHlcVkQr4mY+Io0+6fZZOsJjMr8eB5MeLcTBBdNPTegap6oMOkRow2amQhKR+C3GcEFHLXRfLyThLDkY0/SOtl1CCb0HQYuKxxNi/97ofUhwqL7gO3sWWTCTaRSbSAzS4IrjJS8T+npFUDEJkBnIvZB+1XsEOsBoPRpybo5dK9ruQUAGdG9jsWRUyB7L4CgmXoKJfrNLSXSNFKNKYxJFiEKiIv2gOGrwFu6QXpEQQOYFMIJnyZr+BPbDZVwC38VOmIZO0gKP7U1Bjl/Pnj2uatEtVtGlo2YP9ERMZazBkCI+1vq2heRuq6Az2wFbOhKDcpa6rJLgBDTbE+8pVe5HXAUVyu3aNlNuHPKhFjnc8hbknwece4wG9mPW6bQ0VgArO4yvirfvMbQtfXEp5A4+qGWlytxjwyx259yC6LCXkXmoa5wXlwRCMmR91d/eYJKyIZCwWDo6UaRK9U5VQBENVoU1kK+yBn1edICMeH6YPfGlJkD35JWME79o1z2ZY0MVWxu3ALxqLGcLJ/XwkZ5sE8sjS3LxjSHoqQeEBzMvNQoz67nSxkR3e3PT8VyI+TPubLA+md/MrRPicVNwkp5mFCDC6dA/nShXGfyt4L9it896hHtrP4tPdktnj0+CRlSir6BUvjn8vszx5QoSApgAAAABJRU5ErkJggg=="
                  />
                  <span>Monthly Reset: </span>
                  <span className="text-primary">4days remaining</span>
                </span>
              </span>
              <button
                className="button button-brand button-m text-lg sm:text-base"
                type="button"
              >
                Deposit Now
              </button>
            </div>
            <div
              className="mt-2 w-full"
              style={{
                outline:
                  "1px var(--Border-Color-border-third, rgba(228, 234, 240, 0.10)) solid",
                outlineOffset: "-0.50px",
              }}
            />
            <div className="mx-2 mt-2 flex flex-row items-center justify-center gap-1">
              <div className="icon size-5! cursor-pointer fill-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                </svg>
              </div>
              <span className="font-semibold text-secondary">
                Deposit bonus will be added to your{" "}
              </span>
              <span className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-white_alpha5 px-2 py-1">
                <img
                  className="h-auto w-8"
                  src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-rakeback.png"
                />
                <span className="font-semibold underline">Rakeback</span>
              </span>
            </div>
          </div>
        </div>
        <div className="relative mt-4 px-4">
          <div className="-mx-4 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center justify-between text-lg font-extrabold text-primary">
                  <span className="relative">VIP Bonus</span>
                </h2>
              </div>
              <div
                className="grid gap-x-3 gap-y-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))",
                }}
              >
                <div
                  className="relative"
                  style={{
                    gridColumn: "span 2 / span 2",
                  }}
                >
                  <div
                    className="vip-common-color relative flex h-full flex-col overflow-hidden rounded-xl bg-layer4 p-3 sm:p-4"
                    style={{
                      backgroundImage:
                        "linear-gradient(0deg, transparent 5%, rgba(113, 113, 113, 0.5) 80%)",
                    }}
                  >
                    <div className="flex gap-x-4">
                      <div className="relative size-24 shrink-0 sm:size-36">
                        <img
                          className="w-full"
                          src="https://bc.game/assets/vip/badge-none.png"
                        />
                      </div>
                      <div className="flex grow flex-col gap-y-2 sm:justify-center sm:gap-y-4">
                        <h2 className="flex items-center gap-x-2">
                          <span className="text-2xl font-extrabold uppercase text-primary sm:text-3xl">
                            VIP 0
                          </span>
                        </h2>
                        <div className="flex flex-col gap-y-3 rounded-lg bg-layer5 p-4! sm:p-0">
                          <p className="flex items-center text-xs font-semibold text-primary sm:justify-between">
                            <span>0 XP</span>
                            <span className="px-1" />
                            <span className="text-secondary">1 XP</span>
                          </p>
                          <div className="w-full rounded-full bg-layer6">
                            <div
                              className="relative h-2 rounded-xl sm:h-3"
                              style={{
                                backgroundImage:
                                  "linear-gradient(to right, rgb(185, 185, 185), rgb(241, 241, 241))",
                                width: "0%",
                              }}
                            >
                              <div className="absolute right-0 top-1/2 w-6 -translate-y-1/2 translate-x-2">
                                <svg
                                  className="size-6"
                                  fill="#B9B9B9"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    opacity="0.1"
                                    r="12"
                                  />
                                  <circle
                                    cx="12"
                                    cy="12"
                                    opacity="0.25"
                                    r="7"
                                  />
                                  <circle cx="12" cy="12" r="4" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="hidden text-xs font-semibold text-secondary sm:block">
                            1XP until <span className="uppercase">VIP 1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex grow flex-col justify-center">
                      <p className="mt-3 flex justify-between text-xs font-semibold text-secondary">
                        <span>Total VIP Bonus Claimed</span>
                        <span className="text-primary">₩0</span>
                      </p>
                      <div className="mt-2 h-12 rounded-lg bg-layer2 text-sm">
                        <div className="center h-full w-full text-center">
                          <div className="flex items-center gap-x-2 font-semibold text-secondary">
                            <div className="icon size-5!">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                              </svg>
                            </div>
                            Available at VIP 22
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 w-full flex justify-center font-extrabold cursor-pointer bg-clip-text text-transparent bg-linear-to-r from-[#9FE871] to-[#24EE89]!">
                        Bet in APP to Claim 1.5 x XP
                      </div>
                    </div>
                    <div className="absolute -top-1 right-2 items-center justify-center sm:right-4 sm:flex">
                      <a className="flex inactive" href="/vip-level">
                        <button
                          className="button button-xs mt-3 px-0! text-center text-sm font-extrabold text-secondary sm:text-brand"
                          type="button"
                        >
                          View Level Up Details
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="col-span-2 overflow-hidden rounded-xl bg-layer4 bg-no-repeat p-3 bg-quad-bonus-card sm:p-4"
                  style={{
                    backgroundImage:
                      'url("https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-quad.png")',
                  }}
                >
                  <div className="mb-2 text-lg font-extrabold">
                    Hit <span className="text-brand">VIP 22</span> - Your Bonus
                    Buffet Awaits!
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center rounded-xl bg-black_alpha5 backdrop-blur-md">
                      <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
                        <img
                          className="max-h-full max-w-full"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-weekly.png"
                        />
                      </div>
                      <div className="padding-2 flex flex-1 flex-col">
                        <span className="text-base font-semibold">
                          Weekly Cashback
                        </span>
                        <span className="leading-tight text-secondary">
                          Personalised cash drop every Friday
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center rounded-xl bg-black_alpha5 backdrop-blur-md">
                      <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
                        <img
                          className="max-h-full max-w-full"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-monthly.png"
                        />
                      </div>
                      <div className="padding-2 flex flex-1 flex-col">
                        <span className="text-base font-semibold">
                          Monthly Cashback
                        </span>
                        <span className="leading-tight text-secondary">
                          Supersized rebate on the 15th
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center rounded-xl bg-black_alpha5 backdrop-blur-md">
                      <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
                        <img
                          className="max-h-full max-w-full"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-sports.png"
                        />
                      </div>
                      <div className="padding-2 flex flex-1 flex-col">
                        <span className="text-base font-semibold">
                          Sports Weekly Cashback
                        </span>
                        <span className="leading-tight text-secondary">
                          Up to $1,000 every Saturday
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center rounded-xl bg-black_alpha5 backdrop-blur-md">
                      <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
                        <img
                          className="max-h-full max-w-full"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-recharge.png"
                        />
                      </div>
                      <div className="padding-2 flex flex-1 flex-col">
                        <span className="text-base font-semibold">
                          Recharge Boost
                        </span>
                        <span className="leading-tight text-secondary">
                          Tailored bonus credits with every reload
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center rounded-xl bg-black_alpha5 backdrop-blur-md col-span-full">
                      <div className="flex h-16 w-16 items-center justify-center sm:h-16 sm:w-16">
                        <img
                          className="max-h-full max-w-full"
                          src="https://bc.game/modules/bonus2/assets/taco-bonus-Ci_SZJ6K.png"
                        />
                      </div>
                      <div className="padding-2 flex flex-1 flex-col">
                        <span className="text-base font-semibold">
                          Taco Tuesday
                        </span>
                        <span className="leading-tight text-secondary">
                          Snag your exclusive Taco Bonus every Tuesday
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center justify-between text-lg font-extrabold text-primary">
                  <span className="relative">General Bonus</span>
                </h2>
              </div>
              <div
                className="grid gap-x-3 gap-y-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(17rem, 1fr))",
                }}
              >
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(118, 255, 34, 0.5)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute right-3 top-3 flex items-center gap-x-1">
                      <button
                        className="button button-m size-6 p-0"
                        type="button"
                      >
                        <div className="icon size-6 cursor-pointer fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="flex shrink-0 items-center justify-center">
                      <img
                        className="w-24 sm:h-30 sm:w-auto"
                        src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/dailybonus.png"
                      />
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      <div className="flex flex-col justify-center gap-y-1">
                        <h3>Daily Bonus</h3>
                      </div>
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <div className="sm:flex sm:h-full sm:w-full sm:items-center sm:justify-center">
                          <div className="flex items-center gap-x-2 font-semibold text-secondary">
                            <div className="icon size-5!">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                              </svg>
                            </div>
                            Available at VIP 2
                          </div>
                        </div>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(214, 129, 0, 0.6)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute right-3 top-3 flex items-center gap-x-1">
                      <button
                        className="button button-m size-6 p-0"
                        type="button"
                      >
                        <div className="icon size-6 cursor-pointer fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="flex shrink-0 items-center justify-center">
                      <img
                        className="w-24 sm:h-30 sm:w-auto"
                        src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-rakeback.png"
                      />
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      BCD Rakeback
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Locked BCD
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              {rakeback?.locked_bcd || 0} BCD
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Unlock Rate%
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              {rakeback?.unlock_rate || 0}%
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Ready to claim
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              {rakeback?.ready_to_claim || 0} BCD
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center">
                          {rakeback?.next_claim_time ? (
                            <span className="text-secondary">
                              Next claim:{" "}
                              <span className="text-primary">
                                {new Date(
                                  rakeback.next_claim_time,
                                ).toLocaleTimeString()}
                              </span>
                            </span>
                          ) : (
                            <span className="text-brand">Ready to claim!</span>
                          )}
                        </p>
                        <div className="w-full">
                          <button
                            onClick={claimRakeback}
                            className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                            disabled={!rakeback || rakeback.ready_to_claim <= 0}
                            type="button"
                          >
                            Claim
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(197, 36, 90, 0.6)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <img
                        className="w-24 sm:h-30 sm:w-auto"
                        src="https://bc.game/substation/bc/bonus/bonus/card-tasks/task-bind-phone.png"
                      />
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      <div className="flex flex-col justify-center gap-y-1">
                        <h3>Phone Verification</h3>
                        <div className="flex justify-center">
                          <p
                            className="rounded-xl px-2 py-1 text-xs font-extrabold text-brand"
                            style={{
                              background: "rgba(36, 238, 137, 0.30)",
                            }}
                          >
                            Earn 1 BCD Bonus
                          </p>
                        </div>
                      </div>
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <p className="flex grow items-center justify-start font-semibold text-secondary sm:justify-center sm:text-center">
                          Verify your phone now to protect you account.
                        </p>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full">
                          <a
                            className="inactive"
                            href="/settings/mobile"
                            target=""
                          >
                            <button
                              className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                              type="button"
                            >
                              Go Verify
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(7, 111, 205, 0.6)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <img
                        className="w-24 sm:h-30 sm:w-auto"
                        src="https://bc.game/substation/bc/bonus/bonus/card-tasks/task-bind-tg.png"
                      />
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      <div className="flex flex-col justify-center gap-y-1">
                        <h3>Telegram Subscription</h3>
                        <div className="flex justify-center">
                          <p
                            className="rounded-xl px-2 py-1 text-xs font-extrabold text-brand"
                            style={{
                              background: "rgba(36, 238, 137, 0.30)",
                            }}
                          >
                            Earn 2 BCD Bonus
                          </p>
                        </div>
                      </div>
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <p className="flex grow items-center justify-start font-semibold text-secondary sm:justify-center sm:text-center">
                          Connect your TG account, join our TG channel to claim
                          more daily bonuses!
                        </p>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full">
                          <a
                            className="inactive"
                            href="/tg-progress/tg-task"
                            target=""
                          >
                            <button
                              className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                              type="button"
                            >
                              Go Verify
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(111, 60, 255, 0.6)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <div className="w-24 sm:h-30 sm:w-auto">
                        <img
                          className="size-full sm:h-full sm:w-auto"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-quests.png"
                        />
                      </div>
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      Quests
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Daily Quests
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              0
                            </span>
                            <span>/3</span>
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Weekly Quests
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              0
                            </span>
                            <span>/1</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full">
                          <a className="inactive" href="/quests">
                            <button
                              className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                              type="button"
                            >
                              Claim
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgb(225, 152, 62,0.8)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="flex shrink-0 items-center justify-center">
                      <img
                        className="w-24 sm:h-30 sm:w-auto"
                        src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-challenge.png"
                      />
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      <div className="flex flex-col justify-center gap-y-1">
                        <h3>Challenge</h3>
                      </div>
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Challenges completed
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              <span>0 / 6</span>
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            My rewards
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              0 BCD
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full">
                          <button
                            className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                            type="button"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                    style={
                      {
                        ["--bonus-card-gradient-color" as any]:
                          "rgba(206, 124, 0, 0.6)",
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute right-3 top-3 flex items-center gap-x-1">
                      <button
                        className="button button-m size-6 p-0"
                        type="button"
                      >
                        <div className="icon size-6 cursor-pointer fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="flex shrink-0 items-center justify-center">
                      <div className="w-24 sm:h-30 sm:w-auto">
                        <img
                          className="size-full sm:h-full sm:w-auto"
                          src="https://bc.game/substation/bc/bonus/bonus/bonuses-page/bonus-lucky-spin.png"
                        />
                      </div>
                    </div>
                    <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                      Lucky Spin
                    </h2>
                    <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                      <div className="">
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            VIP Spin
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              <span>Reach VIP 8</span>
                            </span>
                          </span>
                        </div>
                        <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                          <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                            Daily Spin
                          </span>
                          <span className="ml-1 inline-flex flex-wrap justify-end">
                            <span className="font-extrabold text-primary">
                              ₩0
                            </span>
                            <span>/₩285,921</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex grow flex-col justify-end gap-y-2">
                        <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                        <div className="w-full">
                          <a className="inactive" href="/new-spin">
                            <button
                              className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                              type="button"
                            >
                              Claim
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-gradient-bonus-card border border-solid border-transparent relative z-0 flex h-full min-h-74 flex-col gap-x-4 overflow-hidden rounded-xl bg-layer4 bg-origin-border p-3 leading-4 transition-all"
                  style={
                    {
                      ["--bonus-card-gradient-color" as any]:
                        "rgba(196, 44, 44, 0.6)",
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute right-3 top-3 flex items-center gap-x-1">
                    <button
                      className="button button-m size-6 p-0"
                      type="button"
                    >
                      <div className="icon size-6 cursor-pointer fill-secondary">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="flex shrink-0 items-center justify-center">
                    <img
                      className="w-24 sm:h-30 sm:w-auto"
                      src="https://bc.game/substation/bc/bonus/bonus/vault/vault.png"
                    />
                  </div>
                  <h2 className="text-lg font-extrabold leading-snug text-primary sm:flex sm:justify-center sm:text-center">
                    Vault Pro
                  </h2>
                  <div className="light-darkness mt-4 flex grow flex-col justify-between gap-y-1 rounded-lg bg-layer3 p-2">
                    <div className="">
                      <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                        <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                          My Holdings
                        </span>
                        <span className="ml-1 inline-flex flex-wrap justify-end">
                          <span className="font-extrabold text-primary">
                            ₩0
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start justify-between text-sm font-semibold text-secondary">
                        <span className="after-colon max-w-32 shrink-0 overflow-hidden text-ellipsis text-nowrap">
                          Total Return
                        </span>
                        <span className="ml-1 inline-flex flex-wrap justify-end">
                          <span className="font-extrabold text-primary">
                            ₩0
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex grow flex-col justify-end gap-y-2">
                      <p className="flex items-center text-nowrap text-xs font-semibold text-secondary sm:justify-center" />
                      <div className="w-full">
                        <a
                          className="inactive"
                          href="/wallet/transfer-in?type=in"
                        >
                          <button
                            className="button button-second button-m h-auto! min-h-10! w-full wrap-break-word text-base font-extrabold"
                            type="button"
                          >
                            Transfer In
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center justify-between text-lg font-extrabold text-primary">
                  <span className="relative">Special Bonus</span>
                </h2>
              </div>
              <div>
                <div
                  className="grid gap-x-3 gap-y-3"
                  style={
                    {
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(17rem, 1fr))",
                    } as React.CSSProperties
                  }
                >
                  <section className="py-10 text-center center flex-col col-span-full">
                    <img
                      className="w-48 h-48"
                      src="https://bc.game/substation/bc/common/empty_w.png"
                    />
                    <div className="leading-5 mt-4">
                      Stay tuned—something's coming!
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
