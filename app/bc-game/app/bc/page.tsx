export default function BcPage() {
  return (
    <>
      <div className="rounded-xl bg-layer4 p-4 sm:flex sm:flex-col bg-linear-to-tl from-[#24EE8900] from-60% via-[#24EE891A] via-80% to-[#24EE894D] to-100% sm:h-100">
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
              <div className="cursor-pointer rounded-lg size-8 center">1M</div>
              <div className="cursor-pointer rounded-lg size-8 center font-extrabold text-primary bg-tab_selected">
                1H
              </div>
              <div className="cursor-pointer rounded-lg size-8 center">1D</div>
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
        {/* <div className="relative h-72 flex-1">
            <div className="absolute-center">
              <svg
                className="loading text-brand"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <iframe
              className="h-full w-full"
              src="https://bc.gamehttps://detrade.com/chart-iframe/"
            />
          </div> */}
      </div>
      <div className="grid gap-2 grid-cols-1 items-stretch lg:grid-cols-2">
        <div className="rounded-xl bg-layer4 p-4 relative flex-col text-sm font-extrabold gap-3 pt-1">
          <div className="flex justify-between gap-1 items-start">
            <div className="flex-1" />
            <div className="flex items-center">
              <div className="text-secondary size-8 center grow">
                <div className="icon size-4! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col flex-1 items-center rounded-lg px-3 py-3 w-fit bg-[#f4f4f4] md:px-18 dark:bg-[#0000000D]">
              <div className="w-32 flex justify-center">
                <canvas
                  height="128"
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    height: "128px",
                    width: "128px",
                  }}
                  width="128"
                />
              </div>
              <div className="mb-1 flex flex-col flex-nowrap justify-center items-center gap-1 text-ssecondary w-full pt-1 sm:flex-row">
                <span className="text-brand text-nowrap leading-normal">
                  $BC Supply
                </span>
                <span className="leading-tight self-center text-nowrap">
                  (Max. Supply)
                </span>
              </div>
              <div className="text-base leading-tight">10,000,000,000 BC</div>
            </div>
            <div className="flex flex-col flex-1 justify-center ml-5 items-start space-y-1 md:ml-10 lg:relative lg:space-y-2">
              <div className="flex flex-col justify-center">
                <div className="flex items-center text-brand">
                  <div className="rounded-full bg-brand mr-1 h-2 w-2" />
                  <span className="mr-1.5">Circulating</span>
                  <div>25.422%</div>
                </div>
                <div className="text-base font-extrabold">
                  2,542,200,432.01 BC
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-1 flex items-center text-error">
                  <div className="rounded-full mr-1 h-2 w-2 bg-[#ff0101]" />
                  <span className="mr-1.5">Burnt</span>
                  <div>2.578%</div>
                </div>
                <div className="text-base font-extrabold">
                  257,799,567.98 BC
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="mb-1 flex items-center text-warning">
                  <div className="rounded-full mr-1 h-2 w-2 bg-[#FF9820]" />
                  <span className="mr-1.5">Locked</span>
                  <div>72%</div>
                </div>
                <div className="text-base font-extrabold">7,200,000,000 BC</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col bg-layer4 p-2 rounded-lg w-[calc(50%-8px)]">
            <div className="mb-1 flex justify-between items-center text-brand">
              <div className="flex items-center">
                <div className="icon size-4! mr-0.5 fill-brand">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.0039 6.80469V7.76953L17.0381 7.77051C18.2768 7.81972 19.483 7.99321 20.5215 8.25391H20.6621L20.5488 8.35254L19.5146 9.23926H19.4834C18.3318 8.96609 17.1355 8.80356 15.8838 8.76758C14.7719 8.76758 14.4766 8.96507 14.4766 9.06348C14.4772 9.34476 15.6808 9.48551 16.7363 9.60547C18.5661 9.81693 20.6266 10.0561 20.627 11.083C20.627 12.2018 17.9183 12.441 16.9756 12.4902V13.4824H14.8652V12.4902L14.8252 12.4883C13.4303 12.414 12.0824 12.1626 10.918 11.7871L10.7842 11.7441L11.9814 10.7666H12.0088C13.291 11.1944 14.6573 11.4393 16.0908 11.4697C17.3913 11.4697 17.7366 11.2452 17.7373 11.1113C17.7373 10.8221 16.513 10.6806 15.4365 10.5684C13.6283 10.3923 11.5738 10.1683 11.5732 9.16211C11.5732 8.41625 12.8125 7.9025 14.8809 7.75488V6.80469H17.0039Z" />
                    <path d="M12.0166 10.7666H12.0088C11.9793 10.7568 11.9493 10.7483 11.9199 10.7383L12.0166 10.7666Z" />
                    <path d="M19.5928 9.26465L19.4727 9.23926H19.4834C19.5198 9.2479 19.5564 9.25578 19.5928 9.26465Z" />
                    <path
                      clipRule="evenodd"
                      d="M15.999 4.83594C21.5299 4.83594 27.9619 6.278 27.9619 10.3525V13.8701C27.9619 14.7398 27.6662 15.4885 27.1504 16.1299C27.6667 16.5802 27.9618 17.22 27.9619 18.1211V21.6396C27.9615 25.7139 21.5159 27.1631 15.999 27.1631C10.4823 27.163 4.03752 25.7138 4.03711 21.6396V18.1211C4.03711 17.2363 4.34168 16.6071 4.87402 16.1641C4.34161 15.5154 4.03717 14.7549 4.03711 13.8701V10.3525C4.03711 6.27896 10.4829 4.83601 15.999 4.83594ZM25.5098 17.4727C23.1296 18.8383 19.3897 19.3857 15.999 19.3857C12.6157 19.3857 8.88469 18.8415 6.50391 17.4824C6.41901 17.6105 6.37307 17.7649 6.37305 17.9521C6.37305 19.8029 10.673 21.3085 15.999 21.3086C21.3253 21.3086 25.6328 19.7815 25.6328 17.9307C25.6328 17.7492 25.5896 17.5984 25.5098 17.4727ZM15.999 6.56641C10.5888 6.56649 6.1911 8.19896 6.19043 10.2109C6.19043 12.2231 10.5737 13.8495 15.999 13.8496C21.4246 13.8496 25.8506 12.2232 25.8506 10.2109C25.8499 8.19891 21.4233 6.56641 15.999 6.56641Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-sm">Total Wager</span>
              </div>
              <div className="text-sm font-tertiary overflow-hidden wrap-break-word text-tertiary">
                Last 24h
              </div>
            </div>
            <div className="text-sm font-extrabold mt-2 overflow-hidden wrap-break-word ml-0.5">
              $114,516,543.68
            </div>
          </div>
          <div className="flex flex-col bg-layer4 p-2 rounded-lg w-[calc(50%-8px)]">
            <div className="mb-1 flex justify-between items-center text-brand">
              <div className="flex items-center">
                <div className="icon size-4! mr-0.5 fill-brand">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4121 5.57833C17.8142 5.02555 16.0881 4.85486 14.4116 5.06879C12.313 5.33218 10.3003 6.22409 8.69108 7.59615C6.89398 9.11573 5.60246 11.2243 5.08021 13.5202C4.64612 15.4046 4.49348 17.05 5.38652 18.5407C7.17374 19.9855 10.7293 20.205 13.4804 20.0727C15.769 19.9605 18.0471 19.5691 20.2319 18.8747C22.5951 18.1207 25.2831 16.7807 26.6475 15.0516C26.7288 14.0973 26.5533 13.2466 26.1636 12.1851C26.6045 12.401 27.0298 12.6664 27.3672 13.027C27.6083 13.2848 27.8005 13.6016 27.8573 13.9543C27.9186 14.3281 27.8321 14.7125 27.6721 15.0516C27.45 15.5315 27.1041 15.9424 26.7288 16.3101C26.0446 16.9688 25.2443 17.4936 24.4159 17.952C23.4517 18.4825 22.4366 18.9166 21.4019 19.289C19.1707 20.0843 16.8392 20.589 14.4843 20.8312C13.0339 20.9779 11.5706 21.0231 10.116 20.914C8.92961 20.8219 7.74209 20.6337 6.61505 20.242C6.11653 20.0637 5.62818 19.8452 5.19042 19.5451C4.81512 19.2865 4.46949 18.9595 4.27506 18.5407C4.09475 18.1547 4.08825 17.6991 4.23012 17.3C4.2585 17.2107 4.2982 17.1261 4.33792 17.0416C4.35674 17.0015 4.37556 16.9614 4.39319 16.9208C4.4856 16.6958 4.39771 16.4146 4.19395 16.2818C4.00064 16.1487 3.72115 16.1719 3.54734 16.3273C3.45038 16.41 3.399 16.5269 3.34855 16.6417C3.33694 16.6681 3.32539 16.6944 3.31334 16.7201C3.03639 17.3495 2.97308 18.0826 3.19663 18.738C3.39445 19.3388 3.80988 19.8466 4.30134 20.2352C4.99401 20.7823 5.81894 21.1336 6.65744 21.3902C7.75509 21.7178 8.89315 21.8936 10.0335 21.9854C11.4539 22.0953 12.883 22.0617 14.3014 21.9365C16.9071 21.7022 19.4878 21.152 21.9474 20.2567C23.0419 19.8543 24.1121 19.38 25.1259 18.8024C25.9225 18.3449 26.6884 17.8234 27.3599 17.1938C27.9005 16.684 28.3854 16.0961 28.6822 15.4094C28.8286 15.0748 28.9136 14.715 28.9391 14.351V14.0973C28.9069 13.5433 28.7065 13.0027 28.3651 12.565C27.8053 11.8387 26.9871 11.3639 26.1503 11.0216C26.0511 10.9781 25.9486 10.9422 25.8463 10.9063C25.742 10.8698 25.6379 10.8333 25.5373 10.7888C25.0902 9.97599 24.5541 9.21012 23.9225 8.52989C22.6929 7.19428 21.1295 6.16785 19.4121 5.57833Z" />
                    <path d="M26.6922 18.7617C25.412 19.6816 24.0239 20.4478 22.5715 21.0596C20.3025 22.0176 17.8868 22.6137 15.4402 22.8816C12.6461 23.184 9.80502 23.0723 7.04677 22.528C7.36099 23.0403 7.5642 23.3222 7.96155 23.7244C9.40991 25.2032 11.283 26.2624 13.3003 26.7299C15.5515 27.26 17.9695 27.0616 20.0998 26.1584C21.6491 25.5065 23.0423 24.4916 24.1439 23.2225C25.278 21.9177 26.2816 20.4418 26.6922 18.7617Z" />
                  </svg>
                </div>
                <span className="text-sm">Online</span>
              </div>
              <div className="text-sm font-tertiary overflow-hidden wrap-break-word text-tertiary">
                Last 24h
              </div>
            </div>
            <div className="text-sm font-extrabold mt-2 overflow-hidden wrap-break-word ml-0.5">
              175,783
            </div>
          </div>
          <div className="flex flex-col bg-layer4 p-2 rounded-lg w-[calc(50%-8px)]">
            <div className="mb-1 flex justify-between items-center text-brand">
              <div className="flex items-center">
                <div className="icon size-4! mr-0.5 fill-brand">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7359 5.33398C18.6405 5.33398 19.545 5.67702 20.2353 6.35968L27.4689 13.5242C28.8496 14.892 28.8496 17.1081 27.4689 18.476L20.2353 25.6413C19.545 26.3248 18.6405 26.667 17.7359 26.667C17.1506 26.667 16.566 26.5236 16.0387 26.2378L7.02847 26.2369C5.07607 26.2369 3.49316 24.6694 3.49316 22.7357V12.6017C3.49316 10.6689 5.07607 9.10054 7.02847 9.10054L12.4692 9.09969L15.2366 6.35968C15.8808 5.72225 16.7111 5.38092 17.555 5.33825L17.7359 5.33398ZM17.7359 7.47155C17.3682 7.47155 17.0226 7.6132 16.7623 7.87091L9.5287 15.0362C8.99196 15.5679 8.99196 16.4331 9.5287 16.9647L16.7623 24.1301C17.0226 24.3869 17.3682 24.5294 17.7359 24.5294C18.1037 24.5294 18.4493 24.3869 18.7087 24.1301L25.9423 16.9647C26.4791 16.4331 26.4791 15.5687 25.9423 15.0362L18.7087 7.87091C18.4485 7.6132 18.1029 7.47155 17.7351 7.47155H17.7359ZM17.7359 17.6687C18.6865 17.6687 19.4571 18.4325 19.4571 19.3745C19.4571 20.3166 18.6865 21.0795 17.7359 21.0795C16.7845 21.0795 16.0139 20.3157 16.0139 19.3745C16.0139 18.4333 16.7845 17.6687 17.7359 17.6687ZM17.7359 11.0862C18.6865 11.0862 19.4571 11.8499 19.4571 12.7912C19.4571 13.7324 18.6865 14.4969 17.7359 14.4969C16.7845 14.4969 16.0139 13.7332 16.0139 12.7912C16.0139 11.8491 16.7845 11.0862 17.7359 11.0862Z" />
                  </svg>
                </div>
                <span className="text-sm">Bets</span>
              </div>
              <div className="text-sm font-tertiary overflow-hidden wrap-break-word text-tertiary">
                Last 24h
              </div>
            </div>
            <div className="text-sm font-extrabold mt-2 overflow-hidden wrap-break-word ml-0.5">
              7,513,413
            </div>
          </div>
          <div className="flex flex-col bg-layer4 p-2 rounded-lg w-[calc(50%-8px)]">
            <div className="mb-1 flex justify-between items-center text-brand">
              <div className="flex items-center">
                <div className="icon size-4! mr-0.5 fill-brand">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.1 23.5005H12.3999C11.0799 23.5005 9.99985 24.5806 9.99985 25.9006V26.2006H8.79981C8.3078 26.2006 7.89979 26.6086 7.89979 27.1006C7.89979 27.5926 8.3078 28.0007 8.79981 28.0007H23.2002C23.6922 28.0007 24.1002 27.5926 24.1002 27.1006C24.1002 26.6086 23.6922 26.2006 23.2002 26.2006H22.0002V25.9006C22.0002 24.5806 20.9201 23.5005 19.6001 23.5005H16.9V20.7525C16.6 20.7885 16.3 20.8005 16 20.8005C15.7 20.8005 15.4 20.7885 15.1 20.7525V23.5005Z" />
                    <path d="M23.7762 15.5683C24.5682 15.2683 25.2643 14.7763 25.8163 14.2243C26.9323 12.9882 27.6643 11.5122 27.6643 9.78416C27.6643 8.05611 26.3083 6.70007 24.5802 6.70007H23.9082C23.1282 5.10403 21.4962 4 19.6001 4H12.3999C10.5039 4 8.87182 5.10403 8.0918 6.70007H7.41978C5.69173 6.70007 4.33569 8.05611 4.33569 9.78416C4.33569 11.5122 5.06771 12.9882 6.18374 14.2243C6.73576 14.7763 7.43178 15.2683 8.2238 15.5683C9.47183 18.6404 12.4719 20.8005 16 20.8005C19.5281 20.8005 22.5282 18.6404 23.7762 15.5683ZM19.4081 11.7402L18.6641 12.6522C18.5441 12.7842 18.4601 13.0482 18.4721 13.2282L18.5441 14.4043C18.5921 15.1243 18.0761 15.4963 17.404 15.2323L16.312 14.8003C16.144 14.7403 15.856 14.7403 15.688 14.8003L14.596 15.2323C13.924 15.4963 13.4079 15.1243 13.4559 14.4043L13.5279 13.2282C13.5399 13.0482 13.4559 12.7842 13.3359 12.6522L12.5919 11.7402C12.1239 11.1882 12.3279 10.5762 13.0239 10.3962L14.164 10.1082C14.344 10.0602 14.56 9.89216 14.656 9.73616L15.292 8.75213C15.688 8.14011 16.312 8.14011 16.708 8.75213L17.344 9.73616C17.44 9.89216 17.6561 10.0602 17.8361 10.1082L18.9761 10.3962C19.6721 10.5762 19.8761 11.1882 19.4081 11.7402Z" />
                  </svg>
                </div>
                <span className="text-sm">Won Amount</span>
              </div>
              <div className="text-sm font-tertiary overflow-hidden wrap-break-word text-tertiary">
                Last 24h
              </div>
            </div>
            <div className="text-sm font-extrabold mt-2 overflow-hidden wrap-break-word ml-0.5">
              $113,415,644.95
            </div>
          </div>
        </div>
      </div>
      <div className="bg-layer4 rounded-lg flex items-center py-4 justify-center p-2 flex-wrap gap-3 lg:justify-around lg:py-4">
        <a href="https://solscan.io/token/BCNT4t3rv5Hva8RnUtJUJLnxzeFAabcYp8CghC1SmWin">
          <img
            className="w-36 lg:w-40"
            src="https://bc.game/modules/wallet2/assets/solscan-0x98UIxK.png"
          />
        </a>
        <a href="https://coinmarketcap.com/currencies/bcgame-coin/">
          <img
            className="w-44"
            src="https://bc.game/modules/wallet2/assets/coinmarketcap-CplcFN5l.png"
          />
        </a>
        <a href="https://www.okx.com/web3/detail/501/BCNT4t3rv5Hva8RnUtJUJLnxzeFAabcYp8CghC1SmWin">
          <img
            className="w-20 lg:w-24"
            src="https://bc.game/modules/wallet2/assets/okx-CMbX6x9P.png"
          />
        </a>
        <a href="https://www.coingecko.com/en/coins/bc-token">
          <img
            className="w-36 lg:w-40"
            src="https://bc.game/modules/wallet2/assets/coingecko-Q8tlvO_r.png"
          />
        </a>
        <a href="https://gmgn.ai/sol/token/BCNT4t3rv5Hva8RnUtJUJLnxzeFAabcYp8CghC1SmWin?tab=activity">
          <img
            className="w-32 lg:w-36"
            src="https://bc.game/modules/wallet2/assets/gmgn-ZaVM4J7Z.png"
          />
        </a>
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
            <div className="text-sm">My Bets</div>
          </button>
          <button className="tabs-btn btn-like">
            <div className="text-sm">All Bets</div>
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
                        width: "6.25rem",
                      }}
                    >
                      Game
                    </th>
                    <th
                      align="center"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "15.25rem",
                      }}
                    >
                      Bet Amount
                    </th>
                    <th
                      align="center"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "5rem",
                      }}
                    >
                      Multiplier
                    </th>
                    <th
                      align="right"
                      className="px-4 text-secondary py-3"
                      style={{
                        width: "7.0625rem",
                      }}
                    >
                      Profit
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

