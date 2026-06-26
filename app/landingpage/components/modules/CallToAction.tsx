import { Icon } from "@iconify/react";
export function CallToAction() {
  return (
    <section className="relative isolate" data-orientation="vertical">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 !py-0 lg:!pb-20 max-w-[1290px] mx-auto">
        <div className="">
          <div className="mt-8">
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-[#20e0ff] via-[#6e43ff] to-[#a625ff]">
              <div className="rounded-2xl bg-[hsla(0,0%,7%,0.92)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12 items-center">
                  <div className="lg:col-span-2 text-white">
                    <div className="font-extrabold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                      {" "}
                      솔루션이 필요하다면?
                      <br />
                      지금 문의하세요!{" "}
                    </div>
                    <div className="mt-5 space-y-2 text-neutral-300 text-sm lg:text-base">
                      <p>
                        {" "}
                        고객의 필요에 맞춘 최적의 솔루션을 제공합니다. 효과적인
                        솔루션으로 확실한 수익을 경험해 보세요.{" "}
                      </p>
                      <p>
                        전문적인 접근과 체계적인 운영으로 만족스러운 결과를
                        약속드립니다.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <Icon
                      icon="ri:telegram-2-fill"
                      className="text-white/95 !size-24 sm:!size-48"
                    />
                    <a
                      className="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors px-3 py-2 gap-2 justify-center bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-white h-[46px] w-full max-w-[140px] text-sm"
                      href="https://t.me/icon_cs"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      텔레그램 문의하기{" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
