import BcTabmenu from "@/components/modules/bc/BcTabmenu";

export default function BcLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="bc-token-container flex flex-col text-base gap-4">
        <div
          className="h-39 relative flex flex-wrap items-center justify-between gap-1 overflow-hidden rounded-lg bg-layer4 p-3 pr-4 sm:pl-18 md:h-32"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(36, 238, 137, 0.1) 0%, rgba(36, 238, 137, 0.1) 24%, rgba(36, 238, 137, 0) 44.44%)",
          }}
        >
          <picture className="absolute -left-3 -top-3 sm:left-0">
            <source
              media="(min-width:640px)"
              srcSet="https://bc.game/modules/wallet2/assets/headerLogopc-Cb9Y7JOi.png"
            />
            <source
              media="(min-width:200px)"
              srcSet="https://bc.game/modules/wallet2/assets/headerLogo-CM6eTfV-.png"
            />
            <img
              alt="logo"
              className="relative w-32 top-[0.7rem] object-contain"
              src="https://bc.game"
            />
          </picture>
          <div className="z-10 flex w-full gap-3 rounded-lg p-3 bg-layer2/20 backdrop-blur-sm sm:w-auto lg:backdrop-filter-none dark:bg-[#00000033]">
            <div className="rounded-full center size-10 bg-alw_dark/50 py-[0.3rem] max-sm:mt-[0.3rem] max-sm:size-12">
              <img
                alt="coin logo"
                className="h-full"
                src="https://bc.game/substation/bc/logo/logo_small_w.png"
              />
            </div>
            <div className="flex-1">
              <div className="text-base font-extrabold leading-5 mb-0.5">
                BC Token
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="flex items-center text-xs text-success">
                  <span className="mr-2 text-primary">$0.00704</span>
                  <div className="icon mr-0.5 size-4! rotate-90">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path
                        clipRule="evenodd"
                        d="M16.9069 25.6438L9.5905 15.58L16.9069 5.51611L10.2572 5.51611L2.9408 15.58L10.2572 25.6438L16.9069 25.6438ZM28.1005 25.6438L20.784 15.58L28.1005 5.51611L21.4508 5.51611L14.1343 15.58L21.4508 25.6438L28.1005 25.6438Z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="mr-2">1.15%</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div>
                    <span className="text-secondary">24h Vol: </span>
                    <span className="text-black">$400.8K</span>
                  </div>
                  <div>
                    <span className="text-secondary">Holders: </span>
                    <span className="text-black">62,358</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-1 sm:w-auto">
            <a
              className="flex-1 sm:min-w-40 sm:flex-none"
              href="/events/bc-token-landing"
            >
              <button
                className="button button-second button-m h-10 w-full gap-1 rounded-lg text-sm text-brand"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgba(35, 238, 136, 0.6) 0%, rgba(35, 238, 136, 0.05) 100%)",
                }}
                type="button"
              >
                <div className="rounded-full center size-4! text-brand">
                  <img
                    alt="coin logo"
                    className="h-full"
                    src="https://bc.game/substation/bc/logo/logo_small_w.png"
                  />
                </div>
                <span> What's $BC</span>
              </button>
            </a>
            <a
              className="flex-1 sm:min-w-40 sm:flex-none"
              href="https://whitepaper.bc.game/bc-white-paper/overview/about-bc.game"
              target="_blank"
            >
              <button
                className="button button-second button-m h-10 w-full gap-1 rounded-lg text-sm text-primary"
                type="button"
              >
                <div className="icon size-5! fill-primary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      d="M24.6981 4.49661L9.59738 4.4969C8.34821 4.4969 7.33174 5.4525 7.33174 6.62724V22.8171H18.2671C19.7352 22.8171 20.9254 23.936 20.9256 25.3164L20.9257 26.0124C20.9257 26.8359 21.6358 27.5034 22.5117 27.5034C23.3875 27.5034 24.0976 26.8357 24.0976 26.0122V6.29271C24.0976 5.64255 24.3157 5.01402 24.6981 4.49661ZM20.9256 9.67369H11.0505C10.4659 9.67369 10.466 10.8039 11.0505 10.8039L20.9256 10.8042C21.5102 10.8042 21.5102 9.67369 20.9256 9.67369ZM20.9256 13.5083H11.0505C10.4659 13.5083 10.466 14.6385 11.0505 14.6385L20.9256 14.6387C21.5102 14.6387 21.5102 13.5083 20.9256 13.5083ZM20.9256 17.3426H11.0505C10.4659 17.3426 10.466 18.4728 11.0505 18.4728L20.9256 18.4731C21.5102 18.4731 21.5102 17.3426 20.9256 17.3426Z"
                      fillRule="evenodd"
                    />
                    <path d="M29.0822 8.33142L25.457 8.33144V6.29273C25.457 5.37232 26.1743 4.58719 27.0902 4.50518C27.6073 4.45822 28.106 4.61246 28.4886 4.94026C28.8655 5.26241 29.0822 5.72184 29.0822 6.20121V8.33142Z" />
                    <path d="M20.2602 27.5033C19.8291 27.051 19.5665 26.4534 19.5665 25.7993L19.5664 25.3732C19.5662 24.6673 18.9577 24.0952 18.207 24.0952H4.61295V25.7993C4.61295 26.739 5.42558 27.5033 6.4253 27.5033H20.2602Z" />
                  </svg>
                </div>
                <span>Whitepaper</span>
              </button>
            </a>
            <a
              className="flex-1 sm:min-w-40 sm:flex-none"
              href="https://solscan.io/token/BCNT4t3rv5Hva8RnUtJUJLnxzeFAabcYp8CghC1SmWin"
              target="_blank"
            >
              <button
                className="button button-second button-m h-10 w-full gap-1 rounded-lg text-sm text-primary"
                type="button"
              >
                <div className="icon size-5! fill-primary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.9914 4.27051H9.00862C7.47797 4.27051 6.19553 5.55295 6.19553 7.08361V24.5827C6.19553 26.1548 7.47797 27.3958 9.00862 27.3958H22.9914C24.5634 27.3958 25.8045 26.1134 25.8045 24.5827V7.08361C25.8045 5.55295 24.522 4.27051 22.9914 4.27051ZM10.6634 21.8524H9.91874C9.58779 21.8524 9.29821 21.5628 9.29821 21.2318C9.29821 20.9009 9.58779 20.6113 9.91874 20.6113H10.6634C10.9943 20.6113 11.2839 20.9009 11.2839 21.2318C11.2839 21.5628 11.0357 21.8524 10.6634 21.8524ZM10.6634 18.5428H9.91874C9.58779 18.5428 9.29821 18.2533 9.29821 17.9223C9.29821 17.5914 9.58779 17.3018 9.91874 17.3018H10.6634C10.9943 17.3018 11.2839 17.5914 11.2839 17.9223C11.2839 18.2533 11.0357 18.5428 10.6634 18.5428ZM10.6634 13.5372H9.91874C9.58779 13.5372 9.29821 13.2476 9.29821 12.9166C9.29821 12.5857 9.58779 12.2961 9.91874 12.2961H10.6634C10.9943 12.2961 11.2839 12.5857 11.2839 12.9166C11.2839 13.2476 11.0357 13.5372 10.6634 13.5372ZM10.6634 10.2277H9.91874C9.58779 10.2277 9.29821 9.93807 9.29821 9.60712C9.29821 9.27617 9.58779 8.98658 9.91874 8.98658H10.6634C10.9943 8.98658 11.2839 9.27617 11.2839 9.60712C11.2839 9.93807 11.0357 10.2277 10.6634 10.2277ZM22.0813 21.8524H13.1455C12.8146 21.8524 12.525 21.5628 12.525 21.2318C12.525 20.9009 12.8146 20.6113 13.1455 20.6113H22.0813C22.4122 20.6113 22.7018 20.9009 22.7018 21.2318C22.7018 21.5628 22.4122 21.8524 22.0813 21.8524ZM22.0813 18.5428H13.1455C12.8146 18.5428 12.525 18.2533 12.525 17.9223C12.525 17.5914 12.8146 17.3018 13.1455 17.3018H22.0813C22.4122 17.3018 22.7018 17.5914 22.7018 17.9223C22.7018 18.2533 22.4122 18.5428 22.0813 18.5428ZM22.0813 13.5372H13.1455C12.8146 13.5372 12.525 13.2476 12.525 12.9166C12.525 12.5857 12.8146 12.2961 13.1455 12.2961H22.0813C22.4122 12.2961 22.7018 12.5857 22.7018 12.9166C22.7018 13.2476 22.4122 13.5372 22.0813 13.5372ZM22.0813 10.2277H13.1455C12.8146 10.2277 12.525 9.93807 12.525 9.60712C12.525 9.27617 12.8146 8.98658 13.1455 8.98658H22.0813C22.4122 8.98658 22.7018 9.27617 22.7018 9.60712C22.7018 9.93807 22.4122 10.2277 22.0813 10.2277Z" />
                  </svg>
                </div>
                Contract
              </button>
            </a>
          </div>
        </div>

        <BcTabmenu />
        {children}
      </div>
    </div>
  );
}

