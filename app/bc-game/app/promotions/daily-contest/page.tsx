import Image from "next/image";

import ImgTrophy from "@/public/assets/images/substation/platform/trophy.webp";
import ImgGrass from "@/public/assets/images/substation/platform/grass.webp";

export default function DailyContest() {
  return (
    <>
      <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
        <div className="flex flex-col gap-3 text-secondary my-4">
          <div className="flex flex-wrap gap-3">
            <div className="flex w-full items-center overflow-hidden rounded-xl bg-linear-to-r from-[rgba(44,217,125,0.2)] from-0% to-white to-60% py-4 px-4">
              <img
                className="w-28"
                src="https://bc.game/substation/bc/platform/contest/trophy.png"
              />
              <div className="center ml-6 flex flex-col">
                <div className="flex text-base font-extrabold text-brand">
                  <img
                    className="w-6"
                    src="https://bc.game/substation/bc/platform/contest/grass.png"
                  />
                  <span>Daily Contest</span>
                  <img
                    className="w-6 -scale-x-100"
                    src="https://bc.game/substation/bc/platform/contest/grass.png"
                  />
                </div>
                <div className="my-1">Contest prize pool</div>
                <div className="overflow-hidden text-nowrap rounded-xl bg-layer2 px-3 py-2 text-center font-mono text-2xl font-extrabold text-brand">
                  83,929.43 BCD
                </div>
              </div>
            </div>
            <div className="flex-1 rounded-xl bg-layer4 py-6 sm:py-7">
              <div className="mb-3 text-center text-base font-extrabold text-brand">
                Time Remaining
              </div>
              <div className="flex center">
                <div className="flex-col rounded-xl bg-layer2 py-1 center h-15 w-12 font-mono">
                  <div className="text-xl font-extrabold text-primary">05</div>
                  <div className="text-xxs">Hour</div>
                </div>
                <b className="mx-1 text-2xl font-extrabold text-tertiary">:</b>
                <div className="flex-col rounded-xl bg-layer2 py-1 center h-15 w-12 font-mono">
                  <div className="text-xl font-extrabold text-primary">01</div>
                  <div className="text-xxs">Minute</div>
                </div>
                <b className="mx-1 text-2xl font-extrabold text-tertiary">:</b>
                <div className="flex-col rounded-xl bg-layer2 py-1 center h-15 w-12 font-mono">
                  <div className="text-xl font-extrabold text-primary">36</div>
                  <div className="text-xxs">Second</div>
                </div>
              </div>
            </div>
            <div className="relative flex-1 rounded-xl bg-layer4 py-6 sm:py-7">
              <div className="absolute left-0 top-0 w-18 font-extrabold text-primary_brand">
                <img
                  className="absolute -left-0.5 -top-0.5 w-16"
                  src="https://bc.game/substation/bc/platform/contest/winner.png"
                />
                <div className="w-full translate-x-[-22%] translate-y-1/2 rotate-[-42deg] text-center">
                  Winner
                </div>
              </div>
              <div className="icon absolute right-2.5 top-2.5 h-4.5! w-4.5! cursor-pointer">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0001 4C22.6276 4 28.0003 9.37263 28.0003 16.0001C28.0003 22.6276 22.6276 28.0003 16.0001 28.0003C9.37263 28.0003 4 22.6276 4 16.0001C4 9.37263 9.37263 4 16.0001 4ZM16.0001 6.57146C10.7929 6.57146 6.57146 10.7929 6.57146 16.0001C6.57146 21.2073 10.7929 25.4288 16.0001 25.4288C21.2073 25.4288 25.4288 21.2073 25.4288 16.0001C25.4288 10.7929 21.2073 6.57146 16.0001 6.57146ZM15.9607 21.0711C16.6704 21.0711 17.2464 21.6471 17.2464 22.3568C17.2464 23.0665 16.6704 23.6425 15.9607 23.6425C15.251 23.6425 14.675 23.0665 14.675 22.3568C14.675 21.6471 15.251 21.0711 15.9607 21.0711ZM16.187 8.99463C17.5242 8.99463 18.6145 9.34435 19.4373 10.0849C20.2602 10.8049 20.6716 11.7924 20.6716 13.0472C20.6716 14.0758 20.4042 14.9193 19.9105 15.5776C19.7253 15.7833 19.1287 16.3387 18.1413 17.2027C17.771 17.5113 17.5036 17.861 17.3184 18.2313C17.1419 18.5836 17.0416 18.9513 17.0159 19.3602L17.0099 19.5685V19.8565H14.6441V19.5685C14.6441 18.7867 14.7676 18.1079 15.0556 17.5524C15.3084 17.0279 16.0379 16.2281 17.2447 15.1353L17.4624 14.9398L17.7093 14.6518C18.0796 14.1993 18.2647 13.7055 18.2647 13.1912C18.2647 12.5124 18.059 11.9775 17.6887 11.5867C17.2979 11.1958 16.7424 11.0107 16.043 11.0107C15.1378 11.0107 14.5001 11.2781 14.1093 11.8541C13.7913 12.2844 13.6267 12.8844 13.5993 13.6387L13.595 13.8701H11.2498C11.2498 12.3478 11.6818 11.1547 12.587 10.2906C13.4715 9.42663 14.6647 8.99463 16.187 8.99463Z" />
                </svg>
              </div>
              <div className="center mb-4 text-base font-extrabold text-brand">
                Last Champion
              </div>
              <div className="center ml-5 flex">
                <div className="relative mr-2 mt-3">
                  <img
                    className="absolute -top-3 left-1 w-8"
                    src="https://bc.game/substation/bc/platform/contest/crown.png"
                  />
                  <img
                    className="h-10 w-10 rounded-full"
                    src="//img2.distributedresourcestorage.com/avatar/7050075/s"
                  />
                </div>
                <div className="text-xs">
                  <div className="text-primary">Hidden</div>
                  <div className="profit-name">
                    Profit
                    <span className="ml-1 text-primary">(50%)</span>
                  </div>
                  <div className="profit">
                    <span className="text-brand">₩71,543,994</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row rounded-xl bg-layer4 p-4 gap-4 md:gap-0">
            {/* User Profile Section */}
            <div className="center flex-1">
              <img
                className="mr-2 h-10 w-10 rounded-full"
                src="//img2.distributedresourcestorage.com/avatar/102324897/s?t=0"
                alt="avatar"
              />
              <div className="font-extrabold text-primary">techcode187</div>
            </div>

            {/* Stats Wrapper - Naka-grid sa mobile para hindi dugyot tingnan */}
            <div className="grid grid-cols-2 md:flex md:flex-3 w-full">
              {/* My Position */}
              <div className="center flex-1 flex-col border-0 md:border-l border-solid border-third">
                <div className="text-sm md:text-base">My Position</div>
                <div className="mt-1 text-base font-extrabold text-brand">
                  50th+
                </div>
              </div>

              {/* Wager */}
              <div className="center flex-1 flex-col border-l border-solid border-third">
                <div className="text-sm md:text-base">Wager</div>
                <div className="mt-1 text-base font-extrabold text-brand">
                  ₩0
                </div>
              </div>

              {/* Target/Goal - Spans full width on mobile if needed, or stays in line on desktop */}
              <div className="center col-span-2 md:col-span-1 flex-1 flex-col border-t mt-4 pt-4 md:mt-0 md:pt-0 md:border-t-0 md:border-l border-solid border-third">
                <div className="text-xs text-center px-2">
                  Wager{" "}
                  <span className="mx-1 text-primary font-bold">
                    ₩2,635,122K
                  </span>
                  To reach
                  <span className="ml-1 inline-block rounded-xl bg-[#F6519666]/40 px-2 py-0.5 font-semibold text-alw_white">
                    Top 10
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex overflow-hidden relative">
            <div className="rounded-xl bg-layer4 pt-3 is-active w-full">
              <div className="flex items-center justify-between border-b border-third pb-3">
                <div className="relative flex h-7 w-20 items-center pl-1 text-xs leading-7 text-primary_brand">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 top-0 w-20 fill-brand"
                    viewBox="0 0 77 28"
                  >
                    <path d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H74.2689C75.958 0 76.8865 1.96429 75.8144 3.26948L68.0428 12.7305C67.4367 13.4683 67.4367 14.5317 68.0428 15.2695L75.8144 24.7305C76.8865 26.0357 75.958 28 74.2689 28H2.5C1.39543 28 0.5 27.1046 0.5 26V2Z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 w-4 animate-spin fill-current"
                    viewBox="0 0 17 16"
                    style={{ animationDuration: "5s" }}
                  >
                    <path d="M8.49999 10.88C9.05949 10.88 9.51849 11.311 9.56299 11.8595L9.56649 11.947V13.9335C9.56649 14.5225 9.08899 15.0005 8.49949 15.0005C7.93999 15.0005 7.48099 14.5695 7.43649 14.021L7.43299 13.9335V11.947C7.43299 11.358 7.91049 10.88 8.49949 10.88H8.49999ZM6.46349 10.0365C6.85899 10.432 6.87899 11.0615 6.52299 11.4805L6.46349 11.545L5.05899 12.9495C4.64249 13.366 3.96699 13.366 3.55049 12.9495C3.15499 12.554 3.13499 11.9245 3.49099 11.5055L3.55049 11.441L4.95499 10.0365C5.37149 9.62001 6.04699 9.62001 6.46349 10.0365ZM11.981 9.97701L12.0455 10.0365L13.45 11.441C13.8665 11.8575 13.8665 12.533 13.45 12.9495C13.0545 13.345 12.425 13.365 12.006 13.009L11.9415 12.9495L10.537 11.545C10.1205 11.1285 10.1205 10.453 10.537 10.0365C10.9325 9.64101 11.562 9.62101 11.981 9.97701ZM14.433 6.93301C15.022 6.93301 15.5 7.41051 15.5 7.99951C15.5 8.55901 15.069 9.01801 14.5205 9.06251L14.433 9.06601H12.4465C11.8575 9.06601 11.3795 8.58851 11.3795 7.99951C11.3795 7.44001 11.8105 6.98101 12.359 6.93651L12.4465 6.93301H14.433ZM4.55299 6.93301C5.14199 6.93301 5.61949 7.41051 5.61949 7.99951C5.61949 8.55901 5.18849 9.01801 4.63999 9.06251L4.55249 9.06601H2.56599C1.97699 9.06601 1.49899 8.58851 1.49899 7.99951C1.49899 7.44001 1.92999 6.98101 2.47849 6.93651L2.56599 6.93301H4.55249H4.55299ZM13.4495 3.05051C13.845 3.44601 13.865 4.07551 13.509 4.49451L13.4495 4.55901L12.045 5.96351C11.6285 6.38001 10.953 6.38001 10.5365 5.96351C10.141 5.56801 10.121 4.93851 10.477 4.51951L10.5365 4.45501L11.941 3.05051C12.3575 2.63401 13.033 2.63401 13.4495 3.05051ZM4.99449 2.99101L5.05899 3.05051L6.46349 4.45501C6.87999 4.87151 6.87999 5.54701 6.46349 5.96351C6.06799 6.35901 5.43849 6.37901 5.01949 6.02301L4.95499 5.96351L3.55049 4.55901C3.13399 4.14251 3.13399 3.46701 3.55049 3.05051C3.94599 2.65501 4.57549 2.63501 4.99449 2.99101ZM8.49999 1.00001C9.05949 1.00001 9.51849 1.43101 9.56299 1.97951L9.56649 2.06701V4.05351C9.56649 4.64251 9.08899 5.12001 8.49949 5.12001C7.93999 5.12001 7.48099 4.68901 7.43649 4.14051L7.43299 4.05301V2.06651C7.43299 1.47751 7.91049 0.999512 8.49949 0.999512L8.49999 1.00001Z"></path>
                  </svg>
                  <div className="ellipsis relative z-10 ml-1 font-extrabold">
                    Active
                  </div>
                </div>
                <div className="ml-4 font-extrabold text-primary sm:ml-6">
                  1/21/2026 ~ 1/22/2026
                </div>
                <button
                  className="button button-second button-m center mr-3 h-8 gap-1.5 bg-button_bright"
                  type="button"
                >
                  <span>History</span>
                  <div className="icon size-4! rotate-180 fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <table className="table text-xs [&amp;_td]:px-2 [&amp;_td]:py-3 w-full">
                <tbody>
                  <tr className="list-head item">
                    <td className="w-14 text-center! sm:w-16">#</td>
                    <td>Player</td>
                    <td>Wager</td>
                    <td className="text-center!">Prize</td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/gold.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/68346687" className="inactive">
                          Norman6new
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩11,222,302K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩45,988,000
                      </span>
                      <span className="ml-1">(50%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/silver.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/45824219" className="inactive">
                          Highlander166
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩10,380,442K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩22,994,000
                      </span>
                      <span className="ml-1">(25%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/copper.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/103046110" className="inactive">
                          rabdan
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩9,582,306K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩11,037,120
                      </span>
                      <span className="ml-1">(12%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>4th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <span className="center flex text-secondary">Hidden</span>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩5,958,269K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩5,518,560
                      </span>
                      <span className="ml-1">(6%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>5th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/54029078" className="inactive">
                          sugmad
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩5,545,369K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩2,759,280
                      </span>
                      <span className="ml-1">(3%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>6th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/33906532" className="inactive">
                          Brapzbgbvpac
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩5,085,839K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩1,379,640
                      </span>
                      <span className="ml-1">(1.5%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>7th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <span className="center flex text-secondary">Hidden</span>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩4,935,456K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩827,784
                      </span>
                      <span className="ml-1">(0.9%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>8th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/11588768" className="inactive">
                          Hvkeyotlkyb
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩4,357,197K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩643,832
                      </span>
                      <span className="ml-1">(0.7%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>9th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/166244" className="inactive">
                          randreo
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩2,875,327K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩459,880
                      </span>
                      <span className="ml-1">(0.5%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>10th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/68249425" className="inactive">
                          Highlanderrrr
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩2,635,122K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩367,904
                      </span>
                      <span className="ml-1">(0.4%)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* <div
              className="rounded-xl bg-layer4 pt-3"
              style={{
                minWidth: "1216px",
                maxWidth: "1216px",
                transform: "translate3d(8px, 0px, 0px)",
              }}
            >
              <div className="flex items-center justify-between border-b border-third pb-3">
                <div className="relative flex h-7 w-20 items-center pl-1 text-xs leading-7 text-primary_brand">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-0 top-0 w-20 fill-brand"
                    viewBox="0 0 77 28"
                  >
                    <path d="M0.5 2C0.5 0.895431 1.39543 0 2.5 0H74.2689C75.958 0 76.8865 1.96429 75.8144 3.26948L68.0428 12.7305C67.4367 13.4683 67.4367 14.5317 68.0428 15.2695L75.8144 24.7305C76.8865 26.0357 75.958 28 74.2689 28H2.5C1.39543 28 0.5 27.1046 0.5 26V2Z"></path>
                  </svg>
                  <div className="ellipsis relative z-10 ml-1 font-extrabold">
                    Completed
                  </div>
                </div>
                <div className="ml-4 font-extrabold text-primary sm:ml-6">
                  1/20/2026 ~ 1/21/2026
                </div>
                <button
                  className="button button-second button-m center mr-3 h-8 gap-1.5 bg-button_bright"
                  type="button"
                >
                  <span>History</span>
                  <div className="icon size-4! rotate-180 fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
              <table className="table text-xs [&amp;_td]:px-2 [&amp;_td]:py-3">
                <tbody>
                  <tr className="list-head item">
                    <td className="w-14 text-center! sm:w-16">#</td>
                    <td>Player</td>
                    <td>Wager</td>
                    <td className="text-center!">Prize</td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/gold.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/94436797" className="inactive">
                          Hijinx
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩9,137,690K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩48,971,407
                      </span>
                      <span className="ml-1">(50%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/silver.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/60452944" className="inactive">
                          ToorkeyT
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩7,674,828K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩24,485,703
                      </span>
                      <span className="ml-1">(25%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <img
                        className="w-5"
                        src="https://bc.game/substation/bc/platform/contest/copper.png"
                      />
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/45824219" className="inactive">
                          Highlander166
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩7,000,307K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩11,753,137
                      </span>
                      <span className="ml-1">(12%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>4th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <span className="center flex text-secondary">Hidden</span>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩6,129,987K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩5,876,568
                      </span>
                      <span className="ml-1">(6%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>5th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/101983861" className="inactive">
                          raducugeneric
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩5,778,429K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩2,938,284
                      </span>
                      <span className="ml-1">(3%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>6th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/103046110" className="inactive">
                          rabdan
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩3,671,472K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩1,469,142
                      </span>
                      <span className="ml-1">(1.5%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>7th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/103096493" className="inactive">
                          Hdeio3u
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩3,281,216K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩881,485
                      </span>
                      <span className="ml-1">(0.9%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>8th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/62842850" className="inactive">
                          Cpaajexyjuac
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩2,856,840K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩685,599
                      </span>
                      <span className="ml-1">(0.7%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>9th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <span className="center flex text-secondary">Hidden</span>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩2,752,216K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩489,714
                      </span>
                      <span className="ml-1">(0.5%)</span>
                    </td>
                  </tr>
                  <tr className="font-semibold even:bg-layer5-table">
                    <td className="center flex w-14 sm:w-16">
                      <div>10th</div>
                    </td>
                    <td className="ellipsis text-primary">
                      <div className="center flex">
                        <a href="/user/profile/11170421" className="inactive">
                          daBaby90
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap text-brand">
                      ₩2,562,440K
                    </td>
                    <td className="text-center!">
                      <span className="whitespace-nowrap text-brand">
                        ₩391,771
                      </span>
                      <span className="ml-1">(0.4%)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

