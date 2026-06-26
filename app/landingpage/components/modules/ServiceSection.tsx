export function ServicesSection() {
  return (
    <section
      data-orientation="vertical"
      className="relative isolate"
      id="services"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col lg:grid py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16 !pb-0 mb-12 !pt-36 max-w-[1290px] mx-auto">
        <div className="">
          {/**/}
          <div className="mt-8 grid lg:grid-cols-2 gap-24 items-start">
            <div>
              <div className="font-bold text-4xl mb-8">스포츠 제공 서비스</div>
              <div className="text-neutral-300 leading-8">
                {" "}
                스포츠 팀, 리그에 대한 분석 등 유저에게 깊이 있는 경기 이해를
                위한 다양한 서비스를 제공하여, 더욱 효과적인 서비스 운영을
                하는데 도움을 드립니다. 유저에게 다양한 서비스로 사이트 운영을
                더욱 효율적으로 해보세요!{" "}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/soccer.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>축구 (Soccer)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/basketball.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>농구 (Basketball)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/baseball-outline.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>야구 (Baseball)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/volleyball.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>배구 (Volleyball)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/handball.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>핸드볼 (Handball)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/tennis-ball.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>테니스 (Tennis)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/rugby.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>럭비 (Rugby)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/football.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>미식축구 (Football)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/hockey-puck.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>아이스하키 (Ice Hockey)</span>
                  </span>
                  {/**/}
                </span>
                <span className="font-medium inline-flex items-center text-xs px-2 gap-1 rounded-md text-default bg-elevated py-2">
                  {/**/}
                  <span className="inline-flex items-center gap-2">
                    <img
                      src="/assets/icons/sports/controller.svg"
                      width={18}
                      height={18}
                      alt=""
                    />
                    <span>E-스포츠 (E-Sports)</span>
                  </span>
                  {/**/}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[hsla(0,0%,9%,1)]">
              <div className="text-xl font-semibold mb-6 border-b border-white/10 p-6">
                {" "}
                스포츠 제공 서비스 체크{" "}
              </div>
              <ul className="space-y-4 px-6 pb-6">
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/steam.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>인플레이 실시간 소켓 데이터 제공</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/banknotes.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>인플레이 경기 구독 방식으로 비용 절감 가능</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/chart-pie.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>팀별 승률 분석 데이터 제공</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/cog.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>라이브 트래커 시스템 제공</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/user-circle.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>팀, 리그, 경기 분석 데이터 제공</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/controller.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>팀, 선수, 로고 등 다양한 프로필 및 이미지 제공</span>
                </li>
                <li className="flex items-center gap-3 text-neutral-300">
                  <img
                    src="/assets/icons/sports/video-check.svg"
                    width={18}
                    height={18}
                    alt=""
                  />
                  <span>비디오 하이라이트 제공</span>
                </li>
              </ul>
            </div>
          </div>
          {/**/}
        </div>
        {/**/}
      </div>
    </section>
  );
}
