import RecommendedGames from "@/components/modules/favorite/RecommendedGames";
export default function CrashPage() {
  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0">
      <div
        className="max-w-308 mx-auto w-full sm:px-4 sm:pb-5 transition-all duration-200 @container"
        id="game-full-container"
        style={{
          maxWidth: "1248px",
        }}
      >
        <div
          className="mx-auto py-3 sm:py-0 grid-cols-1"
          id="game-full-layout"
          style={{
            display: "block",
            minHeight: "auto",
            width: "auto",
          }}
        >
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 grow bg-layer2 relative rounded-lg items-stretch @4xl:pb-0 @4xl:grid-cols-[minmax(22.5rem,22.5rem)_auto] @4xl:h-full @4xl:flex!">
              <div className="@4xl:hidden">
                <div
                  className="col-span-12! h-12 @4xl:h-10 flex items-center bg-layer4 rounded-md mb-3 w-full @4xl:max-w-100 ml-auto @4xl:-mt-2.5"
                  data-orientation="horizontal"
                  id="crash-tab"
                >
                  <div
                    aria-orientation="horizontal"
                    className="relative flex items-center rounded-lg w-full h-full @4xl:h-10 light-layer2-tabs"
                    data-orientation="horizontal"
                    role="tablist"
                  >
                    <button
                      aria-selected="true"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-highlighted=""
                      data-key="classic"
                      data-orientation="horizontal"
                      data-selected=""
                      id="crash-tab-trigger-classic"
                      role="tab"
                      tabIndex={0}
                      type="button"
                    >
                      Classic
                    </button>
                    <button
                      aria-selected="false"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-key="trenball"
                      data-orientation="horizontal"
                      id="crash-tab-trigger-trenball"
                      role="tab"
                      tabIndex={-1}
                      type="button"
                    >
                      Trenball
                    </button>
                    <button
                      aria-selected="false"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-key="bettingStrategy"
                      data-orientation="horizontal"
                      id="crash-tab-trigger-bettingStrategy"
                      role="tab"
                      tabIndex={-1}
                      type="button"
                    >
                      Betting Strategy
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 col-span-full bg-layer4 dark:bg-[#292D2E] flex flex-col rounded-t-xl @4xl:order-2 @4xl:col-span-1 @4xl:relative @4xl:pt-2 @4xl:rounded-tl-none @4xl:rounded-tr-xl @4xl:h-full h-auto @4xl:grow! @4xl:min-h-168 @4xl:mr-100 overflow-hidden @4xl:overflow-x-auto rounded-xl!">
                <div className="mx-auto w-full relative -mt-2 pt-4.5 @2xl:pt-3 rounded-t-xl @2xl:h-100 @2xl:px-4 overflow-hidden">
                  <div>
                    <div className="px-2 flex" id="crash-banner">
                      <div
                        className="relative flex-auto overflow-hidden"
                        style={{
                          transition: "none",
                          width: "calc(100% - 3rem)",
                        }}
                      >
                        <div
                          className="relative overflow-hidden rounded-lg pr-8 sm:pr-10 h-8 md:h-10 bg-on-canvas"
                          style={{
                            opacity: "1",
                            transition: "none",
                          }}
                        >
                          <div
                            className="grid grid-auto-flow-column gap-1 h-full overflow-x-visible grid-cols-7"
                            style={{
                              gridTemplateColumns:
                                "calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem) calc(14.2857% - 0.285714rem)",
                              transform: "translateX(-14.375%)",
                            }}
                          >
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 moon-bg-btn" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943719
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold moon-btn-text">
                                  12.41×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-success" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943720
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">
                                  4.11×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 moon-bg-btn" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943721
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold moon-btn-text">
                                  72.13×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-warning" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943722
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">
                                  1.24×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-success" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943723
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">
                                  3.05×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-warning" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943724
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">
                                  1.51×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-success" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943725
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-success">
                                  2.25×
                                </span>
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-1 px-2 h-full cursor-pointer">
                              <span className="size-2.5 rounded-full shrink-0 bg-warning" />
                              <span className="flex flex-col">
                                <span className="text-xs leading-tight text-tertiary font-semibold">
                                  8943726
                                </span>
                                <span className="text-xs sm:text-sm leading-tight text-left whitespace-nowrap font-extrabold text-warning">
                                  1.67×
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="w-9 sm:w-11 h-6 sm:h-8! absolute right-0 top-1">
                            <div className="w-8 h-6 sm:w-10 sm:h-8! flex justify-center items-center bg-layer5 mr-1 rounded-md cursor-pointer">
                              <svg
                                fill="none"
                                height="16"
                                viewBox="0 0 15 16"
                                width="15"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.5 0.5C11.6421 0.5 15 3.85786 15 8C15 12.1421 11.6421 15.5 7.5 15.5C3.35786 15.5 0 12.1421 0 8C0 3.85786 3.35786 0.5 7.5 0.5ZM7.5 2.10714C4.24554 2.10714 1.60714 4.74554 1.60714 8C1.60714 11.2545 4.24554 13.8929 7.5 13.8929C10.7545 13.8929 13.3929 11.2545 13.3929 8C13.3929 4.74554 10.7545 2.10714 7.5 2.10714ZM6.96429 3.785C7.45607 3.785 7.85946 4.16375 7.89857 4.64536L7.90179 4.7225V8.28982L10.4689 8.29036C10.9864 8.29036 11.4064 8.71036 11.4064 9.22786C11.4064 9.71964 11.0277 10.123 10.5461 10.1621L10.4689 10.1654H6.96429C6.89036 10.1654 6.81804 10.1568 6.74893 10.1407C6.74518 10.1396 6.74143 10.1391 6.73768 10.138C6.72429 10.1348 6.71089 10.1311 6.69804 10.1273C6.68518 10.1236 6.67071 10.1187 6.65732 10.1145C6.65143 10.1123 6.64554 10.1102 6.63964 10.108C6.6225 10.1016 6.60536 10.0946 6.58875 10.0877C6.57804 10.0829 6.56839 10.0786 6.55821 10.0737C6.5475 10.0684 6.53625 10.063 6.52554 10.0571C6.51214 10.0502 6.49875 10.0427 6.48536 10.0346C6.47679 10.0298 6.46875 10.0245 6.46018 10.0191C6.45054 10.0132 6.44143 10.0068 6.43232 10.0004C6.41946 9.99125 6.40661 9.98214 6.39429 9.9725C6.38625 9.96661 6.37821 9.96018 6.37018 9.95375C6.36 9.94571 6.35089 9.93768 6.34125 9.92911C6.33161 9.92054 6.32304 9.9125 6.31446 9.90393C6.30536 9.89536 6.29679 9.88679 6.28875 9.87821C6.27857 9.86804 6.26893 9.85732 6.25929 9.84607C6.25339 9.83911 6.2475 9.83214 6.24161 9.82518C6.23304 9.815 6.225 9.80482 6.21696 9.79411C6.20839 9.78286 6.20036 9.77161 6.19179 9.75982C6.18536 9.75071 6.17946 9.74107 6.17304 9.73196C6.16661 9.72179 6.16018 9.71107 6.15375 9.70089C6.14732 9.69071 6.14143 9.67893 6.13554 9.66768C6.12911 9.65589 6.12321 9.64357 6.11732 9.63125C6.1125 9.62054 6.10768 9.61036 6.10286 9.59964C6.09857 9.58946 6.09429 9.57982 6.09054 9.56964C6.07661 9.53375 6.06482 9.49679 6.05518 9.45929C6.03643 9.38536 6.02679 9.30821 6.02679 9.22839V4.72304C6.02679 4.20554 6.44679 3.78554 6.96429 3.78554V3.785Z"
                                  fill="#B3BEC1"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 ml-2 flex flex-col items-center gap-1">
                        <div className="flex size-8 justify-center items-center rounded-md md:rounded-lg box-border p-2 md:size-10 cursor-pointer bg-on-canvas">
                          <svg
                            className="scale-110 md:scale-75 text-secondary"
                            fill="none"
                            height="38"
                            viewBox="0 0 32 32"
                            width="38"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {" "}
                            <path
                              d="M7.534 21.08a3.388 3.388 0 1 1-.001 6.775 3.388 3.388 0 0 1 0-6.775m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775M7.534 12.613a3.387 3.387 0 1 1-.001 6.775 3.387 3.387 0 0 1 0-6.775m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775m-8.466 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775M7.534 4.146a3.388 3.388 0 1 1-.001 6.776 3.388 3.388 0 0 1 0-6.776m16.932 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775m-8.466 0a3.387 3.387 0 1 1 0 6.775 3.387 3.387 0 0 1 0-6.775"
                              fill="currentColor"
                            />{" "}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="min-h-64">
                    <div className="relative mt-1 @md:mt-4 after:content-[''] after:block after:pt-[40%] min-h-60">
                      <canvas
                        className="pl-2 size-full absolute top-0 left-0"
                        height="628"
                        width="1568"
                      />
                      <div className="absolute inset-0 pointer-events-none" />
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "          @keyframes escape-fall {            from {              transform: translate(0, 0);              opacity: 0.8;            }            60% {              opacity: 0;            }            to {              transform: translate(var(--dx), var(--dy));              opacity: 0;            }          }        ",
                        }}
                      />
                      <div className="absolute top-0 left-0 size-full pointer-events-none z-10">
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-214.44239195830136px",
                              ["--dy" as any]: "351.83884661516095px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "128.9px",
                              top: "278.095px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Paeno999 @1.05
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-206.18993568821855px",
                              ["--dy" as any]: "382.0394059772369px",
                              animation:
                                "5.37652s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "642.72px",
                              top: "140.485px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            0000pagal @1.64
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-123.90187919835672px",
                              ["--dy" as any]: "374.9932090994647px",
                              animation:
                                "6.46289s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "665.72px",
                              top: "131.715px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Shakeel3468 @1.65
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-202.1823119383182px",
                              ["--dy" as any]: "342.22439967231776px",
                              animation:
                                "7.59682s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "268.705px",
                              top: "251.115px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Jasperm @1.20
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-153.03843738079036px",
                              ["--dy" as any]: "367.54118603247366px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "291.725px",
                              top: "245.925px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Erudite9ation @1.23
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-146.5123541813692px",
                              ["--dy" as any]: "389.95436639791177px",
                              animation:
                                "6.94192s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "339.075px",
                              top: "234.61px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Dabhimahesh @1.25
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-199.07153980024182px",
                              ["--dy" as any]: "325.66459308378177px",
                              animation:
                                "4.84321s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "385.12px",
                              top: "222.77px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Okceadqporac @1.32
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-163.48170555009625px",
                              ["--dy" as any]: "269.2342752905396px",
                              animation:
                                "5.85116s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "488.365px",
                              top: "193.16px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            ijdhdh @1.42
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "-106.95800068714443px",
                              ["--dy" as any]: "366.808693144984px",
                              animation:
                                "4.21664s ease-out 0s 1 normal forwards running escape-fall",
                              fontSize: "10px",
                              left: "533.195px",
                              top: "178.935px",
                              visibility: "visible",
                              willChange: "transform, opacity",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(0, 0, 0)",
                              opacity: "0.5",
                            }}
                          >
                            Sledge001 @1.48
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                        <div
                          className="absolute flex items-center gap-1 whitespace-nowrap text-xs"
                          style={
                            {
                              ["--dx" as any]: "0px",
                              ["--dy" as any]: "0px",
                              animation:
                                "auto ease 0s 1 normal none running none",
                              fontSize: "10px",
                              left: "0px",
                              top: "0px",
                              visibility: "hidden",
                              willChange: "auto",
                            } as React.CSSProperties
                          }
                        >
                          <div
                            className="size-1 rounded-full shrink-0"
                            style={{
                              background: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          />
                          <span
                            style={{
                              color: "rgb(255, 255, 255)",
                              opacity: "0.5",
                            }}
                          >
                            {" "}
                            @
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end m-2 sm:mt-0">
                      <div className="text-secondary text-xs">
                        Network Status
                      </div>
                      <div className="flex items-end gap-x-0.5 mb-1 ml-1.5">
                        <div className="w-1 rounded-sm bg-layer6 h-1.5 bg-[#24EE89] shadow-[0_0_10px_rgba(36,238,137,0.7)]" />
                        <div className="w-1 rounded-sm bg-layer6 h-2 bg-[#24EE89] shadow-[0_0_10px_rgba(36,238,137,0.7)]" />
                        <div className="w-1 rounded-sm bg-layer6 h-3 bg-[#24EE89] shadow-[0_0_10px_rgba(36,238,137,0.7)]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-full order-2 flex flex-col gap-3 bg-layer4 rounded-t-none @4xl:order-0 @4xl:rounded-tl-xl @4xl:pt-0.5 @4xl:h-full @4xl:overflow-y-auto @4xl:col-span-8 @4xl:max-h-full pt-0">
                  <div
                    className="flex flex-col relative @lg:h-full @lg:overflow-x-hidden!"
                    data-orientation="horizontal"
                    id="tabs-cl-105"
                  >
                    <div
                      aria-labelledby="tabs-cl-105-trigger-manual"
                      className="mt-0 @4xl:relative z-100 @4xl:overflow-auto no-scrollbar"
                      data-orientation="horizontal"
                      data-selected=""
                      id="tabs-cl-105-content-manual"
                      role="tabpanel"
                      style={{
                        maxHeight: "calc(100% - 48px)",
                      }}
                    >
                      <div
                        className="flex flex-col gap-3 px-1 mb-2 @md:mb-3 mt-2 @4xl:py-3 relative z-100"
                        style={
                          {
                            ["--motion-translateX" as any]: "0px",
                            opacity: "1",
                            transform: "translateX(var(--motion-translateX))",
                          } as React.CSSProperties
                        }
                      >
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-2">
                          <div className="w-full flex flex-col sm:flex-1">
                            <div className="w-full sm:order-last flex flex-col @md:flex-row @md:flex-wrap @md:justify-center gap-2 @md:mt-2">
                              <div className="w-full @md:flex-1 @md:min-w-0">
                                <div
                                  className="w-full"
                                  id="NumberField-cl-106"
                                  role="group"
                                >
                                  <div className="flex items-center mb-1 justify-between">
                                    <div className="flex items-center">
                                      <div className="flex items-center">
                                        <button
                                          aria-expanded="false"
                                          aria-haspopup="dialog"
                                          className="focus-visible:outline-none size-4! mr-1"
                                          data-closed=""
                                          type="button"
                                        >
                                          <div className="icon size-4! fill-brand">
                                            <svg
                                              viewBox="0 0 32 32"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                      <label
                                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-invalid:text-secondary px-1 flex items-center h-4.5 pl-1 mr-1 text-sm font-extrabold"
                                        id="NumberField-cl-106-label"
                                      >
                                        Amount
                                      </label>
                                    </div>
                                  </div>
                                  <div className="relative">
                                    <div className="input font-extrabold pr-1 sm:pr-0.5 nowidth-input rounded-lg">
                                      <input inputMode="decimal" size={10} />
                                      <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 order-first scale-125">
                                        <img
                                          className="w-4 h-4"
                                          src="https://imgxcut.com/coin/KRW.rect.png"
                                        />
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <button
                                          className="button button-input button-m btn-like text-primary h-10 sm:h-8! w-12 rounded-md button-input"
                                          type="button"
                                        >
                                          1/2
                                        </button>
                                        <button
                                          className="button button-input button-m btn-like text-primary h-10 sm:h-8! w-12 rounded-md button-input"
                                          type="button"
                                        >
                                          2×
                                        </button>
                                        <button
                                          className="button button-input button-m btn-like text-primary h-10 sm:h-8! w-12 rounded-md button-input"
                                          type="button"
                                        >
                                          <div className="flex flex-col">
                                            <svg
                                              className="size-4! rotate-90"
                                              fill="none"
                                              height="32"
                                              viewBox="0 0 32 32"
                                              width="32"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"
                                                fill="currentColor"
                                              />{" "}
                                            </svg>
                                            <svg
                                              className="size-4! -rotate-90"
                                              fill="none"
                                              height="32"
                                              viewBox="0 0 32 32"
                                              width="32"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"
                                                fill="currentColor"
                                              />{" "}
                                            </svg>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="w-full">
                                      <div className="grid grid-cols-4 gap-2 rounded-xl w-full bg-transparent p-0 pt-1">
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer5"
                                          disabled
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            1.0k
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer5"
                                          disabled
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            10.0k
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer5"
                                          disabled
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            100.0k
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer5"
                                          disabled
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            1.0M
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full @md:flex-1 @md:min-w-0">
                                <div className="relative">
                                  <div id="NumberField-cl-109" role="group">
                                    <label
                                      className="font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-invalid:text-secondary px-1 flex w-full items-center justify-between mb-1 text-sm"
                                      id="NumberField-cl-109-label"
                                    >
                                      <span className="font-semibold">
                                        Auto cash out
                                      </span>
                                      <span>Chance 0.99%</span>
                                    </label>
                                    <div className="relative font-extrabold">
                                      <div className="input rounded-lg">
                                        <input inputMode="decimal" />
                                      </div>
                                      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <b className="text-primary mr-1 text-base">
                                          ×
                                        </b>
                                        <div
                                          className="bottom-1 right-1.5 inline-flex items-center justify-center text-secondary hover:opacity-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed static size-auto opacity-100"
                                          role="button"
                                          tabIndex={-1}
                                        >
                                          <button
                                            className="button button-input button-m text-primary h-10 sm:h-8! w-12 rounded-md"
                                            type="button"
                                          >
                                            <svg
                                              fill="none"
                                              height="32"
                                              viewBox="0 0 32 32"
                                              width="32"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              {" "}
                                              <path
                                                d="M18.4 11.2 13.6 16l4.8 4.8"
                                                stroke="currentColor"
                                                strokeWidth="2.4"
                                              />{" "}
                                            </svg>
                                          </button>
                                        </div>
                                        <div
                                          className="right-1.5 top-1 inline-flex items-center justify-center text-secondary hover:opacity-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed static size-auto opacity-100"
                                          role="button"
                                          tabIndex={-1}
                                        >
                                          <button
                                            className="button button-input button-m text-primary h-10 sm:h-8! w-12 rounded-md"
                                            type="button"
                                          >
                                            <svg
                                              className="rotate-180"
                                              fill="none"
                                              height="32"
                                              viewBox="0 0 32 32"
                                              width="32"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              {" "}
                                              <path
                                                d="M18.4 11.2 13.6 16l4.8 4.8"
                                                stroke="currentColor"
                                                strokeWidth="2.4"
                                              />{" "}
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full">
                                      <div className="grid grid-cols-4 gap-2 rounded-xl w-full bg-transparent p-0 pt-1">
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer3 dark:bg-layer5"
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            1.01
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer3 dark:bg-layer5"
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            2
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer3 dark:bg-layer5"
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            10
                                          </span>
                                        </button>
                                        <button
                                          className="button button-second button-m px-0 h-10 sm:h-8! rounded-md bg-layer3 dark:bg-layer5"
                                          style={{
                                            backgroundImage: "none",
                                          }}
                                          type="button"
                                        >
                                          <span className="truncate text-sm font-extrabold text-primary">
                                            100
                                          </span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="relative w-full flex items-center justify-center mt-3">
                              <div className="w-full">
                                <button
                                  className="button button-brand button-m flex-1 w-full m-auto text-primary_brand font-extrabold sm:max-w-100 sm:h-12!"
                                  type="button"
                                >
                                  <span className="flex flex-col items-center justify-center leading-tight gap-0">
                                    <span className="font-extrabold">Bet</span>
                                    <span>(Next Round)</span>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="w-full sm:w-full sm:mt-0">
                            <div className="flex flex-col">
                              <div className="grid gap-1 gap-y-3 mt-3 grid-cols-2 md:grid-cols-3 md:order-1" />
                            </div>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <button
                            className="button button-second button-m w-full"
                            type="button"
                          >
                            Settings
                          </button>
                          <div className="center absolute -right-px -top-1">
                            <svg
                              fill="none"
                              height="18"
                              viewBox="0 0 54 18"
                              width="54"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                className="fill-layer2"
                                d="M2.167 5.84962C1.13534 4.24386 0.619504 3.44098 0.667049 2.77706C0.708483 2.19848 0.99907 1.66639 1.46345 1.31879C1.99632 0.919922 2.95063 0.919922 4.85924 0.919922L17.1392 0.919922H49.9392C51.0593 0.919922 51.6194 0.919922 52.0472 1.13791C52.4235 1.32966 52.7295 1.63562 52.9212 2.01194C53.1392 2.43976 53.1392 2.99982 53.1392 4.11992V15.36C53.1392 16.1147 53.1392 16.4921 52.9811 16.7388C52.8427 16.9546 52.6267 17.1091 52.3776 17.1703C52.0931 17.2401 51.736 17.1181 51.0218 16.874L49.473 16.3446H4.85923C2.95062 16.3446 1.99632 16.3446 1.46345 15.9458C0.99907 15.5982 0.708483 15.0661 0.667049 14.4875C0.619504 13.8236 1.13534 13.0207 2.167 11.4149L3.9548 8.63228L2.167 5.84962Z"
                              />
                              <path
                                d="M2.167 5.84962C1.13534 4.24386 0.619504 3.44098 0.667049 2.77706C0.708483 2.19848 0.99907 1.66639 1.46345 1.31879C1.99632 0.919922 2.95063 0.919922 4.85924 0.919922L17.1392 0.919922H49.9392C51.0593 0.919922 51.6194 0.919922 52.0472 1.13791C52.4235 1.32966 52.7295 1.63562 52.9212 2.01194C53.1392 2.43976 53.1392 2.99982 53.1392 4.11992V15.36C53.1392 16.1147 53.1392 16.4921 52.9811 16.7388C52.8427 16.9546 52.6267 17.1091 52.3776 17.1703C52.0931 17.2401 51.736 17.1181 51.0218 16.874L49.473 16.3446H4.85923C2.95062 16.3446 1.99632 16.3446 1.46345 15.9458C0.99907 15.5982 0.708483 15.0661 0.667049 14.4875C0.619504 13.8236 1.13534 13.0207 2.167 11.4149L3.9548 8.63228L2.167 5.84962Z"
                                fill="url(#paint0_linear_cl-111)"
                              />
                              <defs>
                                <linearGradient
                                  gradientUnits="userSpaceOnUse"
                                  id="paint0_linear_cl-111"
                                  x1="-18.8608"
                                  x2="88.687"
                                  y1="8.63228"
                                  y2="8.63228"
                                >
                                  <stop stopColor="#23EE88" />
                                  <stop
                                    offset="1"
                                    stopColor="#23EE88"
                                    stopOpacity="0"
                                  />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="text-primary text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -mt-px z-10 leading-none font-extrabold capitalize">
                              new
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      aria-orientation="horizontal"
                      className="relative flex items-center w-full bg-layer4 overflow-hidden shrink-0 rounded-none h-12 top-0 z-100 @4xl:order-first @4xl:border-b border-input @4xl:sticky @4xl:rounded-b-none"
                      data-orientation="horizontal"
                      role="tablist"
                    >
                      <button
                        aria-controls="tabs-cl-105-content-manual"
                        aria-selected="true"
                        className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md bg-none text-secondary data-selected:text-primary flex-1"
                        data-highlighted=""
                        data-key="manual"
                        data-orientation="horizontal"
                        data-selected=""
                        id="tabs-cl-105-trigger-manual"
                        role="tab"
                        tabIndex={0}
                        type="button"
                      >
                        Manual
                      </button>
                      <button
                        aria-selected="false"
                        className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md bg-none text-secondary data-selected:text-primary flex-1"
                        data-key="auto"
                        data-orientation="horizontal"
                        id="tabs-cl-105-trigger-auto"
                        role="tab"
                        tabIndex={-1}
                        type="button"
                      >
                        Auto
                      </button>
                      <div
                        className="duration-250ms absolute data-[orientation=horizontal]:-bottom-px data-[orientation=vertical]:-right-px data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 bg-linear-to-r from-[#24ee89] to-[#9fe871] data-disabled:opacity-40 slider-track-active w-1/2! transform transition-transform duration-300 ease-in-out translate-x-0!"
                        data-orientation="horizontal"
                        data-resizing="false"
                        role="presentation"
                        style={{
                          transform: "translateX(0px)",
                          width: "408px",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="@container relative justify-between bg-layer3  w-full px-1 flex border-t border-third rounded-b-xl z-100 h-12 order-last">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <button
                        className="button button-m text-secondary p-0"
                        type="button"
                      >
                        <svg
                          className="size-7"
                          fill="none"
                          height="32"
                          viewBox="0 0 32 32"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path
                            d="M20.389 5.007c1.209 0 2.326.645 2.93 1.692l4.39 7.611a3.39 3.39 0 0 1 0 3.381l-4.39 7.611a3.38 3.38 0 0 1-2.93 1.692H11.61a3.38 3.38 0 0 1-2.93-1.692l-4.39-7.61a3.39 3.39 0 0 1 0-3.382l4.39-7.611a3.38 3.38 0 0 1 2.93-1.692zM16 11.353a4.76 4.76 0 0 0-4.757 4.76c0 2.63 2.13 4.761 4.757 4.761a4.76 4.76 0 0 0 4.757-4.76c0-2.63-2.13-4.76-4.757-4.76"
                            fill="currentColor"
                          />{" "}
                        </svg>
                      </button>
                    </div>
                    <button
                      className="button button-m text-secondary p-0"
                      type="button"
                    >
                      <div className="relative size-8 flex items-center justify-center cursor-pointer bg-transparent rounded-full">
                        <svg
                          className="size-6"
                          fill="none"
                          height="32"
                          viewBox="0 0 32 32"
                          width="32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m15.184 26-5.445 2.99c-.856.47-1.915.127-2.365-.767a1.9 1.9 0 0 1-.177-1.16l1.04-6.333a1.88 1.88 0 0 0-.504-1.62L3.33 14.626a1.89 1.89 0 0 1-.031-2.587c.269-.289.621-.476 1.002-.534l6.087-.923a1.76 1.76 0 0 0 1.32-1.001l2.722-5.76c.428-.906 1.478-1.28 2.346-.832.346.178.626.47.796.831l2.723 5.761c.255.54.748.915 1.319 1l6.087.925c.957.145 1.62 1.074 1.482 2.074a1.86 1.86 0 0 1-.51 1.047l-4.405 4.484a1.88 1.88 0 0 0-.504 1.62l1.04 6.332c.163.996-.478 1.941-1.431 2.113-.38.068-.77.003-1.111-.184l-5.445-2.99c-.51-.28-1.12-.28-1.63 0z"
                            fill="rgb(255, 152, 32)"
                          />
                        </svg>
                      </div>
                      <span className="hidden @2xl:block text-warning">
                        232185
                      </span>
                    </button>
                    <button
                      className="button button-m text-secondary p-0"
                      type="button"
                    >
                      <svg
                        className="transition-transform duration-300 hover:scale-125 size-7"
                        fill="none"
                        height="32"
                        viewBox="0 0 32 32"
                        width="32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {" "}
                        <path
                          d="M25.461 5.249a3.44 3.44 0 0 1 1.485 6.545l-.002-.057q.027.93.022 1.79l-.011.679c-.151 6.343-1.785 9.75-5.373 9.75-1.894 0-3.369-.972-4.516-2.684q-.1-.15-.195-.301l-.186-.306-.178-.317-.174-.331q-.128-.255-.258-.538l-.174-.392-.179-.427-.186-.465-.196-.509-.21-.558-.517-1.404-.194-.512-.189-.478-.18-.443-.176-.41-.086-.193-.168-.362q-.041-.087-.082-.17l-.162-.316c-.696-1.306-1.304-1.785-2.077-1.785-1.273 0-2.272 1.39-2.813 4.397l-.081.488a22 22 0 0 0-.075.515l-.066.542-.03.282-.053.583-.024.302-.042.625q-.018.32-.033.653l-.024.681-.003.102a3.44 3.44 0 1 1-3.013-.012q.037-1.395.144-2.636l.063-.653c.616-5.782 2.522-8.878 6.048-8.878 1.8 0 3.196.946 4.284 2.605q.093.144.183.289l.174.293.168.303.164.317.162.338.164.362.083.193.171.411.18.45.19.494.31.835.305.832.202.541.197.506.19.47.183.439.09.207.178.39.087.183.172.344.17.315c.727 1.298 1.399 1.784 2.275 1.784.883 0 1.59-.93 1.995-2.914l.076-.397q.034-.205.067-.424l.059-.45q.029-.232.051-.478l.043-.504.034-.532.026-.56.01-.29.012-.601.003-.629q0-.322-.006-.658l-.016-.685-.003-.052a3.44 3.44 0 0 1 1.529-6.524z"
                          fill="currentColor"
                        />{" "}
                      </svg>
                    </button>
                    <button
                      className="button button-m hidden @2xl:block text-secondary p-0"
                      type="button"
                    >
                      <svg
                        className="size-7"
                        fill="currentColor"
                        height="100%"
                        viewBox="0 0 28 28"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M22.8053 12.2254C23.1491 12.2254 23.4284 12.5039 23.4284 12.8484L23.4284 20.5198C23.4284 20.8636 23.1499 21.1428 22.8053 21.1428L5.24844 21.1426C4.90465 21.1426 4.62541 20.8641 4.62541 20.5196L4.62541 12.8362C4.62541 12.4925 4.9039 12.2132 5.24844 12.2132L22.8053 12.2134V12.2254ZM22.8053 4.64691L5.24844 4.64673C3.70888 4.65048 2.46207 5.89729 2.45907 7.4361L2.45907 20.5181C2.46282 22.0576 3.70963 23.3045 5.24844 23.3075L22.8053 23.3076C24.3449 23.3039 25.5917 22.0571 25.5947 20.5183L25.5947 7.43628C25.591 5.89672 24.3441 4.64991 22.8053 4.64691Z" />
                      </svg>
                    </button>
                  </div>
                  <div className="hidden @2xl:block" />
                  <div className="flex items-center gap-2 justify-end">
                    <div
                      className="flex items-center gap-2 px-1.5 bg-(--Button-BrightBg) rounded-lg cursor-pointer transition-colors"
                      style={{
                        paddingBottom: "7px",
                        paddingTop: "7px",
                      }}
                    >
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="size-3 text-primary"
                          fill="none"
                          viewBox="0 0 12 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.00195 0C6.15533 7.15613e-05 6.303 0.0607797 6.41602 0.169922L11.8027 5.33594H11.7988C11.8906 5.42393 11.9549 5.53983 11.9834 5.66699C12.0117 5.79404 12.0028 5.92712 11.958 6.04883C11.9132 6.17059 11.8347 6.27576 11.7324 6.34961C11.6301 6.42337 11.5088 6.46281 11.3848 6.46289H10.5244V11.6328C10.5244 11.7302 10.4873 11.8237 10.4219 11.8926C10.3564 11.9614 10.2673 12 10.1748 12H1.82324C1.73093 11.9999 1.64248 11.9612 1.57715 11.8926C1.51174 11.8237 1.47465 11.7302 1.47461 11.6328V6.46289H0.615234C0.491264 6.46281 0.369863 6.42333 0.267578 6.34961C0.165219 6.27573 0.0858059 6.17067 0.0410156 6.04883C-0.00370088 5.92713 -0.0117418 5.79401 0.0166016 5.66699C0.0450518 5.53983 0.109436 5.42393 0.201172 5.33594L5.58691 0.169922C5.70003 0.0605792 5.84838 0 6.00195 0ZM5.99609 5C5.68472 5.00004 5.40648 5.05554 5.16113 5.16602C4.91574 5.2721 4.70586 5.42899 4.53125 5.63672C4.36138 5.84445 4.22916 6.10517 4.13477 6.41895C4.04509 6.72841 4 7.08886 4 7.5C4 7.91114 4.04509 8.27401 4.13477 8.58789C4.22915 8.90159 4.36141 9.16243 4.53125 9.37012C4.70584 9.57779 4.91579 9.73476 5.16113 9.84082C5.40646 9.94686 5.68476 9.99997 5.99609 10C6.3076 10 6.5866 9.94692 6.83203 9.84082C7.07735 9.73473 7.28734 9.57782 7.46191 9.37012C7.63649 9.16241 7.76872 8.90163 7.8584 8.58789C7.95279 8.27401 8 7.91114 8 7.5C8 7.08886 7.95279 6.72841 7.8584 6.41895C7.76874 6.10516 7.63649 5.84446 7.46191 5.63672C7.28735 5.42902 7.07734 5.27211 6.83203 5.16602C6.5866 5.05549 6.3076 5 5.99609 5ZM6.90234 6.22656C7.05338 6.52276 7.13102 6.94739 7.13574 7.5C7.13102 7.8404 7.10058 8.13041 7.04395 8.36914C6.99203 8.60323 6.91643 8.79366 6.81738 8.93945C6.71832 9.08512 6.59539 9.19059 6.44922 9.25684C6.30776 9.31866 6.15002 9.35054 5.97559 9.35059C5.75378 9.35059 5.56916 9.29507 5.42285 9.18457L6.90234 6.22656ZM6.01758 5.65625C6.21109 5.65625 6.38624 5.70306 6.54199 5.7959L5.06934 8.74707C5.00326 8.60118 4.95296 8.4236 4.91992 8.21582C4.88692 8.00813 4.868 7.7695 4.86328 7.5C4.868 7.15959 4.89632 6.872 4.94824 6.6377C5.00488 6.40345 5.08352 6.21324 5.18262 6.06738C5.28165 5.91732 5.40156 5.81088 5.54297 5.74902C5.68455 5.68714 5.84297 5.65626 6.01758 5.65625ZM10.4355 0.742188C10.482 0.741696 10.5283 0.751059 10.5713 0.769531C10.6141 0.787979 10.6528 0.8152 10.6855 0.849609C10.7184 0.884161 10.7451 0.925466 10.7627 0.970703C10.7801 1.01581 10.7886 1.06458 10.7881 1.11328V3.34863L8.06445 0.742188H10.4355Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-xs text-primary whitespace-nowrap">
                          Zero Edge
                        </span>
                      </div>
                      <div
                        className="relative flex items-center justify-center"
                        style={{
                          height: "30px",
                          width: "30px",
                        }}
                      >
                        <svg
                          className="-rotate-90"
                          height="30"
                          viewBox="0 0 30 30"
                          width="30"
                        >
                          <circle
                            className="text-layer5"
                            cx="15"
                            cy="15"
                            fill="transparent"
                            r="13.25"
                            stroke="var(--Border-Color-border-black_alpha20, #00000033)"
                            strokeWidth="3.5"
                          />
                          <circle
                            className="text-brand transition-all duration-500"
                            cx="15"
                            cy="15"
                            fill="transparent"
                            r="13.25"
                            stroke="currentColor"
                            strokeDasharray="83.25220532012952"
                            strokeDashoffset="24.520906664498902"
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            alt="Trophy"
                            className="size-4! text-brand"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI+SURBVHgBpVBtSFNhFD5bdzam5hfNEGsLLTaLrZowakFFOWwNKjPrR1Y2yVizP5VIVESFLYOwILXS6EtKMmQV1SCLCld3FeYIZWtLR7m4ls25Ne/utt7uHbv+iAQ/Hjjw8p7nOed5DsA0wakyFGTF31x9mXoujl+u6Mb1pw9pZfWO9xXn7PZ3hp0a+UKmz5RCoRAwZMxlO1VlMbkHX14rPvDwxbd9SgnvbRJnGLAQBZaPX2F9ZxakS+7DriIlqOSZ0rzcjJpP+A9r671XQ5jb4RGVHms6Sw+60VK9upmECIhlCyDQ44IkPgbJqTNhjjgbXF0DsDhbcEulu6Okuai7ZEldzKu5obSZtW0sz0eBYAvy4HvQKnEG6ryqRZ7P51Gtbjlic1qvF9cwXCYDzBaGQ0x2uv702b0Q9nogNBoGHo8LVCgKUb8bRv2/We0M/1CQYrgx8bItdytfN27uYQbMF6WRI196we8jQZqbBhGEYIQgQCwR2Zg+3rjNvPbg45MQ3zY2sat+o5EguR1kJPAkOZ0PTucw5IhnQRgwuGiiUowliWfkZW2VzFaIn55FdKnedDgIkPnG8j1C0sYSBQnA4SCw2372V29NzaeF+1nhv5vH/q4c31RIDXrbMMInyFkn6yC8vy7tOPqoHSYKU62msPVEAVKrVwhhKnhQp0HjuIuBO17jgmHlXj4/BXRF0nmTEjufHVljNjsaCKsLNuQJ+wyG3ZIJi2/ffPq8qX0798OAD1TlWs6ihP7e//H+AhQj2R5eNlu3AAAAAElFTkSuQmCC"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-3 col-span-8 @4xl:order-2 @4xl:col-span-3 min-w-100 @4xl:w-98 @4xl:absolute @4xl:right-0 @4xl:top-0 @4xl:bottom-0 @4xl:flex flex-col @4xl:overflow-hidden z-10">
                <div
                  className="hidden @4xl:flex h-12 @4xl:h-10 items-center bg-layer4 rounded-md mb-5 @4xl:mb-2 w-full @4xl:max-w-98 ml-auto"
                  data-orientation="horizontal"
                  id="crash-tab"
                >
                  <div
                    aria-orientation="horizontal"
                    className="relative flex items-center rounded-lg w-full h-full @4xl:h-10 light-layer2-tabs"
                    data-orientation="horizontal"
                    role="tablist"
                  >
                    <button
                      aria-selected="true"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-highlighted=""
                      data-key="classic"
                      data-orientation="horizontal"
                      data-selected=""
                      id="crash-tab-trigger-classic"
                      role="tab"
                      tabIndex={0}
                      type="button"
                    >
                      Classic
                    </button>
                    <button
                      aria-selected="false"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-key="trenball"
                      data-orientation="horizontal"
                      id="crash-tab-trigger-trenball"
                      role="tab"
                      tabIndex={-1}
                      type="button"
                    >
                      Trenball
                    </button>
                    <button
                      aria-selected="false"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-1 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none! focus-visible:outline-0! rounded-md flex-1 data-selected:bg-tab_selected text-secondary data-selected:text-primary"
                      data-key="bettingStrategy"
                      data-orientation="horizontal"
                      id="crash-tab-trigger-bettingStrategy"
                      role="tab"
                      tabIndex={-1}
                      type="button"
                    >
                      Betting Strategy
                    </button>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-layer4 relative mt-2 @4xl:mt-0 @4xl:ml-2 overflow-hidden flex flex-col h-full">
                  {" "}
                  <div className="flex items-center justify-between bg-layer5 dark:bg-layer3 p-2 rounded-lg h-9 shrink-0">
                    <div className="flex items-center justify-center">
                      <div className="mr-2">
                        <svg
                          fill="none"
                          height="14"
                          viewBox="0 0 13 14"
                          width="13"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="6.5"
                            cy="6.78613"
                            fill="#23EE88"
                            fillOpacity="0.2"
                            r="6.5"
                          />
                          <circle
                            cx="6.5"
                            cy="6.78613"
                            fill="#23EE88"
                            r="2.36328"
                          />
                        </svg>
                      </div>
                      <div className="font-extrabold font-mono">
                        242/1810 Players
                      </div>
                    </div>
                    <div className="flex font-semibold font-mono">
                      ₩23,433,676
                    </div>
                  </div>
                  <div className="bg-layer4 p-1 shrink-0">
                    <div className="flex text-left whitespace-nowrap">
                      <div className="text-secondary py-2 w-2/5 truncate">
                        Player
                      </div>
                      <div className="text-secondary py-2 text-left w-1/5">
                        Cashout
                      </div>
                      <div className="text-secondary py-2 text-left w-2/5">
                        Amount
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-1 pt-0 mb-0 relative flex-1 min-h-0 overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(to top, transparent 0%, black 10%)",
                    }}
                  >
                    <div className="size-full relative">
                      <div className="h-auto">
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/46826997"
                              >
                                Uypqedltbsac
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩282,032</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/99862280"
                              >
                                Ohamad1
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩188,126</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/60775662"
                              >
                                Kwpafetgxtac
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩178,200</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/51885718"
                              >
                                Bc0077
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.40x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/BC.black.png"
                              />
                              <div className="truncate">₩67,877</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/32751548"
                              >
                                AmakaCandy
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩136,989</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/34583641"
                              >
                                Layptl23
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.60x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/BCD.black.png"
                              />
                              <div className="truncate">₩70,969</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/42294846"
                              >
                                Gangbox
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/USDC.black.png"
                              />
                              <div className="truncate">₩106,645</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/73304748"
                              >
                                Marcin1991
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.17x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/BNB.black.png"
                              />
                              <div className="truncate">₩17,734</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.35x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩36,378</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/PKR.rect.png"
                              />
                              <div className="truncate">₩83,151</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩66,889</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/103708696"
                              >
                                Nasirhussainsmr
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/PKR.rect.png"
                              />
                              <div className="truncate">₩60,667</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/103708696"
                              >
                                Nasirhussainsmr
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/PKR.rect.png"
                              />
                              <div className="truncate">₩60,667</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/71855543"
                              >
                                Nbnbcfuwrucc
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.45x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/SOL.black.png"
                              />
                              <div className="truncate">₩26,147</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/12642956"
                              >
                                Jabi
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩52,257</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/38265009"
                              >
                                Tlala
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.60x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩28,845</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/103743423"
                              >
                                Ghstzilla
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩43,459</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/IDR.rect.png"
                              />
                              <div className="truncate">₩43,425</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/33324367"
                              >
                                Ethyxbbvjpac
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.04x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩1,696</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/100649851"
                              >
                                Bosscriss
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/BC.black.png"
                              />
                              <div className="truncate">₩40,352</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.72x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩27,369</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩38,012</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="inline-block truncate">
                              Hidden
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">-</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center">
                              <img
                                alt=""
                                className="inline-block w-4 h-4 mr-1"
                                src="https://imgxcut.com/coin/USDT.black.png"
                              />
                              <div className="truncate">₩36,940</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/103504098"
                              >
                                haseebfbc
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.24x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/MYR.rect.png"
                              />
                              <div className="truncate">₩8,864</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex h-10 items-center w-full justify-start font-extrabold">
                          <div className="flex items-center w-2/5">
                            <span className="truncate">
                              <a
                                className="inactive"
                                href="/user/profile/25349907"
                              >
                                Hunter🏹0
                              </a>
                            </span>
                          </div>
                          <div className="w-1/5 text-left">
                            <div className="pl-1 whitespace-nowrap">1.66x</div>
                          </div>
                          <div className="w-2/5 flex pr-1">
                            <div className="w-full flex justify-start items-center text-success!">
                              <img
                                alt=""
                                className="inline-block size-4! mr-1"
                                src="https://imgxcut.com/coin/NGN.rect.png"
                              />
                              <div className="truncate">₩24,142</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-full mb-1.5">
                    <button
                      className="button button-second button-m mx-auto gap-2 my-2 h-8 px-2 bg-none bg-button_bright pointer-events-auto"
                      type="button"
                    >
                      <span>Show More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-304 mx-auto">
          <section className="my-3 sm:my-6 p-3 md:p-5 md:pt-8 flex flex-col bg-layer4 rounded-xl relative">
            <div className="flex justify-between items-start">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg">Crash</span>
                  <div className="flex items-center gap-1 whitespace-nowrap mr-1">
                    <span className="text-secondary text-sm">By</span>
                    <a
                      className="text-brand text-sm inactive"
                      href="/provider/BC Originals"
                    >
                      BC Originals
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 z-10">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md">
                    <span className="text-xs font-semibold">
                      # Zero House Edge
                    </span>
                  </div>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/BC%20Originals?label=BC Originals"
                  >
                    <span className="text-xs font-semibold">
                      # BC Originals
                    </span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/Crash%20games?label=Crash games"
                  >
                    <span className="text-xs font-semibold"># Crash games</span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/Burst%20Games?label=Burst Games"
                  >
                    <span className="text-xs font-semibold"># Burst Games</span>
                  </a>
                </div>
                <button
                  className="button button-m bg-layer5 hover:bg-layer5 size-8! px-2"
                  type="button"
                >
                  <svg
                    className="-rotate-90"
                    fill="none"
                    height="32"
                    viewBox="0 0 32 32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <div className="mb-4 -mt-2">
            <RecommendedGames />
          </div>
          <div className="pb-4 relative">
            <div className="h-8 pt-1 px-2 leading-8 text-base font-extrabold text-primary">
              Latest bet & Race
            </div>
            <div
              className="scroll-x tabs-title hide-scroll bg-[#E4E6E7] dark:bg-[#323738] ml-auto sm:-mt-9 w-full sm:w-auto latest-tabs sm:mr-20"
              style={
                {
                  ["--tabs-indicator-position" as any]: "0%",
                  ["--tabs-width" as any]: "100px",
                } as React.CSSProperties
              }
            >
              <button aria-selected="true" className="tabs-btn btn-like">
                My Bets
              </button>
              <button className="tabs-btn btn-like">History</button>
              <button className="tabs-btn btn-like" tabIndex={8}>
                High Roller
              </button>
              <button className="tabs-btn btn-like" tabIndex={9}>
                Wager Contest
              </button>
              <div className="tabs-indicator" />
            </div>
            <div className="tabs-content">
              <div className="min-h-72 px-2 pt-2 sm:pt-1 relative">
                <div className="relative w-full overflow-auto rounded-xl max-h-120">
                  <table
                    className="caption-bottom text-sm w-full"
                    style={{
                      overflowAnchor: "none",
                    }}
                  >
                    <thead>
                      <tr className="[&_tr]:bg-layer4! border-0 transition-colors text-secondary">
                        <th className="py-3 px-2 sm:px-4 group text-left align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0">
                          Bet ID
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 w-4/12 text-center">
                          Bet Amount
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                          Multiplier
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-right">
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0 group">
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 text-center">
                        <td
                          className="first:rounded-l-lg last:rounded-r-lg px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 py-2"
                          colSpan={4}
                        >
                          <section className="py-10 text-center center flex-col">
                            <img
                              className="w-48 h-48"
                              src="https://bc.game/substation/bc/common/empty_w.png"
                            />
                            <div className="leading-5 mt-4">
                              Stay tuned—something's coming!
                            </div>
                          </section>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bottom-1 left-0 right-0 pointer-events-none" />
              </div>
            </div>
            <div className="absolute right-0 -top-1">
              <div className="flex justify-between items-center w-28 sm:w-18 h-10 px-1! bg-layer4 text-quarterary rounded-md cursor-pointer">
                20
                <button
                  className="button button-m bg-layer5 hover:bg-layer5 size-6! px-2"
                  type="button"
                >
                  <svg
                    className="-rotate-90"
                    fill="none"
                    height="32"
                    viewBox="0 0 32 32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

