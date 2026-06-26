export default function BcSwapPage() {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="rounded-xl bg-layer4 p-4 md:order-last md:w-72 lg:w-100">
          <div>
            <div className="w-full flex cursor-pointer justify-end text-right">
              <div className="icon size-5! fill-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.2575 5.33398C21.4308 5.33398 22.5141 5.96004 23.1003 6.97564L27.3602 14.3603C27.9455 15.375 27.9455 16.6252 27.3602 17.6408L23.1003 25.0255C22.5141 26.0411 21.4308 26.6671 20.2575 26.6671H11.7413C10.5681 26.6671 9.48476 26.0411 8.89859 25.0255L4.63864 17.6408C4.0534 16.6261 4.0534 15.3759 4.63864 14.3603L8.89859 6.97564C9.48476 5.96004 10.5681 5.33398 11.7413 5.33398H20.2575ZM15.9994 11.4916C13.4507 11.4916 11.3843 13.5589 11.3843 16.1105C11.3843 18.662 13.4507 20.7294 15.9994 20.7294C18.5482 20.7294 20.6146 18.662 20.6146 16.1105C20.6146 13.5589 18.5482 11.4916 15.9994 11.4916Z" />
                </svg>
              </div>
            </div>
            <div className="bg-layer2 p-2 mb-2 mt-2 rounded-2xl">
              <div className="text-sm text-secondary px-1 pb-1.5">From</div>
              <div className="mb-3">
                <div className="input text-xl bg-layer2 border-none pl-1">
                  <input inputMode="decimal" />
                  <button
                    className="button button-s select bg-input_bright bg-layer5 gap-0 bg-linear-to-r from-alw_dark/5 to-alw_dark/5 *:bg-transparent"
                    type="button"
                  >
                    <div className="flex items-center rounded-lg flex-auto">
                      <img
                        className="mr-1 h-5 w-5"
                        src="https://imgxcut.com/coin/USDT.black.png"
                      />
                      <div className="text-sm text-left">USDT</div>
                    </div>
                    <div className="size-6 ml-auto bg-input_button center rounded-md ">
                      <div className="icon size-4! transition-all -rotate-90">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="text-secondary text-sm pl-1">≈$3.0000</div>
                <div className="mb-1 text-error" />
              </div>
              <div className="flex justify-center items-center space-x-1">
                <div className="px-2 py-1 rounded-md bg-layer4 text-center text-sm fix-light-hover cursor-pointer w-1/4">
                  25%
                </div>
                <div className="px-2 py-1 rounded-md bg-layer4 text-center text-sm fix-light-hover cursor-pointer w-1/4">
                  50%
                </div>
                <div className="px-2 py-1 rounded-md bg-layer4 text-center text-sm fix-light-hover cursor-pointer w-1/4">
                  75%
                </div>
                <div className="px-2 py-1 rounded-md bg-layer4 text-center text-sm fix-light-hover cursor-pointer w-1/4">
                  Max
                </div>
              </div>
              <div className="flex items-center my-4">
                <div className="grow border-t border-layer4" />
                <div className="p-2 bg-layer4 rounded-lg cursor-pointer hover:brightness-110">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.69357 15.0562H5.17314H3.11055H1.57834C1.43691 15.0562 1.29547 15.1034 1.16582 15.1741C0.776879 15.4216 0.647231 15.9638 0.871169 16.3881L3.46414 21.1615C3.53486 21.2911 3.62915 21.3972 3.74701 21.4679C4.12417 21.7036 4.61919 21.5622 4.84313 21.1615L7.41253 16.3881C7.48324 16.2584 7.5186 16.1052 7.5186 15.9402C7.5186 15.4569 7.15323 15.0562 6.69357 15.0562Z"
                      fill="#31EE88"
                      opacity="0.94"
                    />
                    <path
                      d="M18.8218 9.88197V14.0307C18.8218 16.1287 17.8554 17.1541 15.9342 17.1541C14.013 17.1541 13.0348 16.1051 13.0348 14.0307V8.63263C13.0348 5.37963 11.0783 3.28168 8.061 3.28168C5.04373 3.28168 3.099 5.39141 3.099 8.63263V13.2057H5.16159V8.63263C5.16159 6.61718 6.18699 5.50927 8.061 5.50927C9.39285 5.50927 10.9604 6.07501 10.9604 8.63263V14.0307C10.9604 17.3309 12.8698 19.3699 15.9342 19.3699C18.9986 19.3699 20.908 17.3191 20.8844 14.0307V9.88197H18.81H18.8218Z"
                      fill="#C5DADE"
                      opacity="0.94"
                    />
                    <path
                      d="M23.1357 7.58353L20.6016 2.86904C20.5309 2.7276 20.4248 2.62153 20.2952 2.53902C19.8944 2.29151 19.3759 2.43295 19.1401 2.86904L16.5943 7.54817C16.5236 7.6896 16.4764 7.84283 16.4764 7.99605C16.4764 8.49107 16.8418 8.90359 17.3133 8.90359H20.8963H22.1456H22.4167C22.5581 8.90359 22.6996 8.86823 22.8292 8.78572C23.2182 8.53821 23.3596 7.99605 23.1239 7.58353H23.1357Z"
                      fill="#31EE88"
                      opacity="0.94"
                    />
                  </svg>
                </div>
                <div className="grow border-t border-layer4" />
              </div>
              <div className="flex flex-col text-sm px-1 space-y-3 pb-1.5">
                <div className="text-secondary">To</div>
                <div className="flex justify-between items-center">
                  <div className="text-xl">≈406</div>
                  <div className="bg-layer4 flex items-center justify-between p-1 rounded-lg space-x-0.5 pr-2">
                    <div className="rounded-full center py-1 size-7">
                      <img
                        alt="coin logo"
                        className="h-full"
                        src="https://bc.game/substation/bc/logo/logo_small_w.png"
                      />
                    </div>
                    <div>BC</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 flex items-center justify-between text-sm text-secondary">
              <div>Est. Fees (1%):</div>
              <div>$0.03</div>
            </div>
            <button
              className="button button-brand button-m w-full text-lg font-extrabold sm:text-base"
              type="button"
            >
              Buy BC
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-layer4 p-4 sm:flex sm:flex-col bg-linear-to-tl from-[#24EE8900] from-60% via-[#24EE891A] via-80% to-[#24EE894D] to-100% sm:flex-1">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="flex items-center text-success">
                <div className="icon size-4! rotate-90">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      d="M16.9069 25.6438L9.5905 15.58L16.9069 5.51611L10.2572 5.51611L2.9408 15.58L10.2572 25.6438L16.9069 25.6438ZM28.1005 25.6438L20.784 15.58L28.1005 5.51611L21.4508 5.51611L14.1343 15.58L21.4508 25.6438L28.1005 25.6438Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mr-2 font-extrabold leading-5 text-2xl ml-0.5">
                  $0.00704
                </div>
                <div className="text-xs self-end">1.15%</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-secondary size-8 cursor-pointer center grow">
                <div className="icon size-5! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                  </svg>
                </div>
              </div>
              <div className="light-darkness flex items-center gap-1 rounded-xl p-1 text-sm text-secondary bg-layer3">
                <div className="cursor-pointer rounded-lg size-8 center">
                  1M
                </div>
                <div className="cursor-pointer rounded-lg size-8 center font-extrabold text-primary bg-tab_selected">
                  1H
                </div>
                <div className="cursor-pointer rounded-lg size-8 center">
                  1D
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center">
              <div className="mr-1 text-secondary">Market Cap:</div>
              <div>$70.4M</div>
            </div>
            <div className="flex items-center">
              <div className="mr-1 text-secondary">Current Supply:</div>
              <div>10B</div>
            </div>
          </div>
          <div className="relative h-72 flex-1">
            <iframe
              className="h-full w-full"
              src="https://detrade.com/chart-iframe/"
            />
          </div>
        </div>
      </div>

      <div>
        <div
          className="scroll-x tabs-title hide-scroll light-layer2-tabs w-52"
          data-type="inner"
          style={
            {
              ["--tabs-indicator-position" as any]: "0%",
              ["--tabs-width" as any]: "100px",
            } as React.CSSProperties
          }
        >
          <button aria-selected="true" className="tabs-btn btn-like">
            <div className="text-sm">My Trades</div>
          </button>
          <button className="tabs-btn btn-like">
            <div className="text-sm">All Trades</div>
          </button>
          <div className="tabs-indicator" />
        </div>
        <div className="tabs-content">
          <div className="relative rounded-xl max-h-100 overflow-scroll min-h-50">
            <div className="overflow-x-auto overflow-y-hidden">
              <table className="h-full w-full table-fixed font-500 bg-layer4 text-sm text-primary border-separate border-spacing-x-0 border-spacing-y-0">
                <thead>
                  <tr className="uppercase">
                    <th
                      align="left"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "5.375rem",
                      }}
                    >
                      Type
                    </th>
                    <th
                      align="left"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "8.75rem",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      align="right"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "15.25rem",
                      }}
                    >
                      Price
                    </th>
                    <th
                      align="right"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "15.25rem",
                      }}
                    >
                      Value
                    </th>
                    <th
                      align="right"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "13.1875rem",
                      }}
                    >
                      Create Time
                    </th>
                  </tr>
                </thead>
                <tbody className="relative" />
              </table>
            </div>
            <section className="py-10 text-center center flex-col">
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
    </>
  );
}

