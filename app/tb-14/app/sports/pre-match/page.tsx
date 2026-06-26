"use client"
import { useState } from 'react'
import SportsLayout from '@/components/SportsLayout'
import Image from 'next/image'

export default function PreMatchSportsPage() {
  const [searchText, setSearchText] = useState<string>("")
  return (
    <SportsLayout>
      <div className="main-sport">
          <div className="sport-container" id="all-sports">
            <div className="sport-wrapper">
              <div className="sport-inner">
                <div className="sport-list">
                  <div className="sport-headContainer">
                    <div className="match-listHead">
                      <div className="match-headBox">
                        <div className="match-headTitle">전체</div>
                        <button
                          className="match-headBtn modal-trigger"
                          data-target="betting-rules-modal-container"
                        >
                          <div className="match-headBtntext">베팅규정</div>
                        </button>
                      </div>

                      <form className="match-searchForm" onSubmit={(e) => e.preventDefault()}>
                        <label className="match-searchLabel">
                          <label className="match-searchInner">
                            <div className="match-searchInputBox">
                              <input
                                autoComplete="off"
                                placeholder="검색어 입력해주세요"
                                spellCheck={false}
                                className="match-searchInput"
                                type="text"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                name="searchText"
                              />
                            </div>
                            <button
                              type="button"
                                disabled={false}
                              className="match-searchBtn"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                className="match-searchIcon"
                              >
                                <path
                                  fill="currentColor"
                                  d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                                />
                              </svg>
                            </button>
                          </label>
                        </label>
                      </form>

                      <div className="match-tabContainer">
                        <div className="match-tabItem active">
                          <div className="match-tabInner">
                            <button className="match-tabBtn active">
                              <span className="match-tabText">
                                24시간이내
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="match-tabItem">
                          <div className="match-tabInner">
                            <button className="match-tabBtn active">
                              <span className="match-tabText"> 시간순 </span>
                            </button>
                            <button className="match-tabBtn">
                              <span className="match-tabText"> 인기순 </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="match-list">
                    <div className="match-leagueGroup">
                      <button className="match-leagueBtn">
                        <div className="match-leagueInner">
                          <div className="match-leagueTitle">
                            <span className="match-leagueTime">오늘 17:25</span>
                          </div>
                          <div className="match-leagueToggle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 1024 1024"
                              className="match-leagueIcon"
                            >
                              <path
                                fill="currentColor"
                                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>

                      <div className="match-leagueBox">
                        <div className="match-leagueItem">
                          <a href="#" className="match-leagueLink">
                            <div className="match-linkContainer">
                              <div className="match-linkBox">
                                <div className="match-linkTime">
                                  06/19 17:25
                                </div>
                                <div className="match-linkContent">
                                  <div className="match-linkIcon">
                                    <div className="match-linkImg">
                                      <Image src="https://p.staticube.com/common/e98d6e8c-46e2-4fb3-bf6d-6195d68ab656.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                    <div className="match-linkImg">
                                      <Image src="https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                  </div>
                                  <div className="match-linkTitle">
                                    세계 • TT컵 남자 단식
                                  </div>
                                </div>
                              </div>
                              <div className="match-moreBtn">
                                +0 더보기 &gt;
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="match-list">
                    <div className="match-leagueGroup">
                      <button className="match-leagueBtn">
                        <div className="match-leagueInner">
                          <div className="match-leagueTitle">
                            <span className="match-leagueTime">오늘 19:00</span>
                          </div>
                          <div className="match-leagueToggle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 1024 1024"
                              className="match-leagueIcon"
                            >
                              <path
                                fill="currentColor"
                                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>

                      <div className="match-leagueBox">
                        <div className="match-leagueItem">
                          <a href="#" className="match-leagueLink">
                            <div className="match-linkContainer">
                              <div className="match-linkBox">
                                <div className="match-linkTime">
                                  06/19 17:25
                                </div>
                                <div className="match-linkContent">
                                  <div className="match-linkIcon">
                                    <div className="match-linkImg">
                                      <Image src="https://p.staticube.com/common/e98d6e8c-46e2-4fb3-bf6d-6195d68ab656.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                    <div className="match-linkImg">
                                      <Image src="https://p.staticube.com/common/fe7b60e7-882c-45d8-8038-7f59ab55953e.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                  </div>
                                  <div className="match-linkTitle">
                                    세계 • TT컵 남자 단식
                                  </div>
                                </div>
                              </div>
                              <div className="match-moreBtn">
                                +0 더보기 &gt;
                              </div>
                            </div>
                          </a>

                          <div className="match-marketContainer">
                            <div className="match-market">
                              <div className="match-marketItem">
                                <div className="match-marketTitle">승패</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    Jan Trefny
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="1.83"
                                  >
                                    1.83
                                  </span>
                                </button>
                                <div className="match-marketVersus">VS</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    Petr Vodal
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="1.57"
                                  >
                                    1.57
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="match-list">
                    <div className="match-leagueGroup">
                      <button className="match-leagueBtn">
                        <div className="match-leagueInner">
                          <div className="match-leagueTitle">
                            <span className="match-leagueTime">오늘 20:00</span>
                          </div>
                          <div className="match-leagueToggle">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 1024 1024"
                              className="match-leagueIcon"
                            >
                              <path
                                fill="currentColor"
                                d="m488.832 344.32l-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872l319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>

                      <div className="match-leagueBox">
                        <div className="match-leagueItem">
                          <a href="#" className="match-leagueLink">
                            <div className="match-linkContainer">
                              <div className="match-linkBox">
                                <div className="match-linkTime">
                                  06/19 17:25
                                </div>
                                <div className="match-linkContent">
                                  <div className="match-linkIcon">
                                    <div className="match-linkImg">
                                      <Image src="/assets/svg/baseball.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                    <div className="match-linkImg">
                                        alt="국기이미지"
                                      <Image src="/assets/svg/svgcountrybig/jp.svg" alt="국기이미지" width={19} height={19} />
                                    </div>
                                  </div>
                                  <div className="match-linkTitle">
                                    대한민국 • WK W
                                  </div>
                                </div>
                              </div>
                              <div className="match-moreBtn">
                                +0 더보기 &gt;
                              </div>
                            </div>
                          </a>
                          <div className="match-marketContainer">
                            <div className="match-market">
                              <div className="match-marketItem">
                                <div className="match-marketTitle">승무패</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>수원 FC 위민 W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="2.10"
                                    >2.10</span
                                  >
                                </button>
                                <div className="match-marketVersus">4.25</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>창녕 WFC W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="3.60"
                                    >3.60</span
                                  >
                                </button>
                              </div>
                            </div>
                            <div className="match-market">
                              <div className="match-marketItem">
                                <div className="match-marketTitle">승무패</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>서울시청 W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="1.95"
                                    >1.95</span
                                  >
                                </button>
                                <div className="match-marketVersus">3.80</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>보은 상무 W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="4.10"
                                    >4.10</span
                                  >
                                </button>
                              </div>
                            </div>
                            <div className="match-market">
                              <div className="match-marketItem">
                                <div className="match-marketTitle">승무패</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>화천 KSPO W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="2.30"
                                    >2.30</span
                                  >
                                </button>
                                <div className="match-marketVersus">3.95</div>
                                <button className="match-marketBtn">
                                  <strong className="match-marketName">
                                    <p>경주 한수원 W</p>
                                  </strong>
                                  <span
                                    className="match-marketOdds"
                                    data-odds="3.05"
                                    >3.05</span
                                  >
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sport-wrapper detail">
              <div className="sport-inner">
                <div className="sport-detail">
                  <div className="detail-tabContainer">
                    <div className="detail-tabHead">
                      <div className="detail-tab">
                        <div className="detail-tabInner">
                          <button className="detail-tabBtn active">
                            <span className="detail-tabText">전체</span>
                          </button>
                          <button className="detail-tabBtn">
                            <span className="detail-tabText">기타 </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="detail-marketContainer">
                    <div className="detail-market">
                      <button className="detail-marketHeader">
                        <div className="detail-marketTitle">
                          <span className="detail-marketTitleText">승패</span>
                        </div>
                        <div className="detail-marketToggle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              fill="currentColor"
                              d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z"
                            />
                          </svg>
                        </div>
                      </button>

                      <div className="detail-marketItem">
                        <div className="detail-marketInner">
                          <button className="detail-marketBtn">
                            <strong className="detail-marketName">
                              <p>Jan Trefny</p>
                            </strong>
                            <span className="detail-marketOdds" data-odds="1.83"
                              >1.83</span
                            >
                          </button>
                          <button className="detail-marketBtn">
                            <strong className="detail-marketName">
                              <p>Petr Vodal</p>
                            </strong>
                            <span className="detail-marketOdds" data-odds="1.57"
                              >1.57</span
                            >
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="detail-market">
                      <button className="detail-marketHeader">
                        <div className="detail-marketTitle">
                          <span className="detail-marketTitleText"
                            >핸디캡 [세트]</span
                          >
                        </div>
                        <div className="detail-marketToggle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              fill="currentColor"
                              d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z"
                            />
                          </svg>
                        </div>
                      </button>

                      <div className="detail-marketItem">
                        <div className="detail-marketInner">
                          <button className="detail-marketBtn">
                            <div className="detail-marketName">
                              <p>David Mutl</p>
                            </div>
                            <span className="detail-marketOdds">
                              1.58
                              <span className="detail-marketHandicap">
                                (+1.5)
                              </span>
                            </span>
                          </button>
                          <button className="detail-marketBtn">
                            <strong className="detail-marketName">
                              <p>Zdenek Bulin</p>
                            </strong>
                            <span
                              className="detail-marketOdds"
                              data-odds="2.24"
                            >
                              2.24
                              <span className="detail-marketHandicap">
                                (-1.5)
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="detail-market">
                      <button className="detail-marketHeader">
                        <div className="detail-marketTitle">
                          <span className="detail-marketTitleText"
                            >언더오버</span
                          >
                        </div>
                        <div className="detail-marketToggle">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              fill="currentColor"
                              d="M8.2 751.4c0 8.6 3.4 17.401 10 24.001c13.2 13.2 34.8 13.2 48 0l451.8-451.8l445.2 445.2c13.2 13.2 34.8 13.2 48 0s13.2-34.8 0-48L542 251.401c-13.2-13.2-34.8-13.2-48 0l-475.8 475.8c-6.8 6.8-10 15.4-10 24.2z"
                            />
                          </svg>
                        </div>
                      </button>

                      <div className="detail-marketItem">
                        <div className="detail-marketInner">
                          <button className="detail-marketBtn">
                            <strong className="detail-marketName">
                              <p>오버</p>
                            </strong>
                            <span className="detail-marketOdds">
                              2.26
                              <span className="detail-marketHandicap">
                                (-1.5)
                              </span>
                            </span>
                          </button>
                          <button className="detail-marketBtn">
                            <strong className="detail-marketName">
                              <p>언더</p>
                            </strong>
                            <span className="detail-marketOdds">
                              1.57
                              <span className="detail-marketHandicap">
                                (+1.5)
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </SportsLayout>
  )
}