import TradingChartGrid from "@/components/modules/trading/TradingChartGrid";

export default function TradingTap() {
  return (
    <div className="relative z-10 w-full px-4 sm:px-0 page-content">
      <div
        className="relative w-full min-h-[80vh] pt-0 md:pt-4 sm:px-4 mx-auto"
        style={{
          maxWidth: "1830px",
        }}
      >
        <div className="detrade-light detrade theme-bold s768 s1024 s1366 s1440">
          <div className="space-y-0.5">
            <div
              className="flex justify-start items-center flex-wrap leading-none px-3 s768:py-3 h-auto md:h-16 gap-x-2 bg-layer3 rounded-2"
              id="trading-pair"
            >
              <button className="detrade-button hoverable bg-transparent shadow-none! p-0 text-primary opacity-10 hidden! md:flex!">
                <svg
                  className="detrade-icon text-current hover:text-current size-5"
                  fill="none"
                  height="1em"
                  viewBox="0 0 14 14"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.45011 0.944101C6.69558 0.522658 7.30442 0.522659 7.54989 0.944101L9.12184 3.64297C9.21176 3.79735 9.36243 3.90682 9.53705 3.94463L12.5896 4.60565C13.0662 4.70887 13.2544 5.28791 12.9294 5.6516L10.8484 7.98061C10.7294 8.11383 10.6718 8.29096 10.6898 8.46871L11.0044 11.5761C11.0536 12.0613 10.561 12.4192 10.1147 12.2225L7.25661 10.9631C7.09312 10.891 6.90688 10.891 6.74339 10.9631L3.8853 12.2225C3.439 12.4192 2.94643 12.0613 2.99556 11.5761L3.31018 8.46871C3.32818 8.29096 3.27063 8.11383 3.15159 7.98061L1.07057 5.6516C0.745611 5.28791 0.933754 4.70887 1.41042 4.60565L4.46296 3.94463C4.63757 3.90682 4.78824 3.79735 4.87816 3.64297L6.45011 0.944101Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div
                className="flex items-center select-none auto-ref87cc3dlpcd4 detrade-popover-trigger cursor-pointer"
                id="trading-pair-trigger"
              >
                <span className="block overflow-hidden shrink-0 rounded-full size-5 s768:size-7 mr-2 lazy-load-image-background  lazy-load-image-loaded">
                  <img
                    className="object-cover size-full"
                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                  />
                </span>
                <div className="mr-1 md:text-2xl">
                  STONKS
                  <span className="text-secondary">/USDT</span>
                </div>
                <svg
                  className="detrade-icon text-primary transition-all size-4 s768:size-6 rotate-90"
                  fill="none"
                  height="1em"
                  viewBox="0 0 14 14"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex items-center text-down">
                <span className="text-lg md:text-[26px] font-700 mr-2">
                  894.71
                </span>
                <svg
                  className="transition-none rotate-180 text-down size-4 hover:text-current"
                  fill="none"
                  height="24"
                  viewBox="0 0 23 24"
                  width="23"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3998 6.24695L5.60645 12.0402L6.92637 13.3602L11.3998 8.88681L15.8731 13.3602L17.1931 12.0402L11.3998 6.24695ZM11.3998 11.5202L5.60645 17.3134L6.92637 18.6335L11.3998 14.1601L15.8731 18.6335L17.1931 17.3134L11.3998 11.5202Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="md:text-base font-600">-8.14%</span>
              </div>
              <button className="detrade-button hoverable bg-transparent shadow-none! p-0 detrade-help ml-auto s768:order-last">
                <svg
                  className="detrade-icon size-4.5"
                  fill="currentColor"
                  height="1em"
                  viewBox="0 0 20 20"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.243 8.255C6.406 8.255 6.563 8.32 6.678 8.435 6.793 8.551 6.858 8.707 6.858 8.87 6.858 9.033 6.793 9.19 6.678 9.305 6.563 9.421 6.406 9.485 6.243 9.485H4.468C4.305 9.485 4.148 9.421 4.033 9.305 3.918 9.19 3.853 9.033 3.853 8.87 3.853 8.707 3.918 8.551 4.033 8.435 4.148 8.32 4.305 8.255 4.468 8.255H6.243ZM15.555 8.255C15.718 8.255 15.874 8.32 15.99 8.435 16.105 8.551 16.17 8.707 16.17 8.87 16.17 9.033 16.105 9.19 15.99 9.305 15.874 9.421 15.718 9.485 15.555 9.485H13.781C13.617 9.485 13.461 9.421 13.346 9.305 13.23 9.19 13.165 9.033 13.165 8.87 13.165 8.707 13.23 8.551 13.346 8.435 13.461 8.32 13.617 8.255 13.781 8.255H15.555ZM7.371 5.579C7.534 5.579 7.691 5.644 7.806 5.759 7.922 5.875 7.986 6.031 7.986 6.194 7.986 6.358 7.922 6.514 7.806 6.629 7.691 6.745 7.534 6.81 7.371 6.81H4.469C4.306 6.81 4.149 6.745 4.034 6.629 3.918 6.514 3.854 6.358 3.854 6.194 3.854 6.031 3.918 5.875 4.034 5.759 4.149 5.644 4.306 5.579 4.469 5.579H7.371ZM15.555 5.579C15.718 5.579 15.874 5.644 15.99 5.759 16.105 5.875 16.17 6.031 16.17 6.194 16.17 6.358 16.105 6.514 15.99 6.629 15.874 6.745 15.718 6.81 15.555 6.81H12.652C12.489 6.81 12.333 6.745 12.217 6.629 12.102 6.514 12.037 6.358 12.037 6.194 12.037 6.031 12.102 5.875 12.217 5.759 12.333 5.644 12.489 5.579 12.652 5.579H15.555Z" />
                  <path
                    clipRule="evenodd"
                    d="M7.31002 2.14648C8.18875 2.14648 9.01687 2.46652 9.64042 3.04771C9.77679 3.17478 9.90181 3.3135 10.0141 3.4623C10.1256 3.31548 10.2494 3.17842 10.3842 3.05264C11.009 2.46898 11.8367 2.14736 12.7151 2.14736H17.1914C18.1886 2.14736 19 2.92364 19 3.87777V14.9913C19 15.9454 18.1886 16.7215 17.1914 16.7215H11.6086C11.5873 16.7206 11.5661 16.7246 11.5466 16.733C11.527 16.7415 11.5096 16.7544 11.4958 16.7706L11.1278 17.2878C10.8756 17.6421 10.4587 17.8537 10.0127 17.8537C9.56661 17.8537 9.14974 17.6428 8.89754 17.2876L8.52935 16.7704C8.51551 16.7542 8.49816 16.7414 8.47865 16.733C8.45913 16.7245 8.43796 16.7205 8.4167 16.7214L2.80861 16.7516C1.81142 16.7516 1 15.9755 1 15.0212V3.90694C1 2.95264 1.81142 2.17671 2.80861 2.17671L7.31002 2.14648ZM12.7151 3.37671C11.5641 3.37671 10.6278 4.23365 10.6278 5.28673V13.3887C10.6278 13.5518 10.563 13.7083 10.4476 13.8236C10.3323 13.939 10.1758 14.0038 10.0127 14.0038C9.84952 14.0038 9.69304 13.939 9.57768 13.8236C9.46232 13.7083 9.39754 13.5518 9.39754 13.3887V5.28673C9.39754 4.78128 9.18664 4.30571 8.80176 3.94771C8.40668 3.57865 7.87698 3.37671 7.31002 3.37671L2.80861 3.40729C2.48963 3.40729 2.23023 3.63155 2.23023 3.90729V15.0212C2.23023 15.2969 2.48963 15.5214 2.80861 15.5214L8.4167 15.4911C8.86274 15.4911 9.27961 15.702 9.53181 16.057L9.89982 16.5744C9.93216 16.6198 9.99438 16.6235 10.0127 16.6235C10.0309 16.6235 10.093 16.6198 10.1253 16.5744L10.4944 16.057C10.7466 15.7027 11.1633 15.4911 11.6095 15.4911H17.1914C17.5104 15.4911 17.7698 15.2669 17.7698 14.9911V3.87689C17.7698 3.60114 17.5104 3.37671 17.1914 3.37671H12.7151Z"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-col md:flex-row! gap-0.5">
              <div
                className="z-10 inset-y-0 left-0 relative hidden md:block"
                style={{
                  position: "absolute",
                }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 left-full z-20 rotate-90">
                  <button className="detrade-button hoverable bg-transparent h-8 rounded-2 text-12 s768:h-10 s768:text-14 w-8 s768:w-10 s768:px-0 p-0 shadow-none!">
                    <svg
                      fill="none"
                      height="24"
                      viewBox="0 0 23 24"
                      width="23"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3998 6.24695L5.60645 12.0402L6.92637 13.3602L11.3998 8.88681L15.8731 13.3602L17.1931 12.0402L11.3998 6.24695ZM11.3998 11.5202L5.60645 17.3134L6.92637 18.6335L11.3998 14.1601L15.8731 18.6335L17.1931 17.3134L11.3998 11.5202Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col flex-1 detrade-card">
                <div className="flex flex-wrap items-center justify-between min-h-7 gap-1 px-4 s768:px-0">
                  <div className="flex items-center flex-nowrap gap-1 whitespace-nowrap text-12">
                    <svg
                      className="detrade-icon auto-ref577j45396ms detrade-popover-trigger cursor-pointer size-4"
                      fill="none"
                      height="1em"
                      viewBox="0 0 12 12"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 11C3.23857 11 1 8.7614 1 6C1 3.23857 3.23857 1 6 1C8.7614 1 11 3.23857 11 6C11 8.7614 8.7614 11 6 11ZM5.5 5.5V8.5H6.5V5.5H5.5ZM5.5 3.5V4.5H6.5V3.5H5.5Z"
                        fill="currentColor"
                      />
                    </svg>
                    <div className="text-secondary font-500">Round ends in</div>
                    <div className="flex items-center gap-0.5 text-primary">
                      <span>15</span>
                      <span>:</span>
                      <span>07</span>
                      <span>:</span>
                      <span>41</span>
                    </div>
                    <button className="detrade-button hoverable bg-transparent shadow-none!">
                      <svg
                        className="detrade-icon size-4.5 mr-1"
                        fill="none"
                        height="1em"
                        viewBox="0 0 21 21"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.17957 13.3421C3.71289 13.3421 2.52637 12.1227 2.52637 10.6148C2.52637 10.5077 2.60876 10.4253 2.70764 10.4253H7.65149C7.75037 10.4253 7.83276 10.5077 7.83276 10.6065C7.83276 12.1227 6.638 13.3421 5.17957 13.3421ZM7.81628 17.8822C7.81628 17.2066 8.34363 16.6628 9.00281 16.6628H10.0987V6.33835H5.48444L7.43726 9.52713C7.53613 9.69193 7.48669 9.90616 7.33014 10.005C7.17358 10.1039 6.96759 10.0545 6.86871 9.89792L5.17957 7.12936L3.48218 9.89792C3.41626 10.005 3.30914 10.0627 3.19379 10.0627C3.13611 10.0627 3.07019 10.0462 3.01251 10.0133C2.85596 9.9144 2.80652 9.70016 2.9054 9.53537L4.85822 6.34659H4.8335C4.5451 6.34659 4.31439 6.10764 4.31439 5.811C4.31439 5.51437 4.5451 5.27542 4.8335 5.27542H8.66498C8.87921 4.95407 9.20056 4.70688 9.57135 4.59152C9.62079 3.9653 10.1317 3.47916 10.7496 3.47916C11.3676 3.47916 11.8785 3.9653 11.9279 4.59152C12.2987 4.70688 12.6201 4.95407 12.8343 5.27542H16.6658C16.9542 5.27542 17.1849 5.51437 17.1849 5.811C17.1849 6.10764 16.9542 6.34659 16.6658 6.34659H16.6411L18.5939 9.53537C18.6927 9.70016 18.6433 9.9144 18.4868 10.0133C18.3302 10.1122 18.1242 10.0627 18.0253 9.90616L16.3527 7.12936L14.6635 9.89792C14.5976 10.005 14.4905 10.0627 14.3751 10.0627C14.3174 10.0627 14.2515 10.0462 14.1938 10.0133C14.0373 9.9144 13.9879 9.70016 14.0867 9.53537L16.0396 6.34659H11.4335V16.671H12.5294C13.1804 16.671 13.7159 17.2148 13.7159 17.8905H7.81628V17.8822ZM16.3527 13.3421C14.8942 13.3421 13.6995 12.1144 13.6995 10.6065C13.6995 10.5077 13.7819 10.4253 13.8807 10.4253H18.8246C18.9235 10.4253 19.0059 10.5077 19.0059 10.6065C19.0059 12.1227 17.8193 13.3421 16.3527 13.3421Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="text-10 s768:text-12 font-500">
                        Verify fairness
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <button className="detrade-button hoverable bg-transparent shadow-none! p-0">
                      <svg
                        className="size-4.5 text-secondary"
                        fill="none"
                        height="1em"
                        viewBox="0 0 20 20"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.4052 9.39628H17.0265C16.9918 9.39632 16.9572 9.39934 16.9231 9.40531C16.6369 6.04283 13.9606 3.36248 10.6001 3.07091C10.6046 3.04146 10.6068 3.01173 10.6067 2.98195V1.60242C10.6067 1.44265 10.5433 1.28942 10.4303 1.17644C10.3173 1.06347 10.1641 1 10.0043 1C9.84455 1 9.69132 1.06347 9.57834 1.17644C9.46537 1.28942 9.4019 1.44265 9.4019 1.60242V2.98115C9.40194 3.01011 9.40402 3.03903 9.40813 3.06769C6.0368 3.34621 3.34721 6.02737 3.05565 9.39507C3.031 9.39195 3.00619 9.39034 2.98135 9.39025H1.60242C1.44265 9.39025 1.28942 9.45372 1.17644 9.5667C1.06347 9.67967 1 9.8329 1 9.99267C1 10.1524 1.06347 10.3057 1.17644 10.4186C1.28942 10.5316 1.44265 10.5951 1.60242 10.5951H2.98135C3.00558 10.5951 3.0298 10.5935 3.05384 10.5905C3.33557 13.9668 6.02837 16.658 9.40531 16.9385C9.40175 16.9652 9.39994 16.992 9.39989 17.0189V18.3976C9.39989 18.5574 9.46336 18.7106 9.57634 18.8236C9.68931 18.9365 9.84254 19 10.0023 19C10.1621 19 10.3153 18.9365 10.4283 18.8236C10.5413 18.7106 10.6047 18.5574 10.6047 18.3976V17.0181C10.6047 16.9907 10.6028 16.9634 10.5991 16.9363C13.963 16.6442 16.6415 13.959 16.9245 10.5923C16.9584 10.5981 16.9927 10.601 17.0271 10.6011H18.4058C18.4849 10.6011 18.5633 10.5855 18.6364 10.5553C18.7094 10.525 18.7759 10.4806 18.8318 10.4247C18.8877 10.3687 18.9321 10.3023 18.9624 10.2292C18.9927 10.1561 19.0082 10.0778 19.0082 9.99869C19.0082 9.91953 18.9926 9.84115 18.9623 9.76802C18.932 9.69489 18.8876 9.62846 18.8316 9.57251C18.7756 9.51656 18.7091 9.4722 18.6359 9.44196C18.5628 9.41172 18.4844 9.3962 18.4052 9.39628ZM15.2927 12.2429C14.7373 13.5637 13.7108 14.6309 12.4127 15.2373C11.1145 15.8438 9.63734 15.9462 8.26792 15.5248C6.8985 15.1033 5.73457 14.1879 5.00211 12.9565C4.26966 11.725 4.02095 10.2654 4.30427 8.86083C4.58759 7.4563 5.38273 6.20718 6.5353 5.35598C7.68787 4.50478 9.11563 4.11225 10.5414 4.25461C11.9671 4.39696 13.289 5.06404 14.2505 6.12633C15.2121 7.18861 15.7445 8.5703 15.7445 10.0031C15.7454 10.7725 15.5914 11.5342 15.2919 12.2429H15.2927Z"
                          fill="currentColor"
                        />
                        <path
                          d="M10 1C10.5523 1 11 1.44772 11 2V3C11 3.024 10.9978 3.04771 10.9961 3.07129C14.0645 3.50848 16.4901 5.93471 16.9277 9.00293C16.9516 9.00122 16.9757 9 17 9H18C18.5523 9 19 9.44771 19 10C19 10.5523 18.5523 11 18 11H17C16.9757 11 16.9516 10.9978 16.9277 10.9961C16.4904 14.0647 14.0647 16.4904 10.9961 16.9277C10.9978 16.9516 11 16.9757 11 17V18C11 18.5523 10.5523 19 10 19C9.44771 19 9 18.5523 9 18V17C9 16.9757 9.00122 16.9516 9.00293 16.9277C5.93471 16.4901 3.50848 14.0645 3.07129 10.9961C3.04771 10.9978 3.024 11 3 11H2C1.44772 11 1 10.5523 1 10C1 9.44771 1.44772 9 2 9H3C3.02398 9 3.04773 9.00127 3.07129 9.00293C3.50885 5.93497 5.93497 3.50885 9.00293 3.07129C9.00127 3.04773 9 3.02398 9 3V2C9 1.44772 9.44771 1 10 1ZM10 4.5C6.96243 4.5 4.5 6.96243 4.5 10C4.5 13.0376 6.96243 15.5 10 15.5C13.0376 15.5 15.5 13.0376 15.5 10C15.5 6.96243 13.0376 4.5 10 4.5ZM9.98926 6.45996C10.4544 6.46002 10.915 6.5515 11.3447 6.72949C11.7746 6.90756 12.1651 7.16902 12.4941 7.49805C12.8231 7.82704 13.0837 8.21763 13.2617 8.64746C13.4397 9.07726 13.5322 9.53773 13.5322 10.0029C13.5323 10.4682 13.4398 10.9295 13.2617 11.3594C13.0837 11.7891 12.8231 12.1799 12.4941 12.5088C12.1652 12.8377 11.7745 13.0983 11.3447 13.2764C10.915 13.4544 10.4544 13.5468 9.98926 13.5469C9.52396 13.5469 9.06269 13.4544 8.63281 13.2764C8.20304 13.0983 7.81234 12.8377 7.4834 12.5088C7.15448 12.1798 6.89386 11.7891 6.71582 11.3594C6.53778 10.9295 6.44626 10.4682 6.44629 10.0029C6.44629 9.53773 6.53782 9.07726 6.71582 8.64746C6.89383 8.21764 7.15447 7.82704 7.4834 7.49805C7.8124 7.16902 8.20294 6.90756 8.63281 6.72949C9.06269 6.55142 9.52396 6.45996 9.98926 6.45996Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <button className="detrade-button hoverable bg-transparent shadow-none! p-0 auto-refs1ga3t9doh4 detrade-popover-trigger cursor-pointer">
                      <svg
                        className="detrade-icon size-4.5"
                        fill="none"
                        height="1em"
                        viewBox="0 0 20 20"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          clipRule="evenodd"
                          d="M10.0782 7.34493C11.5886 7.34493 12.813 8.5694 12.8131 10.0798C12.8131 11.5902 11.5886 12.8146 10.0782 12.8146C8.56799 12.8144 7.34337 11.59 7.34337 10.0798C7.34342 8.56954 8.56802 7.34516 10.0782 7.34493ZM10.0782 8.71235C9.32323 8.71258 8.71084 9.32475 8.71079 10.0798C8.71079 10.8348 9.3232 11.447 10.0782 11.4472C10.8334 11.4472 11.4456 10.835 11.4456 10.0798C11.4456 9.32461 10.8334 8.71235 10.0782 8.71235Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                        <path
                          clipRule="evenodd"
                          d="M12.3131 1.81436C12.465 1.61188 12.7177 1.4924 12.9594 1.56758C13.5284 1.74458 14.0854 1.98216 14.6228 2.2812C15.1504 2.57421 15.6334 2.91344 16.0703 3.29074C16.2709 3.46417 16.2959 3.75838 16.1867 4.00009C16.0469 4.30986 15.9664 4.64206 15.9517 4.97972C15.9305 5.46859 16.0473 5.9501 16.2893 6.36958C16.5312 6.78883 16.8887 7.13036 17.3223 7.35668C17.6224 7.51329 17.9515 7.61121 18.2902 7.64512C18.5536 7.6717 18.7957 7.83917 18.8457 8.09915C19.071 9.26862 19.0492 10.4787 18.7827 11.6555C18.7269 11.9021 18.4985 12.062 18.2475 12.0924C17.8979 12.1347 17.5558 12.2434 17.2422 12.414C16.8009 12.6541 16.4319 13.0071 16.1761 13.4342C15.9202 13.8616 15.7872 14.3473 15.7925 14.8358C15.7962 15.1713 15.8649 15.4996 15.9934 15.8037C16.0955 16.0454 16.0701 16.3359 15.8727 16.5088C14.9457 17.3207 13.8657 17.944 12.6987 18.3399C12.4505 18.424 12.1871 18.301 12.0289 18.092C11.8296 17.8284 11.5788 17.6049 11.2897 17.4339C10.8691 17.1853 10.3829 17.0573 9.88485 17.0654C9.3868 17.0735 8.89585 17.2163 8.46722 17.4788C8.16302 17.6651 7.89857 17.9067 7.68736 18.1882C7.53537 18.3907 7.28282 18.5091 7.04104 18.4339C6.46202 18.2536 5.90435 18.0157 5.3777 17.7224C4.86024 17.4352 4.37513 17.0968 3.93016 16.7128C3.72914 16.5394 3.70446 16.2444 3.81371 16.0024C3.95355 15.6927 4.03404 15.3604 4.04874 15.0228C4.06996 14.5339 3.95313 14.0524 3.71116 13.6329C3.46926 13.2137 3.11164 12.8722 2.67811 12.6458C2.37801 12.4892 2.04896 12.3924 1.71024 12.3585C1.44668 12.332 1.20482 12.1635 1.15472 11.9034C0.92949 10.7339 0.950182 9.52381 1.21668 8.347C1.27256 8.10027 1.50183 7.94044 1.75297 7.91006C2.10257 7.86779 2.44462 7.75908 2.75824 7.58851C3.19948 7.34838 3.56864 6.99544 3.8244 6.56828C4.08019 6.14102 4.21312 5.65614 4.20792 5.16774C4.20428 4.83194 4.13463 4.50313 4.00601 4.1988C3.90388 3.95713 3.92946 3.66665 4.12672 3.49372C5.05376 2.68168 6.13462 2.0585 7.30171 1.66266C7.54985 1.57866 7.81341 1.70158 7.97153 1.9105C8.17096 2.17415 8.42156 2.39863 8.71079 2.56964C9.13126 2.81816 9.61769 2.94523 10.1156 2.93714C10.6134 2.929 11.1037 2.78596 11.5322 2.52371C11.8365 2.33736 12.1018 2.09591 12.3131 1.81436ZM13.4188 3.67747C13.2284 3.58283 13.0029 3.62278 12.8334 3.75118C12.0421 4.35083 11.0764 4.68671 10.0857 4.70196C9.10069 4.71798 8.15161 4.41576 7.38183 3.84733C7.20798 3.71893 6.97747 3.68139 6.78572 3.78109C6.59277 3.88142 6.40411 3.99027 6.22059 4.10692C6.03852 4.22284 5.95612 4.44045 5.98022 4.65496C6.08758 5.60624 5.87389 6.57983 5.36702 7.42506C4.8584 8.27629 4.08412 8.94416 3.16846 9.32983C2.97257 9.41243 2.82582 9.58879 2.81272 9.80095C2.80046 10.0027 2.79666 10.2052 2.80204 10.4067C2.80802 10.6305 2.96393 10.8177 3.17167 10.9013C4.06269 11.26 4.80507 11.8984 5.28155 12.7249C5.76882 13.5689 5.93931 14.5309 5.80716 15.464C5.77567 15.6863 5.86022 15.9153 6.0518 16.0323C6.22358 16.1372 6.39997 16.235 6.58061 16.325C6.77115 16.42 6.99741 16.3799 7.1671 16.2513C7.95822 15.6518 8.92316 15.3159 9.91369 15.3005C10.8988 15.2845 11.8488 15.5866 12.6186 16.1552C12.7925 16.2836 13.023 16.3211 13.2147 16.2214C13.4076 16.1211 13.5964 16.0122 13.7799 15.8956C13.9618 15.7796 14.0444 15.562 14.0202 15.3476C13.9129 14.3964 14.1256 13.4226 14.6324 12.5775C15.1411 11.7261 15.9161 11.0573 16.832 10.6716C17.0277 10.589 17.1748 10.4136 17.1877 10.2016C17.2001 9.99964 17.2039 9.79745 17.1984 9.59584C17.1923 9.37219 17.0363 9.18596 16.8288 9.10228C15.9375 8.74354 15.1943 8.10434 14.7178 7.27763C14.2305 6.43364 14.0611 5.47162 14.1933 4.53852C14.2247 4.31628 14.1402 4.08717 13.9487 3.97018C13.7768 3.86521 13.5995 3.76757 13.4188 3.67747Z"
                          fill="currentColor"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="relative select-none bg-layer3" id="chart-view">
                  <TradingChartGrid />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div
                  className="detrade-scroll-container relative detrade-table overflow-auto overscroll-auto detrade-card flex-1 hidden md:flex"
                  dir="ltr"
                  style={
                    {
                      ["--radix-scroll-area-corner-height" as any]: "0px",
                      ["--radix-scroll-area-corner-width" as any]: "0px",
                      position: "relative",
                    } as React.CSSProperties
                  }
                >
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "[data-radix-scroll-area-viewport] {  scrollbar-width: none;  -ms-overflow-style: none;  -webkit-overflow-scrolling: touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar {  display: none;}:where([data-radix-scroll-area-viewport]) {  display: flex;  flex-direction: column;  align-items: stretch;}:where([data-radix-scroll-area-content]) {  grow: 1;}",
                    }}
                  />
                  <div
                    className="detrade-scroll-viewport w-full"
                    data-radix-scroll-area-viewport=""
                    style={{
                      overflow: "scroll",
                    }}
                  >
                    <div
                      data-radix-scroll-area-content=""
                      style={{
                        minWidth: "fit-content",
                      }}
                    >
                      <table className="w-full text-primary font-500 text-12 leading-7">
                        <thead className="relative z-10 bg-inherit">
                          <tr className="text-secondary normal-case whitespace-nowrap">
                            <th
                              align="left"
                              className="font-600 py-1 first:pl-1 last:pr-1 pl-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Trader
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-1 first:pl-1 last:pr-1 px-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Multiplier
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-1 first:pl-1 last:pr-1 pr-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Amount
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-inherit">
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">3.05x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">2.72x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">4.4x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">5.26x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">5.39x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">2.76x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">4.87x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">3.19x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-1 first:pl-1 last:pr-1 pl-3 first:rounded-l last:rounded-r truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5 max-w-36 text-secondary">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 px-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">8.92x</span>
                            </td>
                            <td
                              align="right"
                              className="py-1 first:pl-1 last:pr-1 pr-3 first:rounded-l last:rounded-r truncate"
                            >
                              <span className="text-secondary">NGN 138.89</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="detrade-form-item detrade-card s768:w-96"
                  id="tap-trading-available-balance"
                >
                  <div
                    className="flex items-start flex-wrap gap-y-1 gap-x-2.5"
                    id="available-balance-input"
                  >
                    <div className="detrade-form-item w-full">
                      <label
                        className="mb-2 leading-4 text-secondary text-12 font-500 max-w-full block"
                        htmlFor=":ro9:"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="auto-refcqtr8817jpk detrade-popover-trigger cursor-pointer text-secondary border-b border-second border-dotted">
                              Amount(KRWFIAT)
                            </div>
                            <div className="text-12 text-secondary font-600 truncate">
                              ≈$0.10
                            </div>
                          </div>
                        </div>
                      </label>
                      <div className="detrade-input relative flex flex-nowrap items-center rounded-2 px-3 shadow-sm font-700 transition-all border-input h-10 text-12 s768:h-10 s768:text-14 py-0.75 pr-0.75 grow-max gap-1 shrink-0 min-w-52 text-primary bg-layer5 border-0">
                        <label
                          className="rounded-full shrink-0 size-5 bg-contain"
                          htmlFor=":ro9:"
                          style={{
                            backgroundImage:
                              'url("https://d1yfjv8uvrbjad.cloudfront.net/icons/KRWFIAT@3x.png")',
                          }}
                        />
                        <input
                          autoComplete="off"
                          className="h-full flex-1 w-0 basis-0 placeholder:text-quarterary placeholder:font-500 bg-transparent outline-none caret-brand"
                          defaultValue="147.05882"
                          id=":ro9:"
                          inputMode="decimal"
                          maxLength={12}
                          type="text"
                        />
                        <button className="detrade-button hoverable hover:text-primary hover:darkness h-full bg-layer6 text-secondary text-12 font-600 w-10 px-0">
                          1/2
                        </button>
                        <button className="detrade-button hoverable hover:text-primary hover:darkness h-full bg-layer6 text-secondary text-12 font-600 w-10">
                          2x
                        </button>
                      </div>
                    </div>
                    <div className="flex grow justify-between gap-2">
                      <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                        <div className="flex items-baseline text-14 s1366:text-16">
                          <span className="text-10 s768:text-12">$</span>
                          <span>5</span>
                        </div>
                      </button>
                      <button className="detrade-button hoverable bg-layer5 hover:text-primary hover:darkness h-10 s768:h-12 px-4 rounded-2 text-14 s768:text-16 flex-1 shrink-0 s768:min-w-12 s768:px-2 text-secondary border-thirdly">
                        <div className="flex items-baseline text-14 s1366:text-16">
                          <span className="text-10 s768:text-12">$</span>
                          <span>10</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="space-y-3 detrade-card"
              data-orientation="horizontal"
              dir="ltr"
            >
              <div className="detrade-scroll-list relative flex overflow-x-auto no-scrollbar select-none rounded-none bg-inherit">
                <div
                  aria-orientation="horizontal"
                  className="relative text-14 leading-4 text-secondary font-500 rounded-none bg-inherit min-h-9 s768:min-h-10 flex grow justify-between s768:justify-start gap-2 border-b border-layer5 s768:gap-12"
                  data-orientation="horizontal"
                  role="tablist"
                  style={{
                    outline: "none",
                  }}
                  tabIndex={0}
                >
                  <button
                    aria-controls="radix-:roc:-content-0"
                    aria-selected="false"
                    className="detrade-button bg-transparent shadow-none! relative outline-none transition-colors duration-300 text-tertiary z-20 font-500 px-1 py-3"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="inactive"
                    id="radix-:roc:-trigger-0"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    Positions
                  </button>
                  <button
                    aria-controls="radix-:roc:-content-1"
                    aria-selected="false"
                    className="detrade-button bg-transparent shadow-none! relative outline-none transition-colors duration-300 text-tertiary z-20 font-500 px-1 py-3"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="inactive"
                    id="radix-:roc:-trigger-1"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    History
                  </button>
                  <button
                    aria-controls="radix-:roc:-content-2"
                    aria-selected="true"
                    className="detrade-button bg-transparent shadow-none! relative outline-none transition-colors duration-300 z-10 text-primary font-700 px-1 py-3"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="active"
                    id="radix-:roc:-trigger-2"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    <div className="absolute -bottom-px z-10 inset-x-0 h-0.5 bg-brand" />
                    Live trade
                  </button>
                  <button
                    aria-controls="radix-:roc:-content-3"
                    aria-selected="false"
                    className="detrade-button bg-transparent shadow-none! relative outline-none transition-colors duration-300 text-tertiary z-20 font-500 px-1 py-3"
                    data-orientation="horizontal"
                    data-radix-collection-item=""
                    data-state="inactive"
                    id="radix-:roc:-trigger-3"
                    role="tab"
                    tabIndex={-1}
                    type="button"
                  >
                    Leaderboard
                  </button>
                </div>
                <button className="detrade-button shadow-none! sticky z-30 w-8 shrink-0 self-stretch -ml-8! bg-inherit shadow-r rounded-none opacity-0 pointer-events-none left-0 rotate-180 -order-1">
                  <svg
                    className="detrade-icon size-7"
                    fill="none"
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button className="detrade-button shadow-none! sticky z-30 w-8 shrink-0 self-stretch -ml-8! bg-inherit shadow-r rounded-none opacity-0 pointer-events-none right-0">
                  <svg
                    className="detrade-icon size-7"
                    fill="none"
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18205 7L5 10.1113L5.90897 11L10 7L5.90897 3L5 3.88875L8.18205 7Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div
                aria-labelledby="radix-:roc:-trigger-0"
                className="relative min-h-50"
                data-orientation="horizontal"
                data-state="inactive"
                hidden
                id="radix-:roc:-content-0"
                role="tabpanel"
                tabIndex={0}
              />
              <div
                aria-labelledby="radix-:roc:-trigger-1"
                className="relative min-h-50"
                data-orientation="horizontal"
                data-state="inactive"
                hidden
                id="radix-:roc:-content-1"
                role="tabpanel"
                tabIndex={0}
              />
              <div
                aria-labelledby="radix-:roc:-trigger-2"
                data-orientation="horizontal"
                data-state="active"
                id="radix-:roc:-content-2"
                role="tabpanel"
                tabIndex={0}
              >
                <div
                  className="detrade-scroll-container relative flex detrade-table overflow-auto overscroll-auto"
                  dir="ltr"
                  style={
                    {
                      ["--radix-scroll-area-corner-height" as any]: "0px",
                      ["--radix-scroll-area-corner-width" as any]: "0px",
                      position: "relative",
                    } as React.CSSProperties
                  }
                >
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "[data-radix-scroll-area-viewport] {  scrollbar-width: none;  -ms-overflow-style: none;  -webkit-overflow-scrolling: touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar {  display: none;}:where([data-radix-scroll-area-viewport]) {  display: flex;  flex-direction: column;  align-items: stretch;}:where([data-radix-scroll-area-content]) {  grow: 1;}",
                    }}
                  />
                  <div
                    className="detrade-scroll-viewport w-full"
                    data-radix-scroll-area-viewport=""
                    style={{
                      overflow: "scroll",
                    }}
                  >
                    <div
                      data-radix-scroll-area-content=""
                      style={{
                        minWidth: "fit-content",
                      }}
                    >
                      <table className="w-full text-primary font-500 text-13 leading-6">
                        <thead className="relative z-10 bg-inherit">
                          <tr className="text-secondary normal-case whitespace-nowrap">
                            <th
                              align="left"
                              className="font-600 py-2 first:pl-2 last:pr-2 pl-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Trader
                              </div>
                            </th>
                            <th
                              align="left"
                              className="font-600 py-2 first:pl-2 last:pr-2 pl-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Symbol
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 px-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Currency
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Amount
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Multiplier
                              </div>
                            </th>
                            <th
                              align="right"
                              className="font-600 py-2 first:pl-2 last:pr-2 pr-3"
                              style={{
                                minWidth: "1px",
                              }}
                            >
                              <div className="items-center gap-1 inline-flex">
                                Profit
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-inherit">
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2.72x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5.26x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              5.39x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2.76x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-up">244.444</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              4.87x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              3.19x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              8.92x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              4.81x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2.76x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-up">244.444</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background ">
                                  <span
                                    className="object-cover size-full"
                                    style={{
                                      display: "inline-block",
                                    }}
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              7.17x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              6.88x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/41618295/s"
                                  />
                                </span>
                                <div className="truncate">Malaysia411</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              7.24x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-up">866.667</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2.19x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              2.47x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              8.02x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              8.02x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              1.79x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-up">109.722</div>
                            </td>
                          </tr>
                          <tr className="bg-inherit">
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center  s1366:max-w-50 gap-1.5">
                                <span className="block overflow-hidden shrink-0 size-6 s768:size-7 rounded-2 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://img2.distributedresourcestorage.com/avatar/103656090/s"
                                  />
                                </span>
                                <div className="truncate">adepejudavid287</div>
                              </div>
                            </td>
                            <td
                              align="left"
                              className="py-2 first:pl-2 last:pr-2 pl-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="flex items-center gap-2 text-14">
                                <span className="block overflow-hidden shrink-0 rounded-full size-4 lazy-load-image-background  lazy-load-image-loaded">
                                  <img
                                    className="object-cover size-full"
                                    src="https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png"
                                  />
                                </span>
                                <span>
                                  STONKS
                                  <span className="text-secondary">/USDT</span>
                                </span>
                              </div>
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 px-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              NGNFIAT
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              138.889
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              6.32x
                            </td>
                            <td
                              align="right"
                              className="py-2 first:pl-2 last:pr-2 pr-3 first:rounded-l-2 last:rounded-r-2 truncate"
                            >
                              <div className="text-down">-138.889</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                aria-labelledby="radix-:roc:-trigger-3"
                data-orientation="horizontal"
                data-state="inactive"
                hidden
                id="radix-:roc:-content-3"
                role="tabpanel"
                tabIndex={0}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
