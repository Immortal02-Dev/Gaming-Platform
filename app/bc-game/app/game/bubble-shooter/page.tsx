import RecommendedGames from "@/components/modules/favorite/RecommendedGames";

export default function BubbleShooterPage() {
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
            <div className="grid grid-cols-1 grow bg-layer2 relative rounded-lg items-stretch @4xl:pb-0 @4xl:h-150 @4xl:grid-cols-[minmax(22.5rem,22.5rem)_auto]">
              <div className="col-span-full order-2 flex flex-col gap-3 bg-layer4 rounded-t-none pt-1 @5xl:col-span-1 @5xl:order-0 @5xl:rounded-tl-xl @5xl:pt-0.5 @5xl:h-full @5xl:overflow-y-auto @5xl:border-r border-input">
                <div
                  className="flex flex-col relative @lg:h-full @lg:overflow-x-hidden!"
                  data-orientation="horizontal"
                  id="tabs-cl-114"
                >
                  <div
                    aria-labelledby="tabs-cl-114-trigger-manual"
                    className="mt-0 @4xl:relative z-100 @4xl:overflow-auto no-scrollbar"
                    data-orientation="horizontal"
                    data-selected=""
                    id="tabs-cl-114-content-manual"
                    role="tabpanel"
                    style={{
                      maxHeight: "calc(100% - 48px)",
                    }}
                  >
                    <div
                      className="flex flex-col gap-3 px-3 mb-2 @md:mb-3 mt-2 @4xl:py-3 relative z-100"
                      style={
                        {
                          ["--motion-translateX" as any]: "0px",
                          opacity: "1",
                          transform: "translateX(var(--motion-translateX))",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="w-full"
                        id="NumberField-cl-115"
                        role="group"
                      >
                        <div className="flex items-center mb-1 justify-between">
                          <label
                            className="peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-invalid:text-secondary px-1 flex items-center h-4.5 pl-1 mr-1 text-sm font-extrabold"
                            id="NumberField-cl-115-label"
                          >
                            Amount
                          </label>
                          <div className="grow flex items-center">
                            <button
                              aria-expanded="false"
                              aria-haspopup="dialog"
                              className="focus-visible:outline-none size-4!"
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
                        </div>
                        <div className="relative">
                          <div className="input font-extrabold pr-1 sm:pr-0.5 nowidth-input rounded-lg">
                            <input inputMode="decimal" />
                            <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 order-first scale-125">
                              <img
                                className="w-4 h-4"
                                src="https://imgxcut.com/coin/KRW.rect.png"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <button
                                  className="button button-input button-m text-primary h-10 sm:h-8! w-12 rounded-md"
                                  type="button"
                                >
                                  1/2
                                </button>
                                <button
                                  className="button button-input button-m text-primary h-10 sm:h-8! w-12 rounded-md"
                                  type="button"
                                >
                                  2×
                                </button>
                                <button
                                  className="button button-input button-m text-primary h-10 sm:h-8! w-12 rounded-md"
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
                          </div>
                          <div className="w-full top-0">
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
                      <div className="flex flex-col gap-2">
                        <label className="text-secondary font-bold text-sm px-1">
                          Difficulty
                        </label>
                        <div className="relative group bg-tab_padding Group rounded-lg p-1 select-none">
                          <div
                            className="absolute top-1 bottom-1 bg-tab_selected rounded-md transition-transform duration-300 ease-out translate-x-0"
                            style={{
                              width: "calc(50% - 4px)",
                            }}
                          />
                          <div className="relative flex">
                            <button className="flex-1 px-4 py-2 rounded-md font-bold text-sm transition-colors duration-200 relative z-10 focus:outline-none text-white">
                              Low
                            </button>
                            <button className="flex-1 px-4 py-2 rounded-md font-bold text-sm transition-colors duration-200 relative z-10 focus:outline-none text-secondary hover:text-white">
                              High
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="button button-second button-m w-full p-2 md:h-12 cursor-pointer"
                        type="button"
                      >
                        Change map
                      </button>
                      <button
                        className="button button-brand button-m  w-full p-2 text-black cursor-pointer md:h-12"
                        type="button"
                      >
                        Random Bet
                      </button>
                    </div>
                  </div>
                  <div
                    aria-orientation="horizontal"
                    className="relative flex items-center w-full bg-layer4 overflow-hidden shrink-0 rounded-none h-12 top-0 z-100 @5xl:order-first @5xl:border-b border-input @5xl:sticky @5xl:rounded-b-none"
                    data-orientation="horizontal"
                    role="tablist"
                  >
                    <button
                      aria-controls="tabs-cl-114-content-manual"
                      aria-selected="true"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none!  rounded-md bg-none text-secondary data-selected:text-primary flex-1"
                      data-highlighted=""
                      data-key="manual"
                      data-orientation="horizontal"
                      data-selected=""
                      id="tabs-cl-114-trigger-manual"
                      role="tab"
                      tabIndex={0}
                      type="button"
                    >
                      Manual
                    </button>
                    <button
                      aria-selected="false"
                      className="h-full inline-flex items-center justify-center whitespace-nowrap px-3 font-extrabold transition-all disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none!  rounded-md bg-none text-secondary data-selected:text-primary flex-1"
                      data-key="auto"
                      data-orientation="horizontal"
                      id="tabs-cl-114-trigger-auto"
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
                        width: "180px",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 col-span-full bg-layer4 dark:bg-[#292D2E]  flex flex-col rounded-t-xl @5xl:order-2 @5xl:col-span-1 @5xl:relative @5xl:pt-2 @5xl:rounded-tl-none @5xl:rounded-tr-xl @5xl:h-full light-game-view @container rounded-b-none! bg-cover! bg-no-repeat! bg-position-[center_top_0%]! sm:bg-size-[100%_100%]! relative pt-0! pb-0! overflow-x-hidden! h-150">
                <div className="@4xl:pl-6 @md:pr-4  @4xl:block my-2  @4xl:mt-2 @4xl:mb-2 z-101 absolute top-0 left-0 w-full">
                  <div
                    className="mx-2 flex items-center justify-center h-8 @md:h-10 truncate rounded-lg text-center leading-10 bg-layer4 text-secondary"
                    style={{
                      opacity: "0",
                    }}
                  >
                    Game result will be displayed
                  </div>
                </div>
                <div className="absolute flex! w-full h-full top-0 left-0 items-center justify-center">
                  <div className="h-full flex-1 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-right absolute left-0 top-0"
                      style={{
                        backgroundImage:
                          'url("https://bc.game/modules/games2/assets/wall-left-pc-white-P7kSyPnP.svg")',
                      }}
                    />
                    <img
                      className="w-full h-full absolute left-0 top-0 scale-y-[300] pointer-events-none transition-all duration-500 opacity-0"
                      src="data:image/svg+xml,%3csvg%20width='141'%20height='600'%20viewBox='0%200%20141%20600'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_881_71162)'%3e%3cg%20filter='url(%23filter0_f_881_71162)'%3e%3cellipse%20cx='-10.5'%20cy='328'%20rx='23'%20ry='299'%20fill='%23EE3E17'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_881_71162'%20x='-133.5'%20y='-71'%20width='246'%20height='798'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='50'%20result='effect1_foregroundBlur_881_71162'/%3e%3c/filter%3e%3cclipPath%20id='clip0_881_71162'%3e%3crect%20width='141'%20height='600'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                      style={{
                        animation: "auto ease 0s 1 normal none running none",
                        filter: "drop-shadow(rgb(238, 62, 23) 0px 0px 1rem)",
                      }}
                    />
                  </div>
                  <div className="w-xl shrink-0 h-150 overflow-visible flex items-center justify-center z-100">
                    <div className="flex-1 rounded-lg flex items-center justify-center w-full h-full overflow-visible">
                      <div
                        className="relative flex justify-between mt-0 w-full h-full @2xl:justify-center @2xl:items-center"
                        style={{
                          transform: "scale(1)",
                        }}
                      >
                        <div
                          className="h-full relative flex justify-center items-center w-xl min-w-xl "
                          style={{
                            transform: "scale(1)",
                          }}
                        >
                          <div className="w-full h-full pb-6 flex justify-center items-center ">
                            <div className="bg-gray-700 rounded-lg relative w-full h-full flex justify-center items-center">
                              <div className="relative h-full flex justify-center w-full">
                                <div className="relative pb-8 h-full  w-full ">
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "0rem",
                                      left: "0.5rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "0rem",
                                      left: "4.875rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-pointer"
                                    style={{
                                      bottom: "0rem",
                                      left: "9.25rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-pointer"
                                    style={{
                                      bottom: "0rem",
                                      left: "18rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "0rem",
                                      left: "22.375rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "0rem",
                                      left: "26.75rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "0rem",
                                      left: "31.125rem",
                                      zIndex: "1",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "2.6875rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "7.0625rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-pointer"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "11.4375rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-pointer"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "15.8125rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "20.1875rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "24.5625rem",
                                      zIndex: "2",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="1 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/green-bubble-DWNFS6Jg.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "3.78875rem",
                                      left: "28.9375rem",
                                      zIndex: "160",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40! bubble-bounce"
                                      style={
                                        {
                                          ["--bounce-delay" as any]:
                                            "-361.99967008639237ms",
                                          ["--bounce-duration" as any]:
                                            "1.2200000000000002s",
                                          transform: "translateZ(0px)",
                                          willChange: "transform",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="5 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/super-bubble@2x-BnilngYN.png"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none" />
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "0.5rem",
                                      zIndex: "150",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40! bubble-bounce"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "-432ms",
                                          ["--bounce-duration" as any]: "1.58s",
                                          transform: "translateZ(0px)",
                                          willChange: "transform",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="6 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/super-bubble@2x-BnilngYN.png"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none" />
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "4.875rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "9.25rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "13.625rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "18rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.9X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "22.375rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "26.75rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "7.5775rem",
                                      left: "31.125rem",
                                      zIndex: "3",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "2.6875rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "7.0625rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.7X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "11.4375rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "15.8125rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "20.1875rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "24.5625rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "11.3662rem",
                                      left: "28.9375rem",
                                      zIndex: "4",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="2 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/yellow-bubble-DSrOqHuc.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          1.6X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "0.5rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "4.875rem",
                                      zIndex: "130",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40! bubble-bounce"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "-805ms",
                                          ["--bounce-duration" as any]: "1.46s",
                                          transform: "translateZ(0px)",
                                          willChange: "transform",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="7 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/super-bubble@2x-BnilngYN.png"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none" />
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "9.25rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "13.625rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "18rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.6X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "22.375rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.9X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "26.75rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "15.155rem",
                                      left: "31.125rem",
                                      zIndex: "5",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "2.6875rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.7X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "7.0625rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.6X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "11.4375rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "15.8125rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "20.1875rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          2.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "24.5625rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "18.9437rem",
                                      left: "28.9375rem",
                                      zIndex: "6",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="3 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/blue-bubble-KGOcBSrS.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.3X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "0.5rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.9X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "4.875rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "9.25rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "13.625rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.2X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "18rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.5X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "22.375rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.6X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "26.75rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "22.7325rem",
                                      left: "31.125rem",
                                      zIndex: "7",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.6X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "2.6875rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.1X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "7.0625rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.9X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "11.4375rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          3.9X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "15.8125rem",
                                      zIndex: "100",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40! bubble-bounce"
                                      style={
                                        {
                                          ["--bounce-delay" as any]:
                                            "-473.99967008639237ms",
                                          ["--bounce-duration" as any]:
                                            "1.2200000000000002s",
                                          transform: "translateZ(0px)",
                                          willChange: "transform",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="8 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/jackpot-bubble@2x-C7n9H4ho.png"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none" />
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "20.1875rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "24.5625rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.8X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="absolute flex items-center justify-center transition-all duration-300 select-none  w-17.5 h-17.5 cursor-none pointer-events-none"
                                    style={{
                                      bottom: "26.5212rem",
                                      left: "28.9375rem",
                                      zIndex: "8",
                                    }}
                                  >
                                    <div
                                      className="relative flex items-center justify-center select-none w-17.5 h-17.5  hover:opacity-100 opacity-40!"
                                      style={
                                        {
                                          ["--bounce-delay" as any]: "0ms",
                                          ["--bounce-duration" as any]: "0s",
                                          willChange: "auto",
                                        } as React.CSSProperties
                                      }
                                    >
                                      <img
                                        alt="4 bubble"
                                        className="w-full h-full object-contain"
                                        src="https://bc.game/modules/games2/assets/purple-bubble-DLr3rCW-.svg"
                                      />
                                      <div className="absolute inset-0 flex items-center justify-center text-white font-black drop-shadow-lg text-base select-none">
                                        <span className="text-white font-black drop-shadow-lg text-base select-none">
                                          4.4X
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className="crocodile-container absolute flex items-center justify-center z-200 w-17.5 h-17.5 transition-transform"
                                    data-x="1"
                                    data-y="7"
                                    style={{
                                      bottom: "0px",
                                      left: "0px",
                                      transform: "translate(13.625rem, 0rem)",
                                      transitionDuration: "1200ms",
                                      transitionTimingFunction:
                                        "cubic-bezier(0.4, 0, 0.2, 1)",
                                      willChange: "transform",
                                    }}
                                  >
                                    <div
                                      className="absolute flex items-center justify-center overflow-hidden pointer-events-none w-48 h-40  -top-[5.2rem] -left-16"
                                      style={{
                                        backfaceVisibility: "hidden",
                                        perspective: "1000px",
                                        transform: "translate3d(0px, 0px, 0px)",
                                        willChange: "transform",
                                      }}
                                    >
                                      <div
                                        className="size-full"
                                        style={{
                                          contain: "layout style paint",
                                        }}
                                      >
                                        <div
                                          className="flex  items-center pointer-events-none size-full"
                                          id="spine-animation-crocodile"
                                          style={{
                                            height: "100%",
                                            transform: "translateZ(0px)",
                                            width: "100%",
                                            willChange: "transform",
                                          }}
                                        >
                                          <div
                                            className="spine-player"
                                            style={{
                                              height: "100%",
                                              position: "relative",
                                            }}
                                          >
                                            <canvas
                                              className="spine-player-canvas"
                                              height="160"
                                              style={{
                                                display: "block",
                                                height: "100%",
                                                width: "100%",
                                              }}
                                              width="192"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-full flex-1 relative overflow-hidden">
                    <div
                      className="w-full h-full absolute top-0 right-0"
                      style={{
                        backgroundImage:
                          'url("https://bc.game/modules/games2/assets/wall-right-pc-white-fMBPfA3m.svg")',
                      }}
                    />
                    <img
                      className="w-full h-full absolute top-0 right-0 scale-y-[300] pointer-events-none transition-all duration-500 opacity-0"
                      src="data:image/svg+xml,%3csvg%20width='143'%20height='600'%20viewBox='0%200%20143%20600'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_881_73296)'%3e%3cg%20filter='url(%23filter0_f_881_73296)'%3e%3cellipse%20cx='149.5'%20cy='328'%20rx='23'%20ry='299'%20fill='%23EE3E17'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cfilter%20id='filter0_f_881_73296'%20x='26.5'%20y='-71'%20width='246'%20height='798'%20filterUnits='userSpaceOnUse'%20color-interpolation-filters='sRGB'%3e%3cfeFlood%20flood-opacity='0'%20result='BackgroundImageFix'/%3e%3cfeBlend%20mode='normal'%20in='SourceGraphic'%20in2='BackgroundImageFix'%20result='shape'/%3e%3cfeGaussianBlur%20stdDeviation='50'%20result='effect1_foregroundBlur_881_73296'/%3e%3c/filter%3e%3cclipPath%20id='clip0_881_73296'%3e%3crect%20width='143'%20height='600'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                      style={{
                        animation: "auto ease 0s 1 normal none running none",
                        filter: "drop-shadow(rgb(238, 62, 23) 0px 0px 1rem)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="@container relative justify-between bg-layer3 @4xl:justify-self-end @4xl:static w-full flex border-t border-third rounded-b-xl z-100 h-13.75 px-3 @4xl:px-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative">
                  <button
                    className="button button-m text-secondary"
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
                  className="button button-m text-secondary"
                  type="button"
                >
                  <div className="relative size-8! flex items-center justify-center cursor-pointer bg-transparent rounded-full">
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
                        fill="#5F6D6D"
                      />
                    </svg>
                  </div>
                  <span className="hidden @2xl:block">535</span>
                </button>
                <button
                  className="button button-m text-secondary"
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
              </div>
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
                        strokeDashoffset="24.43041717846588"
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
          <div className="flex flex-col max-w-304 mx-auto w-full">
            <section className="my-3 sm:my-6 p-3 md:p-5 md:pt-8 flex flex-col bg-layer4 rounded-xl relative">
              <div className="flex justify-between items-start">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-extrabold text-lg">
                      Bubble Shooter
                    </span>
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
                      href="/tagname/Provably%20fair?label=Provably fair"
                    >
                      <span className="text-xs font-semibold">
                        # Provably fair
                      </span>
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
                  All bets
                </button>
                <button className="tabs-btn btn-like">My bets</button>
                <button className="tabs-btn btn-like" tabIndex={8}>
                  High Roller
                </button>
                <button className="tabs-btn btn-like" tabIndex={9}>
                  Wager Contest
                </button>
                <div className="tabs-indicator" />
              </div>
              <div className="tabs-content">
                <div className="w-full px-2 pt-1 relative">
                  <div className="relative w-full overflow-auto rounded-xl h-full max-h-full">
                    <table
                      className="w-full caption-bottom table-fixed text-xs sm:text-sm"
                      style={{
                        overflowAnchor: "none",
                      }}
                    >
                      <thead>
                        <tr className="[&_tr]:bg-layer4! border-0 transition-colors text-secondary">
                          <th className="py-3 px-2 sm:px-4 group text-left align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 whitespace-nowrap w-1/4">
                            Bet ID
                          </th>
                          <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 whitespace-nowrap text-center">
                            User
                          </th>
                          <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                            Bet Amount
                          </th>
                          <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center whitespace-nowrap truncate">
                            Multiplier
                          </th>
                          <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 whitespace-nowrap text-right w-[38%] sm:w-auto">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0 group">
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181645581717949
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <a
                              className="block truncate text-primary hover:underline inactive"
                              href="/user/profile/71554595"
                            >
                              M_T_I
                            </a>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩289</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/PKR.rect.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                -₩289
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/PKR.rect.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181642584911551
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            3x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1 text-brand!">
                            <span className="inline-flex items-center">
                              +
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                ₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181641081183167
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            3x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1 text-brand!">
                            <span className="inline-flex items-center">
                              +
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                ₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181639680222655
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            2.8x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1 text-brand!">
                            <span className="inline-flex items-center">
                              +
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                ₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181638084002749
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                -₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181636512112573
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                -₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181635100861119
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            2.6x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1 text-brand!">
                            <span className="inline-flex items-center">
                              +
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                ₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181633257140157
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                -₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181630883254975
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <a
                              className="block truncate text-primary hover:underline inactive"
                              href="/user/profile/71554595"
                            >
                              M_T_I
                            </a>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩289</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/PKR.rect.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                -₩289
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/PKR.rect.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                        <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800 font-semibold">
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate max-w-24 cursor-pointer text-primary pr-1">
                            <div className="truncate hover:underline">
                              1856181629431664966
                            </div>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-center px-1">
                            <span className="truncate text-secondary">
                              Hidden
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                            <span className="inline-flex items-center">
                              <span>₩0</span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center px-1">
                            0x
                          </td>
                          <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary pl-1 text-brand!">
                            <span className="inline-flex items-center">
                              <span className="font-extrabold truncate max-w-24 sm:max-w-none">
                                ₩0
                              </span>
                              <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                                <img
                                  className="w-4 h-4"
                                  src="https://imgxcut.com/coin/BCD.black.png"
                                />
                              </div>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
    </div>
  );
}
