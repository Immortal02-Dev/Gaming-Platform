export default function LotteryFavourite() {
  return (
    <div className="page-content not-first:relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="min-h-screen">
        <div className="like-box bg-layer2 mt-4 sm:mt-0">
          <section className="sticky sm:top-14 top-0 z-20 bg-layer2">
            <h1 className="text-lg font-extrabold text-primary">
              My Favorites
            </h1>
            <div className="search-box flex flex-col gap-4 justify-between mt-6">
              <div className="search-input flex items-center justify-center h-10 relative">
                <div className="input bg-input_darken placeholder:text-quarterary h-full text-base font-semibold w-full rounded-xl border border-solid border-input">
                  <input placeholder="Search name" />
                  <div className="icon size-6! fill-secondary order-first">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="left-search flex justify-between gap-2 flex-1">
                <button
                  className="button button-m select bg-input_bright w-1/2 rounded-xl border border-solid border-input"
                  type="button"
                >
                  <div className="inline-flex items-center gap-1">
                    <label className="text-primary text-sm font-semibold">
                      All Regions
                    </label>
                  </div>
                  <div className="size-6 ml-auto bg-input_button center rounded-md ">
                    <div className="icon size-4! transition-all -rotate-90">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                      </svg>
                    </div>
                  </div>
                </button>
                <button
                  className="button button-m select bg-input_bright min-w-32 w-1/2 rounded-xl border border-solid border-input"
                  type="button"
                >
                  <label className="text-primary text-sm font-semibold">
                    Sort By: Draw Date
                  </label>
                  <div className="size-6 ml-auto bg-input_button center rounded-md ">
                    <div className="icon size-4! transition-all -rotate-90">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </section>

          <div
            className="favourite-list-box relative mt-4 cursor-pointer pb-4 grid gap-2 grid-cols-[repeat(var(--grid-cols),minmax(0,1fr))]"
            style={{ "--grid-cols": "5" } as React.CSSProperties}
          >
            <section
              className="favouriteSectionItemWrap flex flex-col justify-between h-47 p-3 rounded-xl bg-layer4 overflow-hidden cursor-pointer"
              style={{ pointerEvents: "auto", filter: "initial" }}
            >
              <div className="relative grid grid-cols-2">
                <span className="inline-flex items-center justify-center w-6 h-6 cursor-pointer rounded-lg like_layer">
                  <div className="icon size-4! fill-brand">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z"></path>
                    </svg>
                  </div>
                </span>
                <div className="flex justify-start">
                  <span className="-translate-x-1/2">
                    <section className="relative min-w-6 min-h-6 w-6 h-6 overflow-hidden border border-solid border-third rounded-full">
                      <img
                        className="w-6 min-w-6 absolute"
                        alt=""
                        style={{ left: "-1px", top: "-673px" }}
                        src="/modules/lottery2/assets/countries-BwR1Q6Zz.png"
                      />
                    </section>
                  </span>
                </div>
              </div>
              <div className="draw-title text-primary text-sm font-extrabold flex justify-center text-center">
                <label className="line-clamp-2">Gosloto Russia 5/36</label>
              </div>
              <div className="draw-time text-xs font-semibold text-secondary flex justify-center break-keep border-t border-solid border-third pt-3">
                Next Draw in
                <span className="ml-0.5">
                  <span>00h</span>
                  <span>16m</span>
                  <span>12s</span>
                </span>
              </div>
              <div className="btn-box flex gap-2 ">
                <button
                  className="button button-m min-h-8 h-fit w-1/2 bg-black_alpha5 dark:bg-layer6 text-primary text-sm font-extrabold p-0"
                  type="button"
                >
                  Bet 2 balls
                </button>
                <button
                  className="button button-m min-h-8 h-fit w-1/2 bg-black_alpha5 dark:bg-layer6 text-primary text-sm font-extrabold p-0"
                  type="button"
                >
                  Bet 3 balls
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
