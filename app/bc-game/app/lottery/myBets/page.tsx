import Image from "next/image";

import TotalTickets from "@/public/assets/images/lottery/total-tickets.webp";
import TotalWinningTickets from "@/public/assets/images/lottery/winner-tickets.webp";
import TotalPrize from "@/public/assets/images/lottery/total-price.webp";

import StepOne from "@/public/assets/images/lottery/step-1.webp";
import GiftBox from "@/public/assets/images/lottery/gift-box-black-closed.png";

import EmptyBox from "@/public/assets/images/substation/bc/common/empty_w.webp";

export default function LotteryMyBets() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="min-h-screen">
        <div className="lottery-box w-full bg-layer2">
          <div className="mb-3 mt-4 sm:mt-0 text-sm font-normal text-primary">
            <h1 className="text-lg font-extrabold text-primary">My Bets</h1>
          </div>

          <div className="dashboard rounded">
            <div className="dashboard-mobile">
              <div className="tickets-item-box flex gap-3 mb-3">
                <section className="tickets-item-mobile w-full py-3 px-4 rounded-xl bg-layer4 relative h-20">
                  <p className="tickets-desc text-sm text-secondary font-semibold m-0">
                    Total tickets
                  </p>
                  <div className="tickets-num-box">
                    <h2 className="tickets-num text-xl font-extrabold m-0 text-primary leading-10">
                      0
                    </h2>
                    <Image
                      className="w-16 h-16 absolute right-0 bottom-0"
                      loading="lazy"
                      src={TotalTickets}
                      width={64}
                      height={64}
                      alt="Total Tickets"
                    />
                  </div>
                </section>
                <section className="tickets-item-mobile w-full py-3 px-4 rounded-xl bg-layer4 relative h-20">
                  <p className="tickets-desc text-sm text-secondary font-semibold m-0">
                    Total winning tickets
                  </p>
                  <div className="tickets-num-box flex items-center justify-between">
                    <h2 className="tickets-num text-xl font-extrabold m-0 text-primary leading-10">
                      0
                    </h2>
                    <Image
                      className="w-16 h-16 absolute right-0 bottom-0"
                      loading="lazy"
                      src={TotalWinningTickets}
                      width={64}
                      height={64}
                      alt="Total Winning Tickets"
                    />
                  </div>
                </section>
              </div>
              <section className="tickets-item-mobile w-full py-3 px-4 rounded-xl bg-layer4 relative h-20">
                <p className="tickets-desc text-sm text-secondary font-semibold m-0">
                  Total Prize Won
                </p>
                <div className="tickets-num-box flex items-center justify-between">
                  <h2 className="tickets-num text-xl font-extrabold m-0 text-brand leading-10">
                    ₩0
                  </h2>
                  <Image
                    className="tickets-icon w-16 h-16 absolute right-0 bottom-0 rounded-tr-xl rounded-br-xl"
                    loading="lazy"
                    src={TotalPrize}
                    width={64}
                    height={64}
                    alt="Total Prize"
                  />
                </div>
              </section>
            </div>
          </div>

          <div className="awardInformWrap mt-3 p-4 rounded-xl bg-layer4">
            <section className="inform-title-box flex items-center justify-between">
              <div className="inform-title-wrapper flex items-center justify-between w-full">
                <h1 className="inform-title text-sm font-extrabold my-0 mr-2 ml-0 text-primary">
                  Daily Free Lottery Challenge
                </h1>
                <section className="center rounded-md bg-layer5 size-6">
                  <div className="icon cursor-pointer size-5!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z"></path>
                    </svg>
                  </div>
                </section>
              </div>
            </section>
            <section className="spending-amount-box flex items-center justify-between mt-4 mx-0">
              <label className="text-sm font-semibold text-secondary">
                Today’s spending:{" "}
              </label>
              <label className="text-primary text-sm font-semibold">₩0</label>
            </section>
            <section className="award-count-box-mobile flex items-center justify-between mt-2">
              <label className="inform-countdown-title-mobile text-sm font-semibold text-secondary">
                Ends in
              </label>
              <div className="flex justify-between items-center gap-1">
                <span className="bet-date-content w-13 h-7 inline-flex items-center justify-center rounded-lg text-sm font-semibold bg-layer2 text-primary">
                  18h
                </span>
                <label className="bet-date-colon flex-center text-sm font-semibold text-primary">
                  :
                </label>
                <span className="bet-date bet-date-content w-13 h-7 inline-flex items-center justify-center rounded-lg text-sm font-semibold bg-layer2 text-primary">
                  25m
                </span>
                <label className="bet-date-colon flex-center text-sm font-semibold text-primary">
                  :
                </label>
                <span className="bet-date-content w-13 h-7 inline-flex items-center justify-center rounded-lg text-sm font-semibold bg-layer2 text-primary">
                  12s
                </span>
              </div>
            </section>
            <section className="award-infor-box flex mt-4 overflow-x-auto">
              <div className="award-step1-wrapper flex min-w-12.5 w-12.5">
                <div className="award-step-box flex flex-1 items-center justify-center rounded relative">
                  <Image className="h-full" alt="Step 1" src={StepOne} />
                </div>
              </div>
              <div className="award-step234-wrapper w-[calc(100%-50px)] overflow-x-auto grid grid-cols-3">
                <div className="award-step-box flex flex-1 items-center justify-center rounded relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="368"
                    height="71"
                    viewBox="0 0 368 71"
                    className="w-full h-full fill-layer2"
                  >
                    <path d="M0.679821 2.98168C-0.0712903 1.64846 0.892074 0 2.42232 0H345.662C347.107 0 348.439 0.778424 349.147 2.03663L366.894 33.5366C367.581 34.7555 367.581 36.2445 366.894 37.4634L349.147 68.9634C348.439 70.2216 347.107 71 345.662 71H2.42233C0.892082 71 -0.0712873 69.3515 0.679824 68.0183L17.8939 37.4634C18.5806 36.2445 18.5806 34.7555 17.8939 33.5366L0.679821 2.98168Z"></path>
                  </svg>
                  <div className="award-step-box-mobile flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full">
                    <div className="award-step-logo-box-mobile h-7">
                      <Image
                        className="award-step-logo h-7"
                        alt="Gift Box"
                        loading="lazy"
                        src={GiftBox}
                        width={28}
                        height={28}
                      />
                    </div>
                    <label className="flex items-baseline justify-center whitespace-nowrap overflow-x-auto w-full text-xs font-semibold text-tertiary">
                      Lottery X 1
                    </label>
                  </div>
                </div>
                <div className="award-step-box relative h-full min-h-12.5 flex items-center overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="368"
                    height="71"
                    viewBox="0 0 368 71"
                    className="w-full h-full fill-layer2"
                  >
                    <path d="M0.679821 2.98168C-0.0712903 1.64846 0.892074 0 2.42232 0H345.662C347.107 0 348.439 0.778424 349.147 2.03663L366.894 33.5366C367.581 34.7555 367.581 36.2445 366.894 37.4634L349.147 68.9634C348.439 70.2216 347.107 71 345.662 71H2.42233C0.892082 71 -0.0712873 69.3515 0.679824 68.0183L17.8939 37.4634C18.5806 36.2445 18.5806 34.7555 17.8939 33.5366L0.679821 2.98168Z"></path>
                  </svg>
                  <div className="award-step-box-mobile flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full">
                    <div className="award-step-logo-box-mobile">
                      <Image
                        className="award-step-logo h-7"
                        alt="Gift Box"
                        loading="lazy"
                        src={GiftBox}
                        width={28}
                        height={28}
                      />
                    </div>
                    <label className="flex items-baseline justify-center whitespace-nowrap overflow-x-auto w-full text-xs font-semibold text-tertiary">
                      Lottery X 9
                    </label>
                  </div>
                </div>
                <div className="award-step-box relative h-full min-h-12.5 flex items-center overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="368"
                    height="71"
                    viewBox="0 0 368 71"
                    className="w-full h-full fill-layer2"
                  >
                    <path d="M0.361535 2.98703C-0.394998 1.65375 0.568051 0 2.10101 0H359.667C364.085 0 367.667 3.58172 367.667 8V63C367.667 67.4183 364.085 71 359.667 71H2.10101C0.568045 71 -0.395 69.3463 0.361533 68.013L17.69 37.474C18.3848 36.2497 18.3848 34.7503 17.69 33.526L0.361535 2.98703Z"></path>
                  </svg>
                  <div className="award-step-box-mobile award-step-box-mobile3 flex items-center justify-center flex-col absolute top-0 left-0 w-full h-full">
                    <div className="award-step-logo-box-mobile">
                      <Image
                        className="award-step-logo h-7"
                        alt="Gift Box"
                        loading="lazy"
                        src={GiftBox}
                        width={28}
                        height={28}
                      />
                    </div>
                    <label className="flex items-baseline justify-center whitespace-nowrap overflow-x-auto w-full text-xs font-semibold text-tertiary">
                      Lottery X 99
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="tabs-table-content bg-layer4 rounded-xl mt-4 pt-4">
            <div className="tabs-label-box rounded px-4">
              <div
                className="scroll-x tabs-title hide-scroll mybets-tabs m-0 bg-input_bright! p-1"
                style={
                  {
                    "--tabs-width": "392px",
                    "--tabs-indicator-position": "0%",
                  } as React.CSSProperties
                }
              >
                <button className="tabs-btn btn-like" aria-selected="true">
                  Active
                </button>
                <button className="tabs-btn btn-like">Past</button>
                <button className="tabs-btn btn-like">
                  <div className="center w-full">My Winning</div>
                </button>
                <div className="tabs-indicator"></div>
              </div>
            </div>
            <div className="tabs-content"></div>
          </section>

          <section className="mybets-list px-4 pb-4 mt-1 bg-layer4 rounded-xl">
            <div className="tabs-search-box">
              <div className="searchBoxWrap">
                <div className="search-box-mobile">
                  <div className="search-input-box h-10">
                    <div className="input-control">
                      <div className="flex items-center bg-input_bright rounded-xl px-2 gap-1 w-full h-full border border-solid border-input">
                        <div className="icon size-5! fill-secondary">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z"></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          className="w-full text-base font-normal text-primary bg-input_bright h-10 placeholder:text-quarterary outline-0"
                          placeholder="Lottery Name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="search-select-mobile-box flex gap-2 mt-3">
                    <button
                      className="button button-m select bg-input_bright w-1/2 font-semibold text-xs text-primary bg-input_bright rounded-xl"
                      type="button"
                    >
                      <div className="inline-flex items-center gap-1">
                        <label className="text-primary text-sm font-semibold">
                          All Regions
                        </label>
                      </div>
                      <div className="size-6 ml-auto bg-input_button center rounded-md ">
                        <div className="icon size-4! transition-all -rotate-90">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                          </svg>
                        </div>
                      </div>
                    </button>
                    <button
                      className="button button-m select bg-input_bright w-1/2 font-semibold text-xs text-primary bg-input_bright rounded-xl"
                      type="button"
                    >
                      <label className="text-primary text-sm font-semibold truncate">
                        Sort By: Added Date
                      </label>
                      <div className="size-6 ml-auto bg-input_button center rounded-md ">
                        <div className="icon size-4! transition-all -rotate-90">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="tabs-value-box">
              <div className="tableContentWrap p-3 relative">
                <table className="w-full text-center relative">
                  <thead>
                    <tr className="table-tr border-b border-solid border-third">
                      <th className="max-w-40 table-td-id text-left text-xs text-secondary font-semibold py-2">
                        Lottery Name
                      </th>
                      <th className="text-xs text-secondary font-semibold py-2">
                        Results
                      </th>
                      <th className="w-22.5 sm:w-auto text-xs text-secondary font-semibold text-right py-2">
                        Total Return
                      </th>
                    </tr>
                  </thead>
                </table>
                <section className="py-10 text-center center flex-col">
                  <Image
                    className="w-48 h-48"
                    alt="Empty Box"
                    src={EmptyBox}
                    width={192}
                    height={192}
                  />
                  <div className="leading-5 mt-4">
                    Stay tuned—something's coming!
                  </div>
                </section>
                <div className="pt-4"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

