"use client";

interface Props {
  onClose: () => void;
}
export default function ViewInCurrencyModal({ onClose }: Props) {
  return (
    <div className="pop-overlayer">
      <div
        className="bg-layer3 dark:bg-layer2 pop-center"
        style={{
          opacity: "1",
          transform: "scale(1)",
        }}
      >
        <div className="pop-title">
          View in currency
          <button
            className="button button-m pop-close p-0!"
            type="button"
            onClick={onClose}
          >
            <div className="icon size-4!">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="scroll-y pop-content">
          <div className="scroll-container">
            <p className="">
              Select the desired currency to display. The Currencies will be
              shown in approximated values.
            </p>
            <div className="w-full pb-2 mt-3 sticky top-0 z-10">
              <div className="input h-11">
                <input placeholder="Search" />
                <div className="icon size-6! order-first fill-tertiary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pb-4 -ml-4 -mr-4 px-4">
              <div className="radio btn-like select-item mt-1 flex items-center">
                <div className="icon size-6! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6211 21.4017C11.622 22.0831 12.2717 22.4646 12.8477 22.1671C13.7546 21.6991 14.6581 21.2243 15.5564 20.74C15.8581 20.578 16.141 20.578 16.4359 20.7366C16.7916 20.9277 17.149 21.1137 17.5065 21.3023C18.0594 21.5937 18.6122 21.886 19.1651 22.1766C19.4583 22.3309 19.7506 22.3189 20.018 22.126C20.2914 21.9289 20.4029 21.658 20.342 21.316C20.1654 20.3183 19.9966 19.3197 19.8226 18.322C19.7626 17.9783 19.8329 17.6869 20.0951 17.4357C20.8272 16.7329 21.5498 16.0189 22.2767 15.31C22.5244 15.0683 22.6264 14.7811 22.5132 14.446C22.4052 14.1254 22.1755 13.9446 21.8344 13.8966C20.8537 13.7603 19.8757 13.6086 18.8942 13.48C18.4982 13.4277 18.2231 13.2537 18.0482 12.8869C17.6282 12.0091 17.1885 11.1409 16.7625 10.2649C16.6039 9.94 16.3742 9.72229 15.9979 9.71886C15.6181 9.71629 15.3944 9.93915 15.2367 10.2649C14.8158 11.1331 14.3718 11.9911 13.9629 12.8654C13.7803 13.2554 13.5001 13.4294 13.0852 13.4826C12.0951 13.6094 11.1085 13.762 10.1211 13.9043C9.84935 13.9437 9.65392 14.0911 9.53048 14.3329C9.35819 14.6714 9.42077 15.01 9.71992 15.3057C10.4365 16.0146 11.1557 16.7191 11.8757 17.4237C12.0909 17.6337 12.2323 17.872 12.1792 18.1831C12.0814 18.7609 11.9751 19.3369 11.8749 19.9137C11.7857 20.428 11.6991 20.9431 11.6211 21.4017ZM4 15.9906C4.00257 9.36657 9.38305 3.99401 16.009 4.00001C22.6384 4.00601 28.0026 9.37857 28 16.0086C27.9974 22.6334 22.6161 28.0069 15.991 28C9.36248 27.9931 3.99657 22.6197 4 15.9906Z" />
                  </svg>
                </div>
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  None
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/USD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  USD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly checked />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/BRL.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  BRL
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/INR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  INR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/EUR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  EUR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/RUB.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  RUB
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/NGN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  NGN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/IDR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  IDR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/BDT.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  BDT
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/PHP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  PHP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/VND.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  VND
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/THB.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  THB
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/KZT.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  KZT
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/MAD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  MAD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/ZAR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  ZAR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/PLN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  PLN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/CUP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  CUP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div
                aria-selected="true"
                className="radio btn-like select-item mt-1 flex items-center"
              >
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/KRW.rect.png"
                />

                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  KRW
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/JPY.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  JPY
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/GBP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  GBP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/HRK.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  HRK
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/ISK.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  ISK
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/HUF.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  HUF
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/NOK.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  NOK
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/NZD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  NZD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/ARS.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  ARS
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/MXN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  MXN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/AUD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  AUD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/TRY.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  TRY
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/IRR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  IRR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/AED.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  AED
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/CAD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  CAD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/UAH.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  UAH
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/CZK.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  CZK
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/LKR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  LKR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/ILS.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  ILS
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/EGP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  EGP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/PKR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  PKR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/GHS.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  GHS
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/VEF.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  VEF
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/PEN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  PEN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/RON.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  RON
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/BGN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  BGN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/RSD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  RSD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/CLP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  CLP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/KES.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  KES
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/AZN.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  AZN
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/KGS.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  KGS
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/MDL.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  MDL
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/MYR.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  MYR
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/COP.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  COP
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/XOF.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  XOF
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/XAF.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  XAF
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/UZS.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  UZS
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/UGX.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  UGX
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/TWD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  TWD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/CNY.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  CNY
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item mt-1 flex items-center">
                <img
                  alt="coin"
                  className="size-6"
                  src="https://imgxcut.com/coin/AMD.rect.png"
                />
                <span className="ellipsis w-0 flex-auto text-left ml-2 text-base font-semibold">
                  AMD
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
