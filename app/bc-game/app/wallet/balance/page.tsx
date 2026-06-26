export default function WalletBalance() {
  return (
    <div className="p-4 bg-layer4 rounded-xl lg:px-8">
      <div className="mb-5 flex items-center rounded-xl bg-layerx p-5">
        <img className="mr-4 h-6 w-6" src="/assets/images/wallet/coin.webp" />
        <div className="pr-4">
          <div className="text-secondary">Total Balance</div>
          <div className="text-lg font-extrabold text-brand">₩0</div>
        </div>
        <div className="border-l border-third px-4">
          <div className="text-secondary">Deposit Balance</div>
          <div className="text-lg font-extrabold text-brand">₩0</div>
        </div>
        <div className="border-l border-third px-4">
          <div className="text-secondary">Bonus Balance</div>
          <div className="text-lg font-extrabold text-brand">₩0</div>
        </div>
      </div>
      <div className="sticky top-0 z-20 flex items-center justify-between pb-2 sm:pt-4 bg-layer4">
        <div className="mr-10 flex flex-auto items-center">
          <div className="switch switch-xs">
            <div />
          </div>
          <div className="ml-2 text-secondary">Hide 0 balance</div>
        </div>
        <div className="input flex-auto text-base max-w-63">
          <input placeholder="Search" />
          <div className="icon -order-1 size-6! fill-secondary">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <div className="sticky z-10 py-2 font-extrabold leading-6 text-secondary bg-layer4 top-14 sm:top-16">
          Cash
        </div>
        <div className="overflow-hidden rounded-xl bg-layer5 first:border-none [&>div+div]:border-third">
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/KRW.rect.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                KRW{" "}
              </div>
            </div>
            <div className="ml-auto text-right">₩0</div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="sticky z-10 py-2 font-extrabold leading-6 text-secondary bg-layer4 top-14 sm:top-16">
          Crypto currency
        </div>
        <div className="overflow-hidden rounded-xl bg-layer5 first:border-none [&>div+div]:border-third">
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="https://bc.game/assets/images/coin/BCD.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                BCD{" "}
                <a
                  href="/wallet/about-bonuscoin"
                  className="ml-2 text-brand inactive"
                >
                  <div className="icon size-4!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="https://bc.game/assets/images/coin/BC.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                BC{" "}
                <a
                  href="/wallet/about-bccoin"
                  className="ml-2 text-brand inactive"
                >
                  <div className="icon size-4!">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/USDT.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                USDT{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/ETH.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                ETH{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/BTC.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                BTC{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/TRX.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                TRX{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/BNB.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                BNB{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="https://bc.game/assets/images/coin/LTC.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                LTC{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/XRP.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                XRP{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/USDC.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                USDC{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/DOGE.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                DOGE{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/SOL.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                SOL{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="https://bc.game/assets/images/coin/XLM.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                XLM{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="https://bc.game/assets/images/coin/SATS.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                SATS{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img
              className="h-6 w-6"
              src="/assets/images/coin/MATIC.black.png"
            />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                MATIC{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
          <div className="mb-1 flex items-center py-3 leading-5! cursor-default rounded-none border-t border-transparent px-3">
            <img className="h-6 w-6" src="/assets/images/coin/WLD.black.png" />
            <div className="ml-2">
              <div className="flex items-center text-base font-extrabold">
                WLD{" "}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div>₩0</div>
            </div>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Deposit
            </button>
            <button
              className="button button-m px-3 font-extrabold text-brand"
              type="button"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
