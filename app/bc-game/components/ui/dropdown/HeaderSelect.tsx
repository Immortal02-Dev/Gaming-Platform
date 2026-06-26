import type { CSSProperties } from "react";

export default function HeaderSelect({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="scroll-y dropdown-layer bg-layer3 currency-select [&_.pop-content]:pb-0"
      style={{
        opacity: "1",
        transform: "translate(0px, 0px)",
        width: "384px",
        ...style,
      }}
    >
      <div className="scroll-container">
        <div className="tabs-content mt-0 min-h-125 flex-auto bg-transparent sm:min-h-0">
          <div className="search-input sticky flex items-center justify-between bg-layer3 z-20 pt-3 dark:bg-layer2 sm:dark:bg-layer3 -top-px">
            <div className="input bg-layer3 text-base font-semibold flex-auto">
              <div className="icon fill-secondary ">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z" />
                </svg>
              </div>
              <input placeholder="Search" />
            </div>
            <button
              className="button button-m fix-light-hover ml-2 rounded-lg center aspect-square"
              type="button"
            >
              <div className="icon">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0121 4.00081C16.7812 3.98381 17.4183 4.59261 17.4361 5.3617L17.4369 12.167L24.1467 12.1637C24.9149 12.1411 25.5577 12.7458 25.5804 13.5141C25.6023 14.2427 25.0607 14.8572 24.3499 14.9398L24.23 14.9487L17.4377 14.9519L17.4361 21.8106C17.3908 22.5247 16.8054 23.0978 16.0768 23.114C15.3077 23.131 14.6706 22.5222 14.6528 21.7531L14.652 14.9527L7.92524 14.956C7.15695 14.9786 6.51415 14.3739 6.49068 13.6056C6.46882 12.877 7.01042 12.2625 7.72123 12.1799L7.84104 12.171L14.6504 12.167L14.6528 5.30341C14.6981 4.58937 15.2834 4.01619 16.0121 4V4.00081ZM7.95519 23.5965H23.9305C24.7789 23.5965 25.4663 24.2839 25.4663 25.1323C25.4663 25.9807 24.7789 26.668 23.9305 26.668H7.95519C7.10676 26.668 6.41943 25.9807 6.41943 25.1323C6.41943 24.2839 7.10676 23.5965 7.95519 23.5965Z" />
                </svg>
              </div>
            </button>
          </div>
          <div className="my-1 flex-auto">
            <div className="list-title z-10 font-extrabold text-secondary sticky bg-layer3 py-2 pl-1 leading-6 dark:bg-layer2 sm:dark:bg-layer3 top-14 sm:top-12">
              Cash
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4 scroll-target bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/KRW.rect.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  KRW
                </div>
              </div>
              <div className="ml-auto text-right">₩0</div>
            </div>
            <div className="list-title z-10 font-extrabold text-secondary sticky bg-layer3 py-2 pl-1 leading-6 dark:bg-layer2 sm:dark:bg-layer3 top-14 sm:top-12">
              Cryptocurrency
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/BCD.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  BCD
                  <a
                    className="ml-2 text-brand inactive"
                    href="/wallet/about-bonuscoin"
                  >
                    <div className="icon size-4">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/BC.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  BC
                  <a
                    className="ml-2 text-brand inactive"
                    href="/wallet/about-bccoin"
                  >
                    <div className="icon size-4">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/USDT.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  USDT
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/ETH.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  ETH
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/BTC.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  BTC
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/TRX.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  TRX
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/BNB.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  BNB
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/LTC.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  LTC
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/XRP.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  XRP
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/USDC.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  USDC
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/DOGE.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  DOGE
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/SOL.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  SOL
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/XLM.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  XLM
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/SATS.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  SATS
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/MATIC.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  MATIC
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
            <div className="fix-light-hover mb-1 flex cursor-pointer items-center rounded-lg px-2 py-3 leading-5! hover:bg-layer4">
              <img
                className="h-6 w-6"
                src="https://imgxcut.com/coin/WLD.black.png"
              />
              <div className="ml-2">
                <div className="flex items-center text-base font-extrabold">
                  WLD
                </div>
              </div>
              <div className="ml-auto text-right">
                <div>₩0</div>
                <div className="text-second">0</div>
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 z-20 -mx-4 mt-auto border-t border-third bg-layer4 p-4">
            <div className="flex flex-none items-center justify-between">
              <div className="flex cursor-pointer items-center text-secondary">
                <div className="icon mr-1">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.2575 5.33398C21.4308 5.33398 22.5141 5.96004 23.1003 6.97564L27.3602 14.3603C27.9455 15.375 27.9455 16.6252 27.3602 17.6408L23.1003 25.0255C22.5141 26.0411 21.4308 26.6671 20.2575 26.6671H11.7413C10.5681 26.6671 9.48476 26.0411 8.89859 25.0255L4.63864 17.6408C4.0534 16.6261 4.0534 15.3759 4.63864 14.3603L8.89859 6.97564C9.48476 5.96004 10.5681 5.33398 11.7413 5.33398H20.2575ZM15.9994 11.4916C13.4507 11.4916 11.3843 13.5589 11.3843 16.1105C11.3843 18.662 13.4507 20.7294 15.9994 20.7294C18.5482 20.7294 20.6146 18.662 20.6146 16.1105C20.6146 13.5589 18.5482 11.4916 15.9994 11.4916Z" />
                  </svg>
                </div>{" "}
                View in currency
              </div>
              <div className="flex items-center text-secondary">
                <div className="switch switch-xs mr-1">
                  <div />
                </div>
                <span className="ml-2">Hide Small</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
