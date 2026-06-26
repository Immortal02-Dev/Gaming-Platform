import DetailsTab from "@/components/modules/lottery/DetailsTab";
export default function BcDetail() {
  return (
    <div className="relative z-10 w-full px-4 mx-auto max-w-312 page-content">
      <div className="min-h-screen">
        <div className="lottery-box bg-layer2 flex flex-col">
          <div className="sticky top-0 z-40 flex h-20 w-full items-center justify-between gap-2 bg-layer2 py-4 sm:top-15">
            <div className="flex items-center gap-2">
              <section className="relative min-w-12 min-h-12 w-12 h-12 overflow-hidden">
                <img
                  alt=""
                  className="w-12 min-w-12 absolute"
                  src="https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png"
                  style={{
                    top: "-1968px",
                  }}
                />
              </section>
              <h1 className="text-xl font-extrabold text-primary">
                BC Lottery Jackpot
              </h1>
              <button
                className="button button-second button-m center size-8! cursor-pointer rounded-md p-0"
                type="button"
              >
                <div className="icon size-5! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="flex gap-2">
              <section className="banner-instruction flex">
                <div className="how-to-play-box flex gap-2">
                  <button
                    className="button button-second button-m h-8! cursor-pointer rounded-md p-0 sm:w-auto sm:px-2"
                    type="button"
                  >
                    <div className="icon size-5! sm:size-4">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.1681 13.8548H26.9489C27.4334 13.8548 27.8272 14.2476 27.8272 14.7331V14.8706C27.8272 15.3551 27.4344 15.7488 26.9489 15.7488H18.1681C17.6836 15.7488 17.2898 15.356 17.2898 14.8706V14.7331C17.2898 14.2486 17.6827 13.8548 18.1681 13.8548ZM18.1681 5.33398H26.9489C27.4334 5.33398 27.8272 5.72682 27.8272 6.21226V6.34975C27.8272 6.83425 27.4344 7.22802 26.9489 7.22802H18.1681C17.6836 7.22802 17.2898 6.83518 17.2898 6.34975V6.21226C17.2898 5.72776 17.6827 5.33398 18.1681 5.33398ZM4.99682 13.8548H13.7777C14.2622 13.8548 14.6559 14.2476 14.6559 14.7331V14.8706C14.6559 15.3551 14.2631 15.7488 13.7777 15.7488H4.99682C4.51232 15.7488 4.11855 15.356 4.11855 14.8706V14.7331C4.11855 14.2486 4.51138 13.8548 4.99682 13.8548ZM18.1681 11.0152H26.9489C27.4334 11.0152 27.8272 11.408 27.8272 11.8934V12.0309C27.8272 12.5154 27.4344 12.9092 26.9489 12.9092H18.1681C17.6836 12.9092 17.2898 12.5164 17.2898 12.0309V11.8934C17.2898 11.4089 17.6827 11.0152 18.1681 11.0152ZM4.99682 11.0152H13.7777C14.2622 11.0152 14.6559 11.408 14.6559 11.8934V12.0309C14.6559 12.5154 14.2631 12.9092 13.7777 12.9092H4.99682C4.51232 12.9092 4.11855 12.5164 4.11855 12.0309V11.8934C4.11855 11.4089 4.51138 11.0152 4.99682 11.0152ZM18.1681 8.17457H26.9489C27.4334 8.17457 27.8272 8.56741 27.8272 9.05284V9.19034C27.8272 9.67483 27.4344 10.0686 26.9489 10.0686H18.1681C17.6836 10.0686 17.2898 9.67577 17.2898 9.19034V9.05284C17.2898 8.56834 17.6827 8.17457 18.1681 8.17457ZM4.99682 8.17457H13.7777C14.2622 8.17457 14.6559 8.56741 14.6559 9.05284V9.19034C14.6559 9.67483 14.2631 10.0686 13.7777 10.0686H4.99682C4.51232 10.0686 4.11855 9.67577 4.11855 9.19034V9.05284C4.11855 8.56834 4.51138 8.17457 4.99682 8.17457ZM3.24121 17.6419H28.7055C28.7055 18.6876 27.8581 19.535 26.8124 19.535H5.13525C4.08955 19.535 3.24121 18.6876 3.24121 17.6419ZM16.6585 20.3918L20.5382 25.2377C20.8412 25.6165 20.7805 26.1693 20.4016 26.4724C20.2464 26.5968 20.0528 26.665 19.8526 26.665H12.0931C11.6086 26.665 11.2149 26.2722 11.2149 25.7868C11.2149 25.5875 11.2831 25.3939 11.4075 25.2377L15.2873 20.3918C15.5903 20.013 16.1431 19.9522 16.5219 20.2552C16.5724 20.2955 16.6182 20.3413 16.6585 20.3918Z" />
                      </svg>
                    </div>
                    <span className="ml-1 text-sm font-extrabold text-primary">
                      Provably Fair
                    </span>
                  </button>
                  <button
                    className="button button-second button-m h-8! cursor-pointer rounded-md p-0 sm:w-auto sm:px-2"
                    type="button"
                  >
                    <div className="icon size-5! sm:size-4">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
                      </svg>
                    </div>
                    <span className="ml-1 text-sm font-extrabold text-primary">
                      How to play?
                    </span>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="relative flex flex-col items-start gap-2 pb-4">
            <div className="mt-3 flex w-full justify-between gap-2 sm:justify-start">
              <span className="text-sm font-semibold text-secondary">
                Next Draw Time
              </span>
              <span className="text-sm font-semibold text-primary">
                2/10/2026, 3:55:00 PM
              </span>
            </div>
            <div className="mt-3 flex w-full justify-between gap-2 sm:justify-start">
              <span className="text-sm font-semibold text-secondary">
                Next Draw Starts in
              </span>
              <div className="text-sm font-semibold text-primary">
                <span>00d:</span>
                <span>04h:</span>
                <span>54m:</span>
                <span>52s</span>
              </div>
            </div>
            <div className="mt-3 flex h-10 w-full items-center justify-between gap-3 rounded-xl bg-layer4 px-3 sm:w-100">
              <span className="text-sm font-semibold text-secondary">
                Recent winning prize
              </span>
              <span className="text-sm font-extrabold text-brand">
                ₩145,391K
              </span>
            </div>
            <img
              className="absolute right-0 top-8 z-30 h-full"
              src="https://bc.game/substation/bc/lottery/lottery/detail-banner.png"
            />
          </div>
          <div className="h-0 sticky z-20 top- sm:top-35">
            <div className="h-14! bg-layer2" />
          </div>
          <DetailsTab />
        </div>
      </div>
    </div>
  );
}
