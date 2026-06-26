import Link from "next/link";
import SportsHeader from "@/components/shared/navigation/sports-header";
import SportsCarousel from "@/components/ui/carousel/SportsCarousel";
import SportsPopular from "@/components/modules/sports/SportsPopular";
import SportsLive from "@/components/modules/sports/SportsLive";
import SportsUpcoming from "@/components/modules/sports/SportUpcoming";
import { Suspense } from "react";

export default function SportsPage() {
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

            {/* Navigation Pills for sports page only the rest is no longer related to sport, this will not be visible */}

            <div className="m-[16px_16px_0px]">
              <div className="w-full h-8 overflow-hidden relative">
                <div className="w-full overflow-x-auto overflow-y-auto pb-12.5">
                  <span className="opacity-0"></span>
                  <div className="h-8 inline-block whitespace-nowrap align-top">
                    <div className="flex">
                      <Link
                        href="/sports"
                        className="sports-pill__button highlight-active"
                      >
                        <div className="flex items-center mr-2">
                          <svg
                            data-cy="ic-hot-title"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sc-1x10e4w-1 cBKOGh"
                            style={{
                              fill: "currentcolor",
                              color: "inherit",
                              width: "auto",
                              height: "16px",
                            }}
                          >
                            <path d="M3 4.28571C3 3.57563 3.57563 3 4.28571 3H8.14286C8.85294 3 9.42857 3.57563 9.42857 4.28571V10.7143C9.42857 11.4244 8.85294 12 8.14286 12H4.28571C3.57563 12 3 11.4244 3 10.7143V4.28571Z"></path>
                            <path d="M12 12C12 11.2899 12.5756 10.7143 13.2857 10.7143H19.7143C20.4244 10.7143 21 11.2899 21 12V19.7143C21 20.4244 20.4244 21 19.7143 21H13.2857C12.5756 21 12 20.4244 12 19.7143V12Z"></path>
                            <path d="M3 15.8571C3 15.1471 3.57563 14.5714 4.28571 14.5714H8.14286C8.85294 14.5714 9.42857 15.1471 9.42857 15.8571V19.7143C9.42857 20.4244 8.85294 21 8.14286 21H4.28571C3.57563 21 3 20.4244 3 19.7143V15.8571Z"></path>
                            <path d="M12 4.28571C12 3.57563 12.5756 3 13.2857 3H19.7143C20.4244 3 21 3.57563 21 4.28571V6.85714C21 7.56722 20.4244 8.14286 19.7143 8.14286H13.2857C12.5756 8.14286 12 7.56722 12 6.85714V4.28571Z"></path>
                          </svg>
                        </div>
                        Highlights
                      </Link>
                      <Link
                        href="/sports/event-builder"
                        className="sports-pill__button"
                      >
                        <div
                          data-editor-id="pillButtonScheduleIcon"
                          className="flex items-center mr-2"
                        >
                          <svg
                            data-cy="ic-schedule-title"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sc-1x10e4w-1 cBKOGh"
                            style={{
                              fill: "currentcolor",
                              color: "inherit",
                              width: "auto",
                              height: "16px",
                            }}
                          >
                            <g opacity="1">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1 4C1 3.89645 1.00525 3.79412 1.01549 3.69327C1.16912 2.1805 2.4467 1 4 1H12C13.6569 1 15 2.34315 15 4V12C15 13.6569 13.6569 15 12 15H4C2.34315 15 1 13.6569 1 12V4ZM13 6H3V12C3 12.5523 3.44772 13 4 13H12C12.5523 13 13 12.5523 13 12V6Z"
                              ></path>
                            </g>
                          </svg>
                        </div>
                        Event Builder
                      </Link>
                      <Link
                        href="/sports/bets-feed"
                        className="sports-pill__button"
                      >
                        <div
                          data-editor-id="pillButtonTopBetsIcon"
                          className="flex items-center mr-2"
                        >
                          <svg
                            data-cy="ic-top-bets"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            xmlns="http://www.w3.org/2000/svg"
                            className="sc-1x10e4w-1 cBKOGh"
                            style={{
                              fill: "currentcolor",
                              color: "inherit",
                              width: "auto",
                              height: "16px",
                            }}
                          >
                            <g>
                              <path d="M3.85714 3C3.38376 3 3 3.39358 3 3.87908V6.51631C3 7.00181 3.38376 7.39538 3.85714 7.39538H14.1429C14.6162 7.39538 15 7.00181 15 6.51631V3.87908C15 3.39358 14.6162 3 14.1429 3H3.85714Z"></path>
                              <path d="M3 10.0326C3 9.54711 3.38376 9.15353 3.85714 9.15353H14.1429C14.6162 9.15353 15 9.54711 15 10.0326V10.9117C15 11.3972 14.6162 11.7908 14.1429 11.7908H3.85714C3.38376 11.7908 3 11.3972 3 10.9117V10.0326Z"></path>
                              <path d="M3 14.428C3 13.9425 3.38376 13.5489 3.85714 13.5489H14.1429C14.6162 13.5489 15 13.9425 15 14.428C15 14.9135 14.6162 15.3071 14.1429 15.3071H3.85714C3.38376 15.3071 3 14.9135 3 14.428Z"></path>
                            </g>
                          </svg>
                        </div>
                        Bets Feed
                      </Link>
                    </div>
                  </div>
                  <span className="bt53"></span>
                </div>
              </div>
            </div>

            {/* Feature Modules */}

            <div className="sport-content">
              <div className="sport-content__inner">
                <SportsCarousel />
                <Suspense>
                  <SportsPopular />
                </Suspense>
                <Suspense>
                  <SportsLive />
                </Suspense>
                <Suspense>
                  <SportsUpcoming />
                </Suspense>
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
