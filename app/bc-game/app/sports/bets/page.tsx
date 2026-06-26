import Link from "next/link";
import SportsHeader from "@/components/shared/navigation/sports-header";

export default function SportsBetsPage() {
  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0 pb-0!">
      <div className="my-0! -mx-4 min-h-[70vh] sm:mx-0">
        <div
          style={{
            fontFamily: "inherit",
            backgroundColor: "var(--sports-bg_main)",
          }}
        >
          <div
            className="sports-main"
            style={{ minHeight: `calc(-56px + 100vh)` }}
          >
            <SportsHeader />

            {/* Feature Modules */}

            <div className="sport-content">
              <div className="sport-content__inner">
                <div
                  className="sport-content__title mb-4"
                  data-editor-id="blockTitle"
                >
                  <svg
                    data-cy="ic-mybets"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block mr-2"
                    style={{
                      fill: "currentcolor",
                      color: "rgb(65, 188, 44)",
                      width: "auto",
                      height: "32px",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 6.7C5 4.68329 6.5966 3 8.625 3H17.375C19.4034 3 21 4.68329 21 6.7V19.3C21 21.3167 19.4034 23 17.375 23H8.625C6.5966 23 5 21.3167 5 19.3V6.7ZM8.625 5C7.75391 5 7 5.73437 7 6.7V19.3C7 20.2656 7.75391 21 8.625 21H17.375C18.2461 21 19 20.2656 19 19.3V6.7C19 5.73437 18.2461 5 17.375 5H8.625ZM22.375 10C22.375 9.44772 22.8227 9 23.375 9H24C25.6569 9 27 10.3431 27 12V26C27 27.6569 25.6569 29 24 29H14C12.3431 29 11 27.6569 11 26V25.3C11 24.7477 11.4477 24.3 12 24.3C12.5523 24.3 13 24.7477 13 25.3V26C13 26.5523 13.4477 27 14 27H24C24.5523 27 25 26.5523 25 26V12C25 11.4477 24.5523 11 24 11H23.375C22.8227 11 22.375 10.5523 22.375 10ZM10 16C9.44772 16 9 16.4477 9 17C9 17.5523 9.44772 18 10 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H10ZM9 13C9 12.4477 9.44772 12 10 12H16C16.5523 12 17 12.4477 17 13C17 13.5523 16.5523 14 16 14H10C9.44772 14 9 13.5523 9 13ZM10 8C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10H16C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8H10Z"
                    ></path>
                  </svg>
                  <div>My Bets</div>
                </div>

                <div>
                  <div className="flex mb-4">
                    <div className="flex-1 overflow-hidden flex-nowrap">
                      <div className="relative mt-0.5 h-8.25">
                        <div className="relative overflow-hidden w-full h-8.25">
                          <div className="w-full overflow-x-auto overflow-y-hidden pb-12.5">
                            <span className="opacity-0"></span>
                            <div className="inline-block whitespace-nowrap align-top h-8.25">
                              <div className="flex flex-nowrap">
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      All
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab active"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Open
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Won
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Lost
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Cashed Out
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Cancelled
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="sport-bet__tab"
                                  data-editor-id="pillButton"
                                >
                                  <div className="flex-1 w-full overflow-hidden relative">
                                    <div className="w-full inline-block whitespace-nowrap">
                                      Refund
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <span className="bt190"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-76">
                      <div className="relative" data-editor-id="datePicker">
                        <div className="sports-bet__date">
                          <div className="sports-bet__dateIcon size-4 absolute top-[50%] right-2 -mt-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                            >
                              <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                            </svg>
                          </div>
                          Recent Bets
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="size-full flex items-center justify-center py-6 text-[#171A1A]">
                      <div
                        className="w-100 flex items-center flex-col"
                        data-editor-id="emptyBetsBlock"
                      >
                        <div className="w-35 h-auto m-[0_auto_56px]">
                          <svg
                            width="152"
                            height="156"
                            data-editor-id="emptyBetsIcon"
                          >
                            <g fill="#2CD97D" fillRule="evenodd">
                              <path
                                d="M18.78 39.62a2 2 0 013.198 2.402 69.863 69.863 0 00-9.385 16.984 2 2 0 01-3.736-1.429 73.862 73.862 0 019.922-17.956zm-8.943 73.234a2 2 0 113.683-1.56 69.89 69.89 0 007.742 13.712 2 2 0 01-3.24 2.346 73.89 73.89 0 01-8.185-14.498zm128.226 14.38a2 2 0 11-3.245-2.339C143.342 113.075 148 98.891 148 84c0-14.736-4.562-28.782-12.922-40.533a2 2 0 113.26-2.319C147.174 53.571 152 68.426 152 84c0 15.737-4.927 30.738-13.937 43.235zM105.268 15.187a2 2 0 01-1.475 3.719C95.657 15.678 86.946 14 78 14c-6.724 0-13.32.948-19.647 2.794a2 2 0 11-1.121-3.84A74.026 74.026 0 0178 10c9.453 0 18.664 1.774 27.268 5.186z"
                                opacity="0.7"
                              ></path>
                              <path
                                d="M12 7.96h5.46a2 2 0 110 4H12v5.461a2 2 0 11-4 0v-5.46H2.54a2 2 0 110-4H8V2.5a2 2 0 114 0v5.46z"
                                opacity="0.3"
                              ></path>
                              <path
                                d="M126 97.96h5.46a2 2 0 010 4H126v5.461a2 2 0 11-4 0v-5.46h-5.46a2 2 0 110-4H122V92.5a2 2 0 014 0v5.46z"
                                opacity="0.4"
                              ></path>
                              <path
                                d="M145.5 16.48h2.23a1.5 1.5 0 010 3h-2.23v2.23a1.5 1.5 0 01-3 0v-2.23h-2.23a1.5 1.5 0 010-3h2.23v-2.23a1.5 1.5 0 013 0v2.23z"
                                opacity="0.2"
                              ></path>
                              <g fill="rgba(23,26,26,0.4)">
                                <path
                                  fillRule="nonzero"
                                  d="M41.95 59H124a4 4 0 004-4V28a4 4 0 00-4-4H42m.037-2H124a6 6 0 016 6v27a6 6 0 01-6 6H42.01"
                                ></path>
                                <path d="M32 22h10v39H32a6 6 0 01-6-6V28a6 6 0 016-6zm16.5 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 1h34a1.5 1.5 0 010 3h-34a1.5 1.5 0 010-3zM48 35h59a1 1 0 010 2H48a1 1 0 010-2zm0 5h30a1 1 0 010 2H48a1 1 0 010-2zm1.5 10h5a2.5 2.5 0 110 5h-5a2.5 2.5 0 110-5z"></path>
                              </g>
                              <g fill="rgba(23,26,26,0.4)">
                                <path
                                  fillRule="nonzero"
                                  d="M15.95 104H98a4 4 0 004-4V73a4 4 0 00-4-4H16m.037-2H98a6 6 0 016 6v27a6 6 0 01-6 6H16.01"
                                ></path>
                                <path d="M6 67h10v39H6a6 6 0 01-6-6V73a6 6 0 016-6zm16.5 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 1h34a1.5 1.5 0 010 3h-34a1.5 1.5 0 010-3zM22 80h59a1 1 0 010 2H22a1 1 0 010-2zm0 5h30a1 1 0 010 2H22a1 1 0 010-2zm1.5 10h5a2.5 2.5 0 110 5h-5a2.5 2.5 0 110-5z"></path>
                              </g>
                              <g fill="rgba(23,26,26,0.4)">
                                <path
                                  fillRule="nonzero"
                                  d="M41.95 153H124a4 4 0 004-4v-27a4 4 0 00-4-4H42m.037-2H124a6 6 0 016 6v27a6 6 0 01-6 6H42.01"
                                ></path>
                                <path d="M32 116h10v39H32a6 6 0 01-6-6v-27a6 6 0 016-6zm16.5 5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 1h34a1.5 1.5 0 010 3h-34a1.5 1.5 0 010-3zm-8.5 7h59a1 1 0 010 2H48a1 1 0 010-2zm0 5h30a1 1 0 010 2H48a1 1 0 010-2zm1.5 10h5a2.5 2.5 0 110 5h-5a2.5 2.5 0 110-5z"></path>
                              </g>
                            </g>
                          </svg>
                        </div>
                        <div className="text-[18px] leading-7 text-center opacity-[0.5] tracking-[0.4px]">
                          No bets are available
                          <br />
                          Choose different dates
                        </div>
                        <Link href="/sports">
                          <button
                            className="mt-8 text-xs px-7 py-1.75 border-none cursor-pointer outline-none min-w-44 font-bold leading-4.5 uppercase bg-[#2cd97d] text-[#171a1a] rounded-3xl"
                            data-editor-id="homePageButton"
                          >
                            Go to home page
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-[50%] m-[40px_auto_96px]">
                <div className="bt598">
                  <div className="block">
                    <div className="w-full flex justify-center items-center flex-wrap">
                      <div
                        className="sports-odd__selectLabel"
                        data-editor-id="oddsFormatSelectLabel"
                      >
                        Odds Format
                      </div>
                      <div className="w-42 z-10">
                        <div
                          className="relative text-xs"
                          data-editor-id="oddsFormatSelect"
                        >
                          <div className="sports_odd__select">
                            American
                            <div
                              className="sc-hehhuf-0 eBtXID"
                              style={{ width: "16px", height: "16px" }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                              >
                                <path d="M8.7542 11.1529C8.35634 11.6157 7.64366 11.6157 7.2458 11.1529L4.24545 7.66298C3.68586 7.01207 4.14485 6 4.99964 6L11.0004 6C11.8551 6 12.3141 7.01207 11.7546 7.66298L8.7542 11.1529Z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="sports-odd__NoticeMessage"
                    data-editor-id="marketNoticeMessage"
                  >
                    Although every effort is made to ensure data displayed on
                    our site is accurate, this data is for information purposes
                    and should be used as a guide only. In the event of any
                    particular information being incorrect, we assume no
                    liability for it.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
