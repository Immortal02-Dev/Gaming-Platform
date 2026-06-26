export function ProvidersSection() {
  return (
    <section
      data-orientation="vertical"
      className="isolate relative"
      id="providers"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:grid gap-8 sm:gap-16 py-12 sm:py-16 lg:py-20 max-w-[1290px] mx-auto">
        <div className="">
          {/**/}
          <div className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-20 items-center">
              <div className="text-white">
                <div className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                  24/7
                </div>
                <div className="mt-2 text-lg font-semibold">
                  실시간 운영지원
                </div>
                <div className="text-sm text-neutral-400">
                  Operation Support
                </div>
              </div>
              <div className="text-white">
                <div className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                  120+
                </div>
                <div className="mt-2 text-lg font-semibold">누적 업체 수</div>
                <div className="text-sm text-neutral-400">
                  Companies Partner
                </div>
              </div>
              <div className="text-white">
                <div className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                  1,357+
                </div>
                <div className="mt-2 text-lg font-semibold">
                  제공 카지노 게임
                </div>
                <div className="text-sm text-neutral-400">Casino Service</div>
              </div>
              <div className="text-white">
                <div className="text-5xl lg:text-6xl font-extrabold tracking-tight">
                  5,756+
                </div>
                <div className="mt-2 text-lg font-semibold">제공 슬롯 게임</div>
                <div className="text-sm text-neutral-400">
                  Slot Game Service
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0b0b17]" />
          </div>
          {/**/}
        </div>
        {/**/}
      </div>
    </section>
  );
}
