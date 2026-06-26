import RecommendedGames from "@/components/modules/favorite/RecommendedGames";
export default function SugarFiesta() {
  return (
    <div className="page-content relative z-10 w-full px-4 sm:px-0">
      <div
        className="max-w-308 mx-auto w-full sm:px-4 sm:pb-5 transition-all duration-200 @container"
        id="game-full-container"
        style={{
          maxWidth: "1248px",
        }}
      >
        <div
          className="mx-auto py-3 sm:py-0 grid-cols-1"
          id="game-full-layout"
          style={{
            display: "block",
            minHeight: "auto",
            width: "auto",
          }}
        >
          <div className="relative bg-layer4 rounded-xl game-style-iframe transition-all duration-300 overflow-hidden ">
            <div className="bg-primary_brand relative ">
              <div className='w-full relative overflow-hidden after:content-[""] after:block after:w-full after:pt-[56.25%] game-iframe-wrap'>
                <iframe
                  allow="autoplay;geolocation;camera;microphone;clipboard-read;clipboard-write"
                  allowFullScreen
                  className="absolute left-0 top-0 size-full border-none game-iframe"
                  src="https://static.crocogaming.com/launcher/static-launcher.html?gameid=128&mode=demo&language=en"
                />
              </div>
            </div>
            <div className="@container relative justify-between bg-layer3 border-t border-third rounded-b-xl z-100 w-full flex h-13.75 px-3 @4xl:px-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <button
                    className="button button-m text-secondary p-0"
                    type="button"
                  >
                    <svg
                      className="size-7"
                      fill="none"
                      height="32"
                      viewBox="0 0 32 32"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M20.389 5.007c1.209 0 2.326.645 2.93 1.692l4.39 7.611a3.39 3.39 0 0 1 0 3.381l-4.39 7.611a3.38 3.38 0 0 1-2.93 1.692H11.61a3.38 3.38 0 0 1-2.93-1.692l-4.39-7.61a3.39 3.39 0 0 1 0-3.382l4.39-7.611a3.38 3.38 0 0 1 2.93-1.692zM16 11.353a4.76 4.76 0 0 0-4.757 4.76c0 2.63 2.13 4.761 4.757 4.761a4.76 4.76 0 0 0 4.757-4.76c0-2.63-2.13-4.76-4.757-4.76"
                        fill="currentColor"
                      />{" "}
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-1 rounded-md hover:bg-layer3 transition-colors cursor-pointer">
                  <span className="inline-block size-6">
                    <svg
                      fill="currentColor"
                      height="100%"
                      viewBox="0 0 28 28"
                      width="100%"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.47056 15.9385C6.07513 15.9385 6.57201 16.3995 6.62873 16.9897L6.63448 17.1024V19.4288C6.63448 20.4563 7.43364 21.2978 8.44533 21.3632L8.57242 21.3675H10.8988C11.5407 21.3675 12.062 21.8881 12.062 22.5307C12.062 23.1345 11.6003 23.6314 11.0101 23.6881L10.8981 23.6939H8.57171C6.27403 23.6939 4.39998 21.8758 4.31023 19.6004L4.30664 19.4295V17.1031C4.30664 16.4605 4.82721 15.9399 5.46984 15.9399L5.47056 15.9385ZM22.5301 15.9385C23.134 15.9385 23.6316 16.3995 23.6883 16.9897L23.694 17.1024V19.4288C23.694 21.7265 21.876 23.6005 19.6006 23.6903L19.429 23.6939H17.1026C16.4599 23.6939 15.9401 23.1726 15.9401 22.5307C15.9401 21.9261 16.401 21.4285 16.9913 21.3725L17.1033 21.3675H19.4297C20.4579 21.3675 21.2987 20.5669 21.3647 19.5566L21.3683 19.4288V17.1024C21.3683 16.4598 21.8889 15.9392 22.5315 15.9392L22.5301 15.9385ZM15.4037 10.791C16.4247 10.791 17.2526 11.6189 17.2526 12.6399V15.6326C17.2526 16.6537 16.4247 17.4808 15.4037 17.4808H12.411C11.39 17.4808 10.5628 16.6529 10.5628 15.6326V12.6399C10.5628 11.6189 11.39 10.791 12.411 10.791H15.4037ZM19.4282 4.3065C21.7259 4.3065 23.6 6.12454 23.6897 8.39996L23.6933 8.57157V10.898C23.6933 11.5406 23.172 12.0619 22.5301 12.0619C21.9255 12.0619 21.4287 11.6002 21.3726 11.01L21.3669 10.8973V8.57085C21.3669 7.54336 20.5663 6.70183 19.556 6.63721L19.4282 6.6329H17.1018C16.4592 6.6329 15.9386 6.11162 15.9386 5.47042C15.9386 4.86513 16.3996 4.36825 16.9898 4.31225L17.1026 4.3065H19.4282ZM10.8988 4.3065C11.5407 4.3065 12.0613 4.82779 12.0613 5.47042C12.0613 6.07428 11.5996 6.57187 11.0094 6.62788L10.8981 6.63362H8.57171C7.54421 6.63362 6.70269 7.4335 6.63735 8.44448L6.63376 8.57157V10.898C6.63376 11.5406 6.11247 12.0619 5.47056 12.0619C4.86598 12.0619 4.36839 11.6002 4.31238 11.01L4.30664 10.8973V8.57085C4.30664 6.27317 6.12468 4.39985 8.4001 4.30938L8.57171 4.30579L10.8988 4.3065Z"
                        fill="#B3BEC1"
                      />
                    </svg>
                  </span>
                </div>
                <button
                  className="button button-m text-secondary p-0"
                  type="button"
                >
                  <div className="relative size-8 flex items-center justify-center cursor-pointer bg-transparent rounded-full">
                    <svg
                      className="size-6"
                      fill="none"
                      height="32"
                      viewBox="0 0 32 32"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m15.184 26-5.445 2.99c-.856.47-1.915.127-2.365-.767a1.9 1.9 0 0 1-.177-1.16l1.04-6.333a1.88 1.88 0 0 0-.504-1.62L3.33 14.626a1.89 1.89 0 0 1-.031-2.587c.269-.289.621-.476 1.002-.534l6.087-.923a1.76 1.76 0 0 0 1.32-1.001l2.722-5.76c.428-.906 1.478-1.28 2.346-.832.346.178.626.47.796.831l2.723 5.761c.255.54.748.915 1.319 1l6.087.925c.957.145 1.62 1.074 1.482 2.074a1.86 1.86 0 0 1-.51 1.047l-4.405 4.484a1.88 1.88 0 0 0-.504 1.62l1.04 6.332c.163.996-.478 1.941-1.431 2.113-.38.068-.77.003-1.111-.184l-5.445-2.99c-.51-.28-1.12-.28-1.63 0z"
                        fill="#5F6D6D"
                      />
                    </svg>
                  </div>
                  <span className="hidden @2xl:block">449</span>
                </button>
                <button
                  className="button button-m text-secondary p-0"
                  type="button"
                >
                  <svg
                    className="transition-transform duration-300 hover:scale-125 size-7"
                    fill="none"
                    height="32"
                    viewBox="0 0 32 32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      d="M25.461 5.249a3.44 3.44 0 0 1 1.485 6.545l-.002-.057q.027.93.022 1.79l-.011.679c-.151 6.343-1.785 9.75-5.373 9.75-1.894 0-3.369-.972-4.516-2.684q-.1-.15-.195-.301l-.186-.306-.178-.317-.174-.331q-.128-.255-.258-.538l-.174-.392-.179-.427-.186-.465-.196-.509-.21-.558-.517-1.404-.194-.512-.189-.478-.18-.443-.176-.41-.086-.193-.168-.362q-.041-.087-.082-.17l-.162-.316c-.696-1.306-1.304-1.785-2.077-1.785-1.273 0-2.272 1.39-2.813 4.397l-.081.488a22 22 0 0 0-.075.515l-.066.542-.03.282-.053.583-.024.302-.042.625q-.018.32-.033.653l-.024.681-.003.102a3.44 3.44 0 1 1-3.013-.012q.037-1.395.144-2.636l.063-.653c.616-5.782 2.522-8.878 6.048-8.878 1.8 0 3.196.946 4.284 2.605q.093.144.183.289l.174.293.168.303.164.317.162.338.164.362.083.193.171.411.18.45.19.494.31.835.305.832.202.541.197.506.19.47.183.439.09.207.178.39.087.183.172.344.17.315c.727 1.298 1.399 1.784 2.275 1.784.883 0 1.59-.93 1.995-2.914l.076-.397q.034-.205.067-.424l.059-.45q.029-.232.051-.478l.043-.504.034-.532.026-.56.01-.29.012-.601.003-.629q0-.322-.006-.658l-.016-.685-.003-.052a3.44 3.44 0 0 1 1.529-6.524z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                </button>
                <div className="flex center h-10 rounded-lg bg-layer2 p-1 sm:cursor-pointer">
                  <div className="px-2 rounded-md h-full flex center">
                    <span className="text-secondary">Free Play</span>
                  </div>
                  <div className="px-2 rounded-md h-full flex center bg-layer4">
                    <span className="font-semibold">Real Play</span>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block absolute inset-0 m-auto h-8 w-36 pointer-events-none">
                <svg
                  className="relative top-1/2 -translate-y-1/2 text-layer5 opacity-50"
                  fill="none"
                  height="32"
                  viewBox="0 0 288 64"
                  width="144"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M90.2142 44.5358C89.2498 45.3593 87.9988 45.7677 86.7342 45.6718H80.7982V36.5838H86.9742C87.5723 36.539 88.1731 36.6214 88.737 36.8254C89.301 37.0295 89.8153 37.3507 90.2462 37.7678C90.9657 38.7736 91.3135 39.998 91.2302 41.2318C91.3038 42.42 90.9427 43.5943 90.2142 44.5358ZM80.7982 22.1918H84.9662C86.9822 22.1918 88.0542 22.4958 88.8782 23.2318C89.274 23.6739 89.5753 24.1922 89.7637 24.7548C89.9522 25.3174 90.0238 25.9126 89.9742 26.5038C90.0108 27.0453 89.9335 27.5883 89.7475 28.0981C89.5615 28.6079 89.2709 29.0731 88.8942 29.4638C87.9102 30.3278 87.0062 30.5518 85.1342 30.5518H80.7982V22.1918ZM94.3342 33.3918C95.7804 32.8004 97.0094 31.7781 97.8542 30.4638C98.8025 28.9788 99.2973 27.2496 99.2782 25.4878C99.2782 21.8558 98.0702 19.1918 95.6302 17.3838C93.1902 15.5758 90.3902 14.7598 85.2302 14.5358C80.2062 14.3198 71.9902 15.4238 71.9902 15.4238V52.9758C71.9902 52.9758 81.6302 53.4478 87.6062 53.0478C92.7022 52.7038 95.0622 51.9278 97.0782 50.2158C99.3582 48.2798 100.534 45.1598 100.534 41.3598C100.579 39.5293 100.056 37.7298 99.0382 36.2078C97.9225 34.6908 96.2568 33.6713 94.3982 33.3678L94.3342 33.3918ZM197.878 36.7998L201.222 26.2878L204.654 36.7598L197.878 36.7998ZM196.966 15.4718L183.238 52.2718L192.654 52.3118L195.454 44.3598H206.598L209.55 52.3118H219.086L205.79 15.4718H196.966ZM272.854 37.1838L272.79 44.2238H287.99V52.2238H263.902V15.4238H287.582V23.4238H272.798L272.854 30.0878H286.286V37.1358L272.854 37.1838ZM126.702 44.7998C123.862 45.3598 119.774 45.9678 116.75 44.2238C113.966 42.6238 112.75 39.4238 112.478 37.1438C112.254 34.9308 112.254 32.7008 112.478 30.4878C112.838 27.8878 113.966 24.8878 116.75 23.2878C119.774 21.5438 123.862 22.1598 126.702 22.7198C128.558 23.0878 132.23 24.2238 132.23 24.2238L132.286 17.0718C129.762 15.8959 127.057 15.1548 124.286 14.8798C119.486 14.2958 113.198 14.7998 109.006 18.5038C104.814 22.2078 103.87 26.7758 103.47 30.2398C103.239 32.6343 103.239 35.0454 103.47 37.4398C103.83 40.5758 104.822 45.4398 109.006 49.1758C113.19 52.9118 119.462 53.3838 124.286 52.7918C127.225 52.4757 130.09 51.6642 132.758 50.3918L132.702 42.9758C130.734 43.6848 128.732 44.2936 126.702 44.7998ZM143.782 52.9758C144.661 52.9838 145.522 52.7304 146.256 52.2479C146.99 51.7654 147.565 51.0755 147.906 50.2659C148.247 49.4564 148.34 48.5636 148.173 47.701C148.006 46.8385 147.586 46.045 146.967 45.4215C146.348 44.798 145.558 44.3725 144.697 44.1992C143.835 44.0258 142.942 44.1123 142.13 44.4478C141.318 44.7833 140.624 45.3525 140.136 46.0833C139.648 46.814 139.389 47.6732 139.39 48.5518C139.397 49.7147 139.861 50.8282 140.684 51.6505C141.506 52.4728 142.619 52.9375 143.782 52.9438V52.9758ZM259.454 52.3118L258.934 15.4318H248.43L240.43 36.8078L231.926 15.4318H221.598C221.581 15.4318 221.565 15.4386 221.553 15.4506C221.541 15.4626 221.534 15.4788 221.534 15.4958V52.2958H230.334V29.7598L238.55 48.9598H242.198L250.414 29.1038V52.3038L259.454 52.3118ZM174.55 33.9198H181.598V42.1598V49.5998C179.19 51.1365 176.487 52.1529 173.662 52.5838C169.982 53.2718 162.974 53.5358 158.302 50.1838C153.278 46.6078 151.958 41.2158 151.694 37.8398C151.494 35.3612 151.494 32.8705 151.694 30.3918C151.929 25.8569 153.914 21.5898 157.23 18.4878C161.414 14.7438 167.678 14.2238 172.502 14.8238C175.275 15.1034 177.981 15.8527 180.502 17.0398L180.446 24.3598C180.446 24.3598 176.774 23.2078 174.926 22.8398C172.078 22.2718 167.998 21.6478 164.966 23.4158C162.182 25.0158 160.886 28.4798 160.702 30.6798C160.531 32.8605 160.531 35.0512 160.702 37.2318C160.765 38.5767 161.128 39.8903 161.767 41.0756C162.405 42.2609 163.302 43.2877 164.39 44.0798C166.502 45.5518 170.566 45.6238 173.63 44.4558C173.63 44.4558 173.574 38.5358 173.574 37.2558C173.564 36.7275 173.483 36.2029 173.334 35.6958C173.278 35.4478 173.214 35.2158 173.182 34.9838C173.03 34.1838 173.294 33.9198 174.55 33.9198Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                  <path
                    clipRule="evenodd"
                    d="M41.3423 12.928C35.8063 9.728 31.9423 8.024 28.1743 7.848H27.2863C24.2623 7.992 21.1823 9.104 17.2223 11.2C17.0303 2.688 14.1103 0 5.04631 0H1.89431C-0.209692 0 -0.321691 0.336001 0.406309 2.064C0.937214 3.42503 1.16121 4.88644 1.06231 6.34399V36.904C1.15031 49.584 2.86231 52.448 14.5183 58.968C20.5103 62.32 23.9983 64 27.7263 64C31.4543 64 34.9263 62.32 40.9423 58.968C52.9423 52.272 54.3983 49.432 54.3983 35.832C54.3983 22.232 52.8543 19.592 41.3423 12.928ZM19.3023 36.304L26.9663 43.896C27.1485 44.0729 27.3924 44.1719 27.6463 44.1719C27.9002 44.1719 28.1442 44.0729 28.3263 43.896L34.4943 37.784C34.8115 37.4702 35.2401 37.2947 35.6863 37.296H45.1903C45.2503 37.2956 45.3096 37.3079 45.3645 37.3322C45.4193 37.3564 45.4684 37.392 45.5085 37.4366C45.5485 37.4813 45.5787 37.5338 45.5969 37.591C45.6152 37.6481 45.6211 37.7084 45.6143 37.768C45.069 42.2896 42.8179 46.4325 39.321 49.3503C35.8241 52.2682 31.3452 53.741 26.799 53.4678C22.2528 53.1947 17.9824 51.1962 14.86 47.8806C11.7376 44.565 9.99889 40.1824 9.99889 35.628C9.99889 31.0736 11.7376 26.691 14.86 23.3754C17.9824 20.0598 22.2528 18.0613 26.799 17.7882C31.3452 17.515 35.8241 18.9878 39.321 21.9057C42.8179 24.8235 45.069 28.9664 45.6143 33.488C45.6199 33.548 45.6129 33.6085 45.5937 33.6656C45.5745 33.7227 45.5435 33.7752 45.5028 33.8197C45.4622 33.8641 45.4126 33.8996 45.3574 33.9237C45.3022 33.9479 45.2426 33.9603 45.1823 33.96H35.6863C35.2401 33.9613 34.8115 33.7858 34.4943 33.472L28.3263 27.36C28.1442 27.1831 27.9002 27.0841 27.6463 27.0841C27.3924 27.0841 27.1485 27.1831 26.9663 27.36L19.3023 34.952C19.2131 35.0405 19.1422 35.1458 19.0939 35.2618C19.0455 35.3779 19.0206 35.5023 19.0206 35.628C19.0206 35.7537 19.0455 35.8781 19.0939 35.9942C19.1422 36.1102 19.2131 36.2155 19.3023 36.304Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-2 justify-end" />
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-304 mx-auto">
          <section className="my-3 sm:my-6 p-3 md:p-5 md:pt-8 flex flex-col bg-layer4 rounded-xl relative">
            <div className="flex justify-between items-start">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg">
                    Sugar Fiesta 1000
                  </span>
                  <div className="flex items-center gap-1 whitespace-nowrap mr-1">
                    <span className="text-secondary text-sm">By</span>
                    <a
                      className="text-brand text-sm inactive"
                      href="/provider/Croco Gaming"
                    >
                      Croco Gaming
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 z-10">
                <div className="flex flex-wrap gap-2">
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/BC%20Exclusive?label=BC Exclusive"
                  >
                    <span className="text-xs font-semibold">
                      # BC Exclusive
                    </span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/Feature%20buy-in?label=Feature buy-in"
                  >
                    <span className="text-xs font-semibold">
                      # Feature buy-in
                    </span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/Cluster%20pays?label=Cluster pays"
                  >
                    <span className="text-xs font-semibold">
                      # Cluster pays
                    </span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/BC%20Originals?label=BC Originals"
                  >
                    <span className="text-xs font-semibold">
                      # BC Originals
                    </span>
                  </a>
                  <a
                    className="flex items-center text-right bg-layer5 text-brand h-6 px-2 rounded-md inactive"
                    href="/tagname/Candy?label=Candy"
                  >
                    <span className="text-xs font-semibold"># Candy</span>
                  </a>
                </div>
                <button
                  className="button button-m bg-layer5 hover:bg-layer5 size-8 px-2"
                  type="button"
                >
                  <svg
                    className="-rotate-90"
                    fill="none"
                    height="32"
                    viewBox="0 0 32 32"
                    width="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.691 5.6 9.291 16l10.4 10.4 3.018-3.017L15.326 16l7.383-7.382z"
                      fill="currentColor"
                    />{" "}
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <div className="mb-4 -mt-2">
            <RecommendedGames />
          </div>
          <div className="pb-4 relative">
            <div className="h-8 pt-1 px-2 leading-8 text-base font-extrabold text-primary">
              Latest bet & Race
            </div>
            <div
              className="scroll-x tabs-title hide-scroll bg-[#E4E6E7] dark:bg-[#323738] ml-auto sm:-mt-9 w-full sm:w-auto latest-tabs"
              style={
                {
                  ["--tabs-indicator-position" as any]: "0%",
                  ["--tabs-width" as any]: "100px",
                } as React.CSSProperties
              }
            >
              <button aria-selected="true" className="tabs-btn btn-like">
                All bets
              </button>
              <button className="tabs-btn btn-like">My bets</button>
              <button className="tabs-btn btn-like" tabIndex={8}>
                High Roller
              </button>
              <button className="tabs-btn btn-like" tabIndex={9}>
                Wager Contest
              </button>
              <div className="tabs-indicator" />
            </div>
            <div className="tabs-content">
              <div className="w-full">
                <div className="relative w-full overflow-auto max-h-160 rounded-xl">
                  <table
                    className="w-full caption-bottom text-sm"
                    style={{
                      overflowAnchor: "none",
                    }}
                  >
                    <thead>
                      <tr className="[&_tr]:bg-layer4! border-0 transition-colors text-secondary">
                        <th className="py-3 px-2 sm:px-4 group text-left align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0">
                          Bet ID
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                          Bet
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-center">
                          Payout
                        </th>
                        <th className="py-3 px-2 sm:px-4 group align-middle font-semibold text-zinc-500 dark:text-zinc-400 [&:has([role=checkbox])]:pr-0 text-right">
                          Profit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0 group">
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182105955984830
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩98
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          9.5x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-brand!">
                          <span>+</span>
                          <span>₩836</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182099134692798
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩98
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.1999x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩78</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/PHP.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182090441066429
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩870
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/TRX.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩870</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/TRX.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182091492298942
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩32
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩32</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182078957484989
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩2,320
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.2x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩1,856</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182083353245119
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩32
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.3999x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩19</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/INR.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182098073974207
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩21
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/RUB.rect.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩21</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/RUB.rect.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182059076976574
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩1,740
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0.3x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩1,218</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182084637887165
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩964
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩964</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className="odd:bg-layer5-table border-0 transition-colors data-[state=selected]:bg-zinc-100 dark:data-[state=selected]:bg-zinc-800">
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-primary max-w-20 hover:underline cursor-pointer">
                          1856182052637948605
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 truncate text-secondary text-center">
                          <span className="inline-block align-middle mb-0.5">
                            ₩964
                          </span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm  align-middle">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-secondary text-center">
                          0x
                        </td>
                        <td className="first:rounded-l-lg last:rounded-r-lg py-2.5 px-2 sm:px-4 align-middle [&:has([role=checkbox])]:pr-0 dark:text-zinc-50 text-right truncate text-secondary flex items-center justify-end text-error!">
                          <span />
                          <span>-₩964</span>
                          <div className="rounded-full inline-flex shrink-0 size-6 items-center justify-center leading-6 text-sm">
                            <img
                              className="w-4 h-4"
                              src="https://imgxcut.com/coin/USDT.black.png"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    className="button button-second button-m mx-auto gap-2 my-2 h-8 px-2 bg-none bg-button_bright pointer-events-auto"
                    type="button"
                  >
                    <span>Show More</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
