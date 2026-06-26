export function OfflineStoreSection() {
  return (
    <section
      data-orientation="vertical"
      className="relative isolate"
      id="offline-store"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 !pb-0 mb-12 !pt-36 max-w-[1290px] mx-auto">
        <div className="">
          {/**/}
          <div className="mt-8 grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <div className="text-md tracking-widest mb-4 flex justify-start items-center">
                <span className="text-gradient-primary">OFFLINE STORE</span>
              </div>
              <div className="font-extrabold text-6xl mb-4 leading-tight">
                오프라인 매장 전용
              </div>
              <div className="text-neutral-300 leading-8">
                {" "}
                오프라인 매장 전용 솔루션은 매장에서의 고객 경험을 극대화하고
                운영 효율성을 높이기 위한 시스템입니다. 결제, 재고 관리, 고객
                분석, 멤버십 운영 등 오프라인 비즈니스에 최적화된 기능을
                제공하여 매장 운영을 보다 스마트하고 원활하게 만들어
                줍니다.{" "}
              </div>
              <a
                href="https://t.me/icon_cs"
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-3 py-2 gap-2 justify-center bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary mt-6 text-white h-[46px] w-full max-w-[160px] text-sm"
              >
                <span
                  className="iconify i-ri:telegram-2-fill shrink-0 size-6"
                  aria-hidden="true"
                />
                오프라인 문의하기{/**/}
              </a>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/home.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>오프라인 전용</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/gamepad-variant-outline.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>다양한 게임 서비스</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/cards-spade.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>호텔 카지노</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/slot-machine-outline.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>슬롯게임</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/globe-asia-australia.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>온라인 배팅 사이트</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/star.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>반응형 서비스</span>
                  </span>
                  {/**/}
                </span>
              </div>
            </div>
            <div
              className="rounded-md border border-white/10"
              style={{
                transition: "transform 700ms ease-out, opacity 700ms ease-out",
                opacity: 1,
                transform: "translateY(0px)",
              }}
            >
              <div
                className="rounded-md overflow-hidden max-h-[450px]"
                style={{
                  transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
                }}
              >
                <img
                  src="/assets/images/carousel/offline_img/offline-demo_1.jpg"
                  alt="offline demo"
                  className="w-full"
                />
              </div>
            </div>
          </div>
          {/**/}
        </div>
        {/**/}
      </div>
    </section>
  );
}
