import RecommendedGames from "@/components/modules/favorite/RecommendedGames";
export default function Cave() {
  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0">
      <div
        className="max-w-308 mx-auto w-full sm:px-4 sm:pb-5 transition-all duration-200 @container"
        id="game-full-container"
        style={{
          maxWidth: "1248px",
        }}
      >
        <div className="flex flex-col h-full">
          {/* <div className=" grid-cols-1 grow bg-layer2 relative rounded-lg items-stretch @4xl:pb-0 @4xl:h-150 @4xl:grid-cols-[minmax(22.5rem,22.5rem)_auto] flex! flex-col lg:h-full!">
            <div className="order-1 col-span-full bg-layer4 dark:bg-[#292D2E] overflow-x-scroll flex flex-col rounded-t-xl @4xl:order-2 @4xl:col-span-1 @4xl:relative @4xl:pt-2 @4xl:rounded-tl-none @4xl:rounded-tr-xl @4xl:h-full light-game-view pt-0! order-first! rounded-t-xl">
              <div className="flex-1 rounded-lg flex items-center justify-center overflow-hidden !block rounded-b-none">
                <div
                  className="relative p-0 h-full overflow-hidden rounded-t-xl"
                  style={{
                    background:
                      "linear-gradient(360deg, rgb(11, 17, 31) 0%, rgb(19, 29, 56) 100%)",
                  }}
                >
                  <div className="" id="cave-canvas">
                    <div>
                      <canvas
                        height="608"
                        style={{
                          cursor: "inherit",
                          display: "block",
                          height: "608px",
                          touchAction: "auto",
                          width: "1216px",
                        }}
                        width="1216"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full flex flex-col gap-3 bg-layer4 rounded-t-none pt-1 @4xl:col-span-1 @4xl:order-none @4xl:rounded-tl-xl @4xl:pt-0.5 @4xl:h-full @4xl:overflow-y-auto @4xl:border-r border-input !p-3 order-last !rounded-t-none">
              <div
                className="flex flex-col relative @lg:h-full @lg:!overflow-x-hidden"
                data-orientation="horizontal"
                id="tabs-cl-350"
              >
                <div className="flex flex-col lg:flex-row gap-3">
                  <div className="w-full" id="NumberField-cl-351" role="group">
                    <div className="flex items-center mb-1 justify-between">
                      <label
                        className="peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-[invalid]:text-secondary px-1 flex items-center h-4.5 pl-1 mr-1 text-sm font-extrabold"
                        id="NumberField-cl-351-label"
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
                  <div className="w-full" id="NumberField-cl-354" role="group">
                    <label
                      className="text-sm font-semibold peer-disabled:cursor-not-allowed peer-disabled:opacity-40 text-secondary data-[invalid]:text-secondary px-1 leading-4 block mb-1"
                      id="NumberField-cl-354-label"
                    >
                      Number of Bets
                    </label>
                    <div className="relative">
                      <div className="input">
                        <input inputMode="decimal" />
                      </div>
                      <div className="flex items-center gap-1 absolute right-1 top-1/2 -translate-y-1/2">
                        <button
                          className="button button-second button-m text-primary h-10 sm:h-8! w-12 rounded-md! md:max-w-100"
                          type="button"
                        >
                          10
                        </button>
                        <button
                          className="button button-second button-m text-primary h-10 sm:h-8! w-12 rounded-md! md:max-w-100"
                          type="button"
                        >
                          100
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:mt-3 mb-3 lg:mb-1 order-first w-full lg:w-86.5 self-center lg:order-last">
                  <div className="lg:order-last mt-1.5 lg:mt-0">
                    <button
                      className="button button-brand button-m w-full p-2 text-black cursor-default! md:h-12"
                      type="button"
                    >
                      Bet
                    </button>
                  </div>
                </div>
                <div
                  aria-orientation="horizontal"
                  className="relative items-center w-full bg-layer4 overflow-hidden shrink-0 rounded-none h-12 top-0 z-100 @4xl:order-first @4xl:border-b @4xl:border-input @4xl:sticky @4xl:rounded-b-none hidden"
                  data-orientation="horizontal"
                  role="tablist"
                >
                  <div
                    className="duration-250ms absolute data-[orientation=horizontal]:bottom-[-1px] data-[orientation=vertical]:right-[-1px] data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 bg-gradient-to-r from-[#24ee89] to-[#9fe871] data-[disabled]:opacity-40 slider-track-active !w-1/2 transform transition-transform duration-300 ease-in-out !translate-x-0"
                    data-orientation="horizontal"
                    data-resizing="false"
                    role="presentation"
                  />
                </div>
              </div>
            </div>
          </div> */}
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
              <button className="button button-m text-secondary" type="button">
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
                <span className="hidden @2xl:block">909</span>
              </button>
              <button className="button button-m text-secondary" type="button">
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
                      strokeDashoffset="24.274956922131196"
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
        <div className="flex flex-col max-w-304 mx-auto">
          <section className="my-3 sm:my-6 p-3 md:p-5 md:pt-8 flex flex-col bg-layer4 rounded-xl relative">
            <div className="flex justify-between items-start">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg">
                    Cave Of Plunder
                  </span>
                  <div className="flex items-center gap-1 whitespace-nowrap mr-1">
                    <span className="text-secondary text-sm">By</span>
                    <a
                      className="text-brand text-sm inactive"
                      href="/provider/Croco Gaming"
                    >
                      BC Originals
                    </a>
                  </div>
                </div>
              </div>
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
                  <span className="text-xs font-semibold"># BC Originals</span>
                </a>
                <a
                  className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                  href="/tagname/Treasures?label=Treasures"
                >
                  <span className="text-xs font-semibold"># Treasures</span>
                </a>
                <a
                  className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                  href="/tagname/Jackpots?label=Jackpots"
                >
                  <span className="text-xs font-semibold"># Jackpots</span>
                </a>
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
              className="scroll-x tabs-title hide-scroll bg-[#E4E6E7] dark:bg-[#323738] ml-auto sm:-mt-9 w-full sm:w-auto latest-tabs"
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
              <div className="w-full">
                <div className="relative w-full overflow-auto max-h-160 rounded-xl">
                  <table
                    className="w-full caption-bottom text-sm"
                    style={{
                      overflowAnchor: "none",
                    }}
                  >
                    <thead>
                      <tr className="[&_tr]:bg-layer4! border-0 transition-colors text-secondary">
                        <th className="py-3 px-2 sm:px-4 group text-left align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0">
                          Bet ID
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                          Bet
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                          Payout
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-right">
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0 group">
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182105955984830
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩98
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          9.5x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-brand!">
                          <span>+</span>
                          <span>₩836</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182099134692798
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩98
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.1999x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩78</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182090441066429
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩870
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/TRX.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩870</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/TRX.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182091492298942
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩32
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩32</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182078957484989
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩2,320
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.2x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩1,856</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182083353245119
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩32
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.3999x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩19</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182098073974207
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩21
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/RUB.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩21</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/RUB.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182059076976574
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩1,740
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.3x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩1,218</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182084637887165
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩964
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩964</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182052637948605
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩964
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩964</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-center">
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
    </div>
  );
}
