import { Suspense } from "react";
import Link from "next/link";
import SportsHeader from "@/components/shared/navigation/sports-header";
import SportsFavorites from "@/components/modules/sports/SportsFavorites";

export default function SportsFavoritesPage() {
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
                <Suspense>
                  <SportsFavorites />
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
