export default function ReferralBanners() {
  return (
    <div className="gap-4 bg-layer2 md:flex">
      <div className="mb-4 flex-1 overflow-hidden rounded-lg bg-layer4">
        <div className="flex flex-wrap">
          <img
            alt="banner_01"
            className="w-3/5"
            src="https://bc.game/modules/bonus2/assets/banner_d1-DfhyqQ2N.gif"
          />
          <img
            alt="banner_02"
            className="w-2/5"
            src="https://bc.game/modules/bonus2/assets/banner_d2-XOsfN5tL.gif"
          />
          <img
            alt="banner_03"
            className="w-full"
            src="https://bc.game/modules/bonus2/assets/banner_d3-DrARZyMG.gif"
          />
        </div>
        <div className="p-4">
          <div className="text-base font-extrabold">Banner Pack</div>
          <div className="text-secondary">
            Multilingual Package including events, animated banners, and more...
          </div>
          <a
            className="center mt-4 w-full"
            href="https://drive.google.com/drive/folders/1Q48CUgrJOAeDGpBqmdHGNwWGxNEdTZzQ?usp=sharing"
            rel="noopener"
            target="_blank"
          >
            <button
              className="button button-brand button-m w-full gap-1"
              type="button"
            >
              <span>Download (200MB)</span>
              <div className="icon size-5! fill-alw_dark">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.0672 12.0871H19.8861V4.31543H12.1144V12.0871H6.93322L16.0002 22.4494L25.0672 12.0871ZM5.63794 23.6545H26.3625V26.245H5.63794V23.6545Z" />
                </svg>
              </div>
            </button>
          </a>
        </div>
      </div>
      <div className="mb-4 flex-1 overflow-hidden rounded-lg" />
    </div>
  );
}
