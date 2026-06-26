export default function SponsorshipJourney() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="relative py-4">
        <div className="relative py-4">
          <div className="sticky z-100 w-full bg-layer2 sm:top-15 sm:mb-8">
            <div
              className="grid smooth-scroll smooth-list snap-x relative snap-mandatory grid-flow-col overflow-x-scroll overflow-y-hidden scroll-smooth hide-scroll cursor-grab mb-4"
              style={
                {
                  ["--grid-padding" as any]: "0px",
                  display: "flex",
                } as React.CSSProperties
              }
            >
              <div>
                <div className="mt-4 flex cursor-pointer flex-col pr-16 ml-10">
                  <div className="border-t-2 border-solid border-t-[#D2D2D2] w-[calc(100%+105px)] relative -left-10" />
                  <div
                    className="-mt-px h-3.25 w-3.25 -translate-y-1/2 rounded-full"
                    style={{
                      backgroundClip: "padding-box, border-box",
                      backgroundImage:
                        "linear-gradient(to right,#38EB6A,#38EB6A),linear-gradient(to right,#24EE8933,#24EE8933)",
                      backgroundOrigin: "padding-box, border-box",
                      border: "3px solid transparent",
                    }}
                  />
                  <div className="mt-5 text-sm text-secondary">2022/08</div>
                  <div className="text-base font-extrabold text-brand">
                    Cloud 9-CS:GO
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4 flex cursor-pointer flex-col pr-16">
                  <div className="border-t-2 border-solid border-t-[#D2D2D2] w-[calc(100%+65px)]" />
                  <div className="-mt-px h-3.25 w-3.25 -translate-y-1/2 rounded-full border-[3px] border-solid border-[#D2D2D2] bg-[#B3BEC1]" />
                  <div className="mt-5 text-sm text-secondary">2022/09</div>
                  <div className="text-base font-extrabold text-primary">
                    AFA
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4 flex cursor-pointer flex-col pr-16">
                  <div className="border-t-2 border-solid border-t-[#D2D2D2] w-[calc(100%+65px)]" />
                  <div className="-mt-px h-3.25 w-3.25 -translate-y-1/2 rounded-full border-[3px] border-solid border-[#D2D2D2] bg-[#B3BEC1]" />
                  <div className="mt-5 text-sm text-secondary">2022/12</div>
                  <div className="text-base font-extrabold text-primary">
                    David Luiz
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4 flex cursor-pointer flex-col pr-16">
                  <div className="border-t-2 border-solid border-t-[#D2D2D2] w-[calc(100%+65px)]" />
                  <div className="-mt-px h-3.25 w-3.25 -translate-y-1/2 rounded-full border-[3px] border-solid border-[#D2D2D2] bg-[#B3BEC1]" />
                  <div className="mt-5 text-sm text-secondary">2023/05</div>
                  <div className="text-base font-extrabold text-primary">
                    Suniel Shetty{" "}
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-4 flex cursor-pointer flex-col pr-16 mr-10">
                  <div className="border-t-2 border-solid border-t-[#D2D2D2] w-[calc(100%+105px)] relative" />
                  <div className="-mt-px h-3.25 w-3.25 -translate-y-1/2 rounded-full border-[3px] border-solid border-[#D2D2D2] bg-[#B3BEC1]" />
                  <div className="mt-5 text-sm text-secondary">2024/08</div>
                  <div className="text-base font-extrabold text-primary">
                    Cloud 9-DOTA 2
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute left-0 top-0 h-full w-16 bg-linear-to-l from-[#F4F4F400] to-[#F4F4F4]" />
            <div className="absolute right-0 top-0 h-full w-16 bg-linear-to-r from-[#F4F4F400] to-[#F4F4F4]" />
            <div className="big-arrow *:absolute *:top-9 *:size-10 *:bg-transparent *:bg-none [&>*:last-child]:right-0 flex gap-x-1">
              <button
                className="button button-second button-m size-8 bg-layer5 p-0!"
                disabled
                type="button"
              >
                <div className="icon size-4!">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
              <button
                className="button button-second button-m size-8 bg-layer5 p-0!"
                disabled
                type="button"
              >
                <div className="icon size-4! rotate-180">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="relative w-full overflow-hidden">
            <div
              className="relative flex duration-300"
              style={{
                transform: "translateX(0%)",
              }}
            >
              <div className="w-full shrink-0 grow-0">
                <div className="relative">
                  <div className="relative flex h-full flex-col rounded-l-xl rounded-br-xl sm:rounded-xl overflow-hidden">
                    <img
                      alt="bg"
                      src="https://bc.game/modules/static2/assets/bg-light-CDLFKXt8.png"
                    />
                    <div className="size-full">
                      <div className="left-0 top-0 h-full w-full sm:absolute sm:flex sm:justify-between sm:px-9 overflow-hidden sm:rounded-xl">
                        <img
                          alt=""
                          className="absolute left-0 z-10 h-44 w-full -bottom-10"
                          src="https://bc.game/modules/static2/assets/l-line-BPPcU_jk.png"
                        />
                        <div className="round-lg absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end sm:relative sm:justify-center!">
                          <div className="mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:max-w-96">
                            <div className="center text-left text-3xl font-extrabold text-primary">
                              <div className="mr-3">
                                <img
                                  alt=""
                                  className="h-16"
                                  src="https://bc.game/modules/static2/assets/logo-CuNbmGt1.png"
                                />
                              </div>
                              <div>
                                <div>Cloud9</div>
                                <div>CS:GO</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end bg-layer6 px-3 py-1 text-sm font-semibold text-secondary mt-6 rounded-full">
                              <img
                                className="h-3 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJYSURBVHgBvZZNbtpAFMffe9SplG5YVUKiBDaV0lYVnKDmBKEnKL1BOEE4Qm7Q5ATlBtATQJumkbrhyypSN2XTVkrEvL5nbOpYYMYG5b/Ag8fjn+d9DsADC2HPupnOXObFCQPmgWFMRL3jZ4Xe3oEKMoY/AHI5PoeAHXSwdVwojPYCvPFm74wxF8HfObO5RKA5A5cJ6A0vP2JEDtV3BkZhzHz5xNydViqV+Wp+OCsbMh9lm1XZaW8nYBz26qjYXPdcfzjMO7mDocDyBBllC1PVdMfyjI4zAb9NJg1b2H/RSH8fbX/5j644f3S4uG2FvjFMDcQ0MH9VWeM1cYdqewNclWHzDx10h/Jf799JYABxzR7mo06W1y269rwqG+yqwyWRB4fmth6NQhtJjp4ZNm15h10e7gINYTpGWLy1CpqXxeIAiessSa35FDWvLWwB/P5FqdShLQvc64nXzAKNw16XihcACT6M5pmzcGrPK08HOrYx7ybYRuC2pE6C6hwY7K+DrQXaVpAk6NV42s4hD9Rn8XWYBWYD3aQV0O9nbLq2sKzQVZT6zXP5DZ00FSRt9PrAL1KMtVOj3ySxBZb67v2sroP+JqedCCQmV6/M8FmPAWAhDX2pqf2vY+88CkXGkRT7jSYNu8XSBAi/wBIW5hmh6YX3FSqXStLa0IfzJQ/LkAIWlitIIR/IxP4iMYV7NZ26trB4UttolRZBo3UhOF1FfalR9zf3+EzmT3eB3QPq6Up22g2OdGrenuTjJxkcSfQ1MPCz3GtJ2pxDRt2vNDFoTHPpZ6l9Ftc/YH3kvvmMDhoAAAAASUVORK5CYII="
                              />
                              <span className="ml-2">Ended 2025.02</span>
                            </div>
                            <div className="center mb-2 cursor-pointer text-sm font-normal text-primary sm:mt-6 sm:flex sm:justify-around">
                              <p className="border-b border-solid border-third">
                                <span>Official website</span>
                              </p>
                              <img
                                className="ml-1 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAATCAMAAAC0hZ1zAAAAP1BMVEUAAACzv8C0vsGyvsGzvsGzvsKvv7+zvsKzv7+1v8K0v8CzvsGzvb+zv8Ozv8KzvsKyv7+zv8OzvcKyvMKzvsFgrAS3AAAAFHRSTlMAIN9g76AQv0AwcM+Af6+QUECvUBP7IUkAAADKSURBVCjPbZHbDgMhCEQRxKp7b/n/b+0ISbPpOg8aPQ436a7SLnoq0JbNTMuULeZaZnQb4IVlnUA260TdLE+iwjN2bOlJs98mQHoK6bgXNXvRX3+NqGXQYazwX4VCaZTIkhqbuLFnw5acsblYm7hxi3Nu0UJe4oHuwzGAB0OqqF1wdFV0uiNeHsk/UV6TqjE9SVpxgZNQjZGI8ZkCsxCESZ9U4H/LhlUQTNnxIXtk6xbi4i0LWyg+YI1cv4kCB3Olrkelm+qhfbz9Am3mDy8hpuL7AAAAAElFTkSuQmCC"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-0">
                          <img
                            alt=""
                            className="rounded-lg sm:w-auto"
                            src="https://bc.game/modules/static2/assets/csgo-p-light-CFH7_68C.png"
                          />
                          <div className="left-1/2 z-100 flex w-full -translate-x-1/2 items-center justify-between flex-row-reverse absolute top-60">
                            <div className="mr-6 text-xs text-quarterary sm:mr-0">
                              @2022
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-layer4 px-7 py-6">
                  <div className="flex">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Cloud9 Official Partner – CS:GO (August 2023 – March
                        2024)
                      </p>
                      <p className="my-0 p-0 font-[italic] text-sm font-normal leading-normal text-secondary">
                        This partnership concluded in March 2024. The following
                        content is provided for historical reference only.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        BC.GAME was proud to establish an official partnership
                        with Cloud9, marking a significant milestone in the
                        esports industry. This high-profile collaboration
                        offered the BC.GAME community a unique opportunity to
                        engage with the dynamic and rapidly growing esports
                        ecosystem led by Cloud9.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        As the Crypto Casino of the Year at the time, BC.GAME
                        supported Cloud9 across its CS2 initiatives while also
                        laying the groundwork for future innovations in iGaming.
                        The partnership helped enrich the gaming experience for
                        fans of both communities, fostering a vibrant and
                        competitive environment.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Cloud9 is widely recognised for its prominent role in
                        the League Championship Series, as well as its
                        remarkable underdog journey at ELEAGUE Boston 2018—where
                        they became the first, and to date only, North American
                        team to win a Major. With a roster of top-tier esports
                        players from around the globe, Cloud9’s legacy remains
                        influential in the industry.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Collaborating with such a legendary organisation was an
                        immense honour for BC.GAME. This partnership represented
                        a meaningful step in our journey to connect iGaming and
                        esports, paving the way for future possibilities.
                      </p>
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/cs-1-BdDOgapH.png"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Ushering in a New Era of Esports and iGaming
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Have you ever envisioned a world where esports and
                        iGaming converge on a single, monumental stage, allowing
                        both communities to seamlessly interact?
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This collaboration between BC.GAME and Cloud9 marked the
                        beginning of such a vision—ushering in a new era in
                        digital entertainment where crypto casinos and
                        competitive gaming intersect. As technology continues to
                        advance, so does the landscape of iGaming, and BC.GAME
                        proudly took part in this evolution.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Though the partnership has concluded, it stands as a key
                        chapter in BC.GAME’s mission to innovate at the
                        crossroads of esports and blockchain gaming—an early
                        sign of the exciting possibilities still to come.
                      </p>
                      <p className="mt-3 rounded-md p-2 text-sm font-semibold leading-normal text-secondary bg-layer5" />
                      <p className="text-sm font-extrabold text-secondary">
                        Disclaimer:
                      </p>
                      <p className="mt-3 text-xs font-semibold text-secondary">
                        The partnership between BC.GAME and the Cloud 9 CS:GO
                        officially concluded in March 2024. Any references to
                        Cloud 9 CS:GO on this page relate solely to the
                        historical collaboration during the term of the
                        agreement and do not imply current sponsorship,
                        endorsement, or authorization. This content is intended
                        for informational purposes only. BC.GAME does not
                        currently maintain any official relationship with Cloud
                        9 CS:GO.
                      </p>
                      <p />
                    </div>
                    <div className="flex-1 mr-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/cs-2-BJxYug0r.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full shrink-0 grow-0 invisible h-0">
                <div className="relative">
                  <div className="relative flex h-full flex-col rounded-l-xl rounded-br-xl sm:rounded-xl overflow-hidden">
                    <img
                      alt="bg"
                      src="/modules/static2/assets/bg-light-CDLFKXt8.png"
                    />
                    <div className="size-full">
                      <div className="left-0 top-0 h-full w-full sm:absolute sm:flex sm:justify-between sm:px-9 overflow-hidden sm:rounded-xl">
                        <img
                          alt=""
                          className="absolute left-0 z-10 h-44 w-full -bottom-10"
                          src="/modules/static2/assets/l-line-BPPcU_jk.png"
                        />
                        <div className="round-lg absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end sm:relative sm:justify-center!">
                          <div className="mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:max-w-96">
                            <div className="center text-left text-3xl font-extrabold text-primary">
                              <div className="mr-3">
                                <img
                                  alt=""
                                  className="h-16"
                                  src="/modules/static2/assets/logo-PlP-zcnf.png"
                                />
                              </div>
                              <div>
                                <div>Argentine Football</div>
                                <div>Association</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end bg-layer6 px-3 py-1 text-sm font-semibold text-secondary mt-6 rounded-full">
                              <img
                                className="h-3 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJYSURBVHgBvZZNbtpAFMffe9SplG5YVUKiBDaV0lYVnKDmBKEnKL1BOEE4Qm7Q5ATlBtATQJumkbrhyypSN2XTVkrEvL5nbOpYYMYG5b/Ag8fjn+d9DsADC2HPupnOXObFCQPmgWFMRL3jZ4Xe3oEKMoY/AHI5PoeAHXSwdVwojPYCvPFm74wxF8HfObO5RKA5A5cJ6A0vP2JEDtV3BkZhzHz5xNydViqV+Wp+OCsbMh9lm1XZaW8nYBz26qjYXPdcfzjMO7mDocDyBBllC1PVdMfyjI4zAb9NJg1b2H/RSH8fbX/5j644f3S4uG2FvjFMDcQ0MH9VWeM1cYdqewNclWHzDx10h/Jf799JYABxzR7mo06W1y269rwqG+yqwyWRB4fmth6NQhtJjp4ZNm15h10e7gINYTpGWLy1CpqXxeIAiessSa35FDWvLWwB/P5FqdShLQvc64nXzAKNw16XihcACT6M5pmzcGrPK08HOrYx7ybYRuC2pE6C6hwY7K+DrQXaVpAk6NV42s4hD9Rn8XWYBWYD3aQV0O9nbLq2sKzQVZT6zXP5DZ00FSRt9PrAL1KMtVOj3ySxBZb67v2sroP+JqedCCQmV6/M8FmPAWAhDX2pqf2vY+88CkXGkRT7jSYNu8XSBAi/wBIW5hmh6YX3FSqXStLa0IfzJQ/LkAIWlitIIR/IxP4iMYV7NZ26trB4UttolRZBo3UhOF1FfalR9zf3+EzmT3eB3QPq6Up22g2OdGrenuTjJxkcSfQ1MPCz3GtJ2pxDRt2vNDFoTHPpZ6l9Ftc/YH3kvvmMDhoAAAAASUVORK5CYII="
                              />
                              <span className="ml-2">Ended 2024.08</span>
                            </div>
                            <div className="center mb-2 cursor-pointer text-sm font-normal text-primary sm:mt-6 sm:flex sm:justify-around">
                              <p className="border-b border-solid border-third">
                                <span>Official website AFA</span>
                              </p>
                              <img
                                className="ml-1 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJvSURBVHgBpVVBdtpADJVmynvZ1TdoeoN23dfANKu+hLQ5AeQEbU4AnAByAsgJmkD6uiIGeoCkN+AI7ItHlcbYHvsZ10n+xh6PRl+jL8kIJfgRhsEBHAQWbHBiPjzCC4D+Yhb+bgFRD4BaOSPEiYZo8NmYNTyXgJ33gGy/wnaDGr6fNpvX8FSC6XzVRaSx93nBN/nj3hC+EMBhtqX6bfNxADWBnO/DBqkwdUJ20D42fd9oNg/77Lj3HBKlrW4lziXXRecC942J0w+cSrk11IACzARFiK72GQoJor3MTkZQi0Ajvk4WJ8ZUluSpMSOF9j3fmIXWMA1XX39xiqvO4PR+OWGlO/HKmrYxizJD0eoV6XGxhN2xijJWQFwxiSHozj7nUghlzgVE1I14v+w2KlLRDT83iaHrhwIk8rQQANYiOKG9EE3cWs7y/pbUw88wfJcjODdmw6k5z8Kx/bv5apxPQXQbO7HXf1mDrYLRmTET0UTWvJVoF1gmuVsuO1lWdpiGYRdJ+Y4ft6yJCyBOUyDPBuih3JQIL8+Oj0bpeV9L5znWMzeL5HrW5RqCLB14ZRWPCcA3SLabdTUu2p+OjH++0JAbDvBtjmAXab6zSyDEmiMsqxr/JorwQhUNOCVrzquJa73U/WKfc7eLdpK8k4ImQgXkNhpAqiJg6xY7Hv2vGQWz+yU5AoBbhBrwp21R3CJ2Oj4AxA2o6hD4c4eJhmW9koBAf0veLUTLWgRS88VpWkYi36SEXSBcCA2ARa0UpQ4K/wVXxog3jpNEq2yUSKdLYE8iEOwacgi7XimF99Oqp4EHiWqbjuwieHBKB3s/rX/Nwj1/j709QAAAAABJRU5ErkJggg=="
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-9">
                          <img
                            alt=""
                            className="rounded-lg sm:w-auto"
                            src="/modules/static2/assets/banner_w-BCTg-RpZ.png"
                          />
                          <div className="left-1/2 z-100 flex w-full -translate-x-1/2 items-center justify-between absolute top-48">
                            <div className="ml-9 flex items-center justify-center gap-1 font-[italic] text-xs font-normal leading-normal text-secondary sm:ml-0">
                              This reference is for historical documentation
                              only. The partnership ended in August 2024.
                            </div>
                            <div className="mr-6 text-xs text-quarterary sm:mr-0">
                              @2022
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-layer4 px-7 py-6">
                  <div className="flex">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Global Crypto Casino Partner (September 2022 – August
                        2024)
                      </p>
                      <p className="my-0 p-0 font-[italic] text-sm font-normal leading-normal text-secondary">
                        This partnership concluded in August 2024. The following
                        content is provided for historical reference only.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        From September 2022 to August 2024, BC.GAME served as
                        the official global crypto casino sponsor of the
                        Argentine Football Association (AFA)—an organization
                        representing one of the most iconic national teams in
                        world football.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        The collaboration aimed to bridge the emerging world of
                        blockchain gaming with international football,
                        supporting key AFA campaigns during that time, including
                        the FIFA World Cup in Qatar.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This strategic alignment between BC.GAME and AFA sought
                        to explore the intersection of iGaming, Web3, and sports
                        engagement. During the active period of the partnership,
                        BC.GAME and AFA co-developed exclusive content and fan
                        experiences designed to bring added value to both crypto
                        users and football supporters.
                      </p>
                      <p className="text-base font-extrabold leading-normal text-primary mt-4">
                        A New Era (2022–2024 Retrospective)
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        During the period of collaboration, BC.GAME and AFA
                        explored new digital touchpoints—introducing initiatives
                        where Web3 technologies, gamified ecosystems, and sports
                        culture overlapped to provide fans with enhanced digital
                        experiences.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        BC.GAME supported the vision of enabling more immersive,
                        community-based ecosystems in entertainment, with
                        football serving as a global platform to trial these
                        innovations.
                      </p>
                      <p className="text-base font-extrabold leading-normal text-primary mt-4">
                        The Activation Phase (Past Campaign)
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This six-month activation program included a range of
                        digital engagement efforts, crypto-powered rewards, and
                        limited-time branded content experiences. Both parties
                        jointly developed initiatives designed to enhance fan
                        participation and global reach at the time.
                      </p>
                      <p className="mt-3 rounded-md p-2 text-sm font-semibold leading-normal text-secondary bg-layer5" />
                      <p className="text-sm font-extrabold text-secondary">
                        Disclaimer:
                      </p>
                      <p className="mt-3 text-xs font-semibold text-secondary">
                        The partnership between BC.GAME and the Argentine
                        Football Association officially concluded in August
                        2024. Any references to AFA on this page relate solely
                        to the historical collaboration during the term of the
                        agreement and do not imply current sponsorship,
                        endorsement, or authorization. This content is intended
                        for informational purposes only. BC.GAME does not
                        currently maintain any official relationship with AFA.
                      </p>
                      <p />
                    </div>
                    <div className="flex-1 ml-6">
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src="https://www.afa.com.ar/es/posts/la-asociacion-del-futbol-argentino-presenta-su-acuerdo-de-patrocinio-con-bc.game"
                        style={{
                          borderRadius: "8px",
                          height: "100%",
                          minHeight: "440px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full shrink-0 grow-0 invisible h-0">
                <div className="relative">
                  <div className="relative flex h-full flex-col rounded-l-xl rounded-br-xl sm:rounded-xl overflow-hidden">
                    <img
                      alt="bg"
                      src="/modules/static2/assets/bg-light-CDLFKXt8.png"
                    />
                    <div className="size-full">
                      <div className="left-0 top-0 h-full w-full sm:absolute sm:flex sm:justify-between sm:px-9 overflow-hidden sm:rounded-xl">
                        <img
                          alt=""
                          className="absolute left-0 z-10 h-44 w-full -bottom-10"
                          src="/modules/static2/assets/l-line-BPPcU_jk.png"
                        />
                        <div className="round-lg absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end sm:relative sm:justify-center!">
                          <div className="mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:max-w-96">
                            <div className="center text-left text-3xl font-extrabold text-primary">
                              <div className="mr-3">
                                <img
                                  alt=""
                                  className="h-16"
                                  src="/modules/static2/assets/logo_w-DjoRvuz3.png"
                                />
                              </div>
                              <div>
                                <div>David</div>
                                <div>Luiz</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end bg-layer6 px-3 py-1 text-sm font-semibold text-secondary mt-6 rounded-full">
                              <img
                                className="h-3 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJYSURBVHgBvZZNbtpAFMffe9SplG5YVUKiBDaV0lYVnKDmBKEnKL1BOEE4Qm7Q5ATlBtATQJumkbrhyypSN2XTVkrEvL5nbOpYYMYG5b/Ag8fjn+d9DsADC2HPupnOXObFCQPmgWFMRL3jZ4Xe3oEKMoY/AHI5PoeAHXSwdVwojPYCvPFm74wxF8HfObO5RKA5A5cJ6A0vP2JEDtV3BkZhzHz5xNydViqV+Wp+OCsbMh9lm1XZaW8nYBz26qjYXPdcfzjMO7mDocDyBBllC1PVdMfyjI4zAb9NJg1b2H/RSH8fbX/5j644f3S4uG2FvjFMDcQ0MH9VWeM1cYdqewNclWHzDx10h/Jf799JYABxzR7mo06W1y269rwqG+yqwyWRB4fmth6NQhtJjp4ZNm15h10e7gINYTpGWLy1CpqXxeIAiessSa35FDWvLWwB/P5FqdShLQvc64nXzAKNw16XihcACT6M5pmzcGrPK08HOrYx7ybYRuC2pE6C6hwY7K+DrQXaVpAk6NV42s4hD9Rn8XWYBWYD3aQV0O9nbLq2sKzQVZT6zXP5DZ00FSRt9PrAL1KMtVOj3ySxBZb67v2sroP+JqedCCQmV6/M8FmPAWAhDX2pqf2vY+88CkXGkRT7jSYNu8XSBAi/wBIW5hmh6YX3FSqXStLa0IfzJQ/LkAIWlitIIR/IxP4iMYV7NZ26trB4UttolRZBo3UhOF1FfalR9zf3+EzmT3eB3QPq6Up22g2OdGrenuTjJxkcSfQ1MPCz3GtJ2pxDRt2vNDFoTHPpZ6l9Ftc/YH3kvvmMDhoAAAAASUVORK5CYII="
                              />
                              <span className="ml-2">Ended 2024.05</span>
                            </div>
                            <div className="center mb-2 cursor-pointer text-sm font-normal text-primary sm:mt-6 sm:flex sm:justify-around">
                              <p className="border-b border-solid border-third">
                                <span>Official website</span>
                              </p>
                              <img
                                className="ml-1 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJvSURBVHgBpVVBdtpADJVmynvZ1TdoeoN23dfANKu+hLQ5AeQEbU4AnAByAsgJmkD6uiIGeoCkN+AI7ItHlcbYHvsZ10n+xh6PRl+jL8kIJfgRhsEBHAQWbHBiPjzCC4D+Yhb+bgFRD4BaOSPEiYZo8NmYNTyXgJ33gGy/wnaDGr6fNpvX8FSC6XzVRaSx93nBN/nj3hC+EMBhtqX6bfNxADWBnO/DBqkwdUJ20D42fd9oNg/77Lj3HBKlrW4lziXXRecC942J0w+cSrk11IACzARFiK72GQoJor3MTkZQi0Ajvk4WJ8ZUluSpMSOF9j3fmIXWMA1XX39xiqvO4PR+OWGlO/HKmrYxizJD0eoV6XGxhN2xijJWQFwxiSHozj7nUghlzgVE1I14v+w2KlLRDT83iaHrhwIk8rQQANYiOKG9EE3cWs7y/pbUw88wfJcjODdmw6k5z8Kx/bv5apxPQXQbO7HXf1mDrYLRmTET0UTWvJVoF1gmuVsuO1lWdpiGYRdJ+Y4ft6yJCyBOUyDPBuih3JQIL8+Oj0bpeV9L5znWMzeL5HrW5RqCLB14ZRWPCcA3SLabdTUu2p+OjH++0JAbDvBtjmAXab6zSyDEmiMsqxr/JorwQhUNOCVrzquJa73U/WKfc7eLdpK8k4ImQgXkNhpAqiJg6xY7Hv2vGQWz+yU5AoBbhBrwp21R3CJ2Oj4AxA2o6hD4c4eJhmW9koBAf0veLUTLWgRS88VpWkYi36SEXSBcCA2ARa0UpQ4K/wVXxog3jpNEq2yUSKdLYE8iEOwacgi7XimF99Oqp4EHiWqbjuwieHBKB3s/rX/Nwj1/j709QAAAAABJRU5ErkJggg=="
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-0">
                          <img
                            alt=""
                            className="rounded-lg sm:w-auto"
                            src="/modules/static2/assets/banner_w-DyHdM48J.png"
                          />
                          <div className="left-1/2 z-100 flex w-full -translate-x-1/2 items-center justify-between flex-row-reverse absolute top-60">
                            <div className="mr-6 text-xs text-quarterary sm:mr-0">
                              @2022
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-layer4 px-7 py-6">
                  <div className="flex">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        BC.GAME Official Brand Ambassador (October 2022 – April
                        2023)
                      </p>
                      <p className="my-0 p-0 font-[italic] text-sm font-normal leading-normal text-secondary">
                        This partnership has concluded. The following content is
                        provided for historical reference only.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        From October 2022 to April 2023, BC.GAME partnered with
                        David Luiz, one of Brazil’s most celebrated football
                        defenders, as its official global brand ambassador. This
                        collaboration bridged Brazilian football culture and the
                        world of crypto gaming, introducing new opportunities
                        for fan engagement and digital innovation.
                      </p>
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content1-B6-carom.png"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        A Brand New Era (2022 Retrospective)
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        As a champion of resilience and skill, David Luiz
                        represents the spirit of Brazilian football. His
                        dedication to the sport and his inspiring journey on and
                        off the field align perfectly with BC.GAME’s mission to
                        build a bold, community-first crypto gaming platform.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This partnership marks the start of a new era for Web3
                        and sports, where athletes and fans connect through
                        blockchain-powered experiences, NFTs, and digital
                        rewards. BC.GAME and Luiz aim to unite the worlds of
                        traditional sports and iGaming in a way that’s
                        immersive, interactive, and truly global.
                      </p>
                    </div>
                    <div className="flex-1 mr-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content2-BWSBC7-2.png"
                      />
                    </div>
                  </div>
                  <div className="flex mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Brazil Meets Web3
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        David Luiz’s ambassadorship is more than just a brand
                        endorsement—it’s a movement to bring the Brazilian
                        football community closer to the BC.GAME ecosystem. By
                        combining Luiz’s influence with BC.GAME’s technology, we
                        are creating a new model of fan engagement for the
                        crypto casino industry.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Together, we are building a path for shared innovation,
                        where Web3 technology and global sports culture come
                        together to inspire fans and players alike.
                      </p>
                      <p className="text-base font-extrabold leading-normal text-primary mt-4">
                        Fan Experience Highlights (Past Engagement)
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        During the ambassadorship period, David Luiz actively
                        participated in BC.GAME’s social campaigns and fan
                        initiatives. Activities included live Q&As, matchday
                        challenges, and Web3-powered giveaways that offered fans
                        direct access to unique football experiences.
                      </p>
                      <p className="mt-3 rounded-md p-2 text-sm font-semibold leading-normal text-secondary bg-layer5" />
                      <p className="text-sm font-extrabold text-secondary">
                        Disclaimer:
                      </p>
                      <p className="mt-3 text-xs font-semibold text-secondary">
                        This ambassadorship concluded in April 2023. All
                        mentions of David Luiz on this page refer solely to that
                        completed partnership period and do not imply ongoing
                        collaboration or endorsement. This content is intended
                        for informational purposes only.{" "}
                      </p>
                      <p />
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content3-BacxPM7h.png"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex min-h-100 w-full gap-4 overflow-x-auto">
                    <div className="min-w-60 flex-1 rounded-md bg-alw_dark">
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src="https://youtube.com/embed/8yN5pqjo0KU"
                        style={{
                          borderRadius: "8px",
                          height: "100%",
                          minHeight: "440px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="min-w-60 flex-1 rounded-md bg-alw_dark">
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src="https://youtube.com/embed/XBPM4BbTceg?si=uCaUwrgB1_HfxqpR"
                        style={{
                          borderRadius: "8px",
                          height: "100%",
                          minHeight: "440px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full shrink-0 grow-0 invisible h-0">
                <div className="relative">
                  <div className="relative flex h-full flex-col rounded-l-xl rounded-br-xl sm:rounded-xl overflow-hidden">
                    <img
                      alt="bg"
                      src="/modules/static2/assets/bg-light-CDLFKXt8.png"
                    />
                    <div className="size-full">
                      <div className="left-0 top-0 h-full w-full sm:absolute sm:flex sm:justify-between sm:px-9 overflow-hidden sm:rounded-xl">
                        <img
                          alt=""
                          className="absolute left-0 z-10 h-44 w-full -bottom-10"
                          src="/modules/static2/assets/l-line-BPPcU_jk.png"
                        />
                        <div className="round-lg absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end sm:relative sm:justify-center!">
                          <div className="mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:max-w-96">
                            <div className="center text-left text-3xl font-extrabold text-primary">
                              <div className="mr-3">
                                <img
                                  alt=""
                                  className="h-16"
                                  src="/modules/static2/assets/logo_w-vecTZ9vQ.png"
                                />
                              </div>
                              <div>
                                <div>Suniel</div>
                                <div>Shetty</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end bg-layer6 px-3 py-1 text-sm font-semibold text-secondary mt-6 rounded-full">
                              <img
                                className="h-3 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJYSURBVHgBvZZNbtpAFMffe9SplG5YVUKiBDaV0lYVnKDmBKEnKL1BOEE4Qm7Q5ATlBtATQJumkbrhyypSN2XTVkrEvL5nbOpYYMYG5b/Ag8fjn+d9DsADC2HPupnOXObFCQPmgWFMRL3jZ4Xe3oEKMoY/AHI5PoeAHXSwdVwojPYCvPFm74wxF8HfObO5RKA5A5cJ6A0vP2JEDtV3BkZhzHz5xNydViqV+Wp+OCsbMh9lm1XZaW8nYBz26qjYXPdcfzjMO7mDocDyBBllC1PVdMfyjI4zAb9NJg1b2H/RSH8fbX/5j644f3S4uG2FvjFMDcQ0MH9VWeM1cYdqewNclWHzDx10h/Jf799JYABxzR7mo06W1y269rwqG+yqwyWRB4fmth6NQhtJjp4ZNm15h10e7gINYTpGWLy1CpqXxeIAiessSa35FDWvLWwB/P5FqdShLQvc64nXzAKNw16XihcACT6M5pmzcGrPK08HOrYx7ybYRuC2pE6C6hwY7K+DrQXaVpAk6NV42s4hD9Rn8XWYBWYD3aQV0O9nbLq2sKzQVZT6zXP5DZ00FSRt9PrAL1KMtVOj3ySxBZb67v2sroP+JqedCCQmV6/M8FmPAWAhDX2pqf2vY+88CkXGkRT7jSYNu8XSBAi/wBIW5hmh6YX3FSqXStLa0IfzJQ/LkAIWlitIIR/IxP4iMYV7NZ26trB4UttolRZBo3UhOF1FfalR9zf3+EzmT3eB3QPq6Up22g2OdGrenuTjJxkcSfQ1MPCz3GtJ2pxDRt2vNDFoTHPpZ6l9Ftc/YH3kvvmMDhoAAAAASUVORK5CYII="
                              />
                              <span className="ml-2">Ended 2024.05</span>
                            </div>
                            <div className="center mb-2 cursor-pointer text-sm font-normal text-primary sm:mt-6 sm:flex sm:justify-around">
                              <p className="border-b border-solid border-third">
                                <span>Official website</span>
                              </p>
                              <img
                                className="ml-1 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAXCAYAAAARIY8tAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJvSURBVHgBpVVBdtpADJVmynvZ1TdoeoN23dfANKu+hLQ5AeQEbU4AnAByAsgJmkD6uiIGeoCkN+AI7ItHlcbYHvsZ10n+xh6PRl+jL8kIJfgRhsEBHAQWbHBiPjzCC4D+Yhb+bgFRD4BaOSPEiYZo8NmYNTyXgJ33gGy/wnaDGr6fNpvX8FSC6XzVRaSx93nBN/nj3hC+EMBhtqX6bfNxADWBnO/DBqkwdUJ20D42fd9oNg/77Lj3HBKlrW4lziXXRecC942J0w+cSrk11IACzARFiK72GQoJor3MTkZQi0Ajvk4WJ8ZUluSpMSOF9j3fmIXWMA1XX39xiqvO4PR+OWGlO/HKmrYxizJD0eoV6XGxhN2xijJWQFwxiSHozj7nUghlzgVE1I14v+w2KlLRDT83iaHrhwIk8rQQANYiOKG9EE3cWs7y/pbUw88wfJcjODdmw6k5z8Kx/bv5apxPQXQbO7HXf1mDrYLRmTET0UTWvJVoF1gmuVsuO1lWdpiGYRdJ+Y4ft6yJCyBOUyDPBuih3JQIL8+Oj0bpeV9L5znWMzeL5HrW5RqCLB14ZRWPCcA3SLabdTUu2p+OjH++0JAbDvBtjmAXab6zSyDEmiMsqxr/JorwQhUNOCVrzquJa73U/WKfc7eLdpK8k4ImQgXkNhpAqiJg6xY7Hv2vGQWz+yU5AoBbhBrwp21R3CJ2Oj4AxA2o6hD4c4eJhmW9koBAf0veLUTLWgRS88VpWkYi36SEXSBcCA2ARa0UpQ4K/wVXxog3jpNEq2yUSKdLYE8iEOwacgi7XimF99Oqp4EHiWqbjuwieHBKB3s/rX/Nwj1/j709QAAAAABJRU5ErkJggg=="
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-0">
                          <img
                            alt=""
                            className="rounded-lg sm:w-auto"
                            src="/modules/static2/assets/banner_w-CNIeMa3l.png"
                          />
                          <div className="left-1/2 z-100 flex w-full -translate-x-1/2 items-center justify-between flex-row-reverse absolute top-60">
                            <div className="mr-6 text-xs text-quarterary sm:mr-0">
                              @2023
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-layer4 px-7 py-6">
                  <div className="flex">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Brand Ambassador (May 2023 – May 2024)
                      </p>
                      <p className="my-0 p-0 font-[italic] text-sm font-normal leading-normal text-secondary">
                        This partnership concluded in May 2024. The following
                        content is provided for historical reference only.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        From May 2023 to May 2024, BC.GAME partnered with Suniel
                        Shetty, the legendary Bollywood actor, producer, and
                        entrepreneur, as an official brand ambassador. Known for
                        his commanding screen presence and business leadership,
                        Suniel brought a unique blend of influence and insight
                        to this collaboration.
                      </p>
                      <p className="text-base font-extrabold leading-normal text-primary mt-4">
                        Bridging Bollywood and Blockchain Gaming
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        With a prolific career across Indian cinema, Suniel
                        Shetty’s values of authenticity, innovation, and
                        discipline aligned closely with BC.GAME’s vision for
                        reshaping the iGaming experience through blockchain
                        technology. During the partnership period, his
                        endorsement elevated BC.GAME’s brand visibility and
                        trust, particularly within India’s rapidly growing Web3
                        and gaming communities.
                      </p>
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content1-BQIqUvlH.png"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Powering the Future of Gaming – 2023–2024 Campaign
                        Retrospective
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Just as Suniel Shetty has pushed boundaries in acting
                        and business, BC.GAME pursued a mission to create a
                        vibrant, tech-forward gaming platform. This partnership
                        served as a launchpad for co-branded initiatives aimed
                        at entertaining and empowering Indian gamers in a
                        decentralized future.
                      </p>
                    </div>
                    <div className="flex-1 mr-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content2-DDSr0zqj.png"
                      />
                    </div>
                  </div>
                  <div className="flex mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Cultural Guidance and Strategic Insight
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Beyond brand alignment, Suniel Shetty also offered
                        advisory input on cultural and market dynamics, helping
                        BC.GAME better understand local preferences and user
                        behaviors. His involvement supported the platform’s
                        product and community development efforts in India
                        during the active campaign period.
                      </p>
                      <p className="text-base font-extrabold leading-normal text-primary mt-4">
                        Final Note
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This collaboration officially ended in May 2024. All
                        references to Suniel Shetty herein relate to solely to
                        the historical collaboration during the term of the
                        agreement and do not imply any current sponsorship,
                        endorsement, authorisation or affiliation.
                      </p>
                      <p className="mt-3 rounded-md p-2 text-sm font-semibold leading-normal text-secondary bg-layer5" />
                      <p className="text-sm font-extrabold text-secondary">
                        Disclaimer:
                      </p>
                      <p className="mt-3 text-xs font-semibold text-secondary">
                        This content and any associated materials is intended
                        for informational purposes only and should be understood
                        within the historical context of the 2023–2024 campaign.
                      </p>
                      <p />
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/content3-BBoFY6Tn.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full shrink-0 grow-0 invisible h-0">
                <div className="relative">
                  <div className="relative flex h-full flex-col rounded-l-xl rounded-br-xl sm:rounded-xl overflow-hidden">
                    <img
                      alt="bg"
                      src="/modules/static2/assets/bg-light-CDLFKXt8.png"
                    />
                    <div className="size-full">
                      <div className="left-0 top-0 h-full w-full sm:absolute sm:flex sm:justify-between sm:px-9 overflow-hidden sm:rounded-xl">
                        <img
                          alt=""
                          className="absolute left-0 z-10 h-44 w-full -bottom-10"
                          src="/modules/static2/assets/l-line-BPPcU_jk.png"
                        />
                        <div className="round-lg absolute left-0 top-0 z-20 flex h-full w-full flex-col justify-end sm:relative sm:justify-center!">
                          <div className="mb-5 flex w-full flex-col items-center justify-center sm:mb-0 sm:max-w-96">
                            <div className="center text-left text-3xl font-extrabold text-primary">
                              <div className="mr-3">
                                <img
                                  alt=""
                                  className="h-16"
                                  src="/modules/static2/assets/logo-CuNbmGt1.png"
                                />
                              </div>
                              <div>
                                <div>Cloud9</div>
                                <div>Dota 2</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end bg-layer6 px-3 py-1 text-sm font-semibold text-secondary mt-6 rounded-full">
                              <img
                                className="h-3 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJYSURBVHgBvZZNbtpAFMffe9SplG5YVUKiBDaV0lYVnKDmBKEnKL1BOEE4Qm7Q5ATlBtATQJumkbrhyypSN2XTVkrEvL5nbOpYYMYG5b/Ag8fjn+d9DsADC2HPupnOXObFCQPmgWFMRL3jZ4Xe3oEKMoY/AHI5PoeAHXSwdVwojPYCvPFm74wxF8HfObO5RKA5A5cJ6A0vP2JEDtV3BkZhzHz5xNydViqV+Wp+OCsbMh9lm1XZaW8nYBz26qjYXPdcfzjMO7mDocDyBBllC1PVdMfyjI4zAb9NJg1b2H/RSH8fbX/5j644f3S4uG2FvjFMDcQ0MH9VWeM1cYdqewNclWHzDx10h/Jf799JYABxzR7mo06W1y269rwqG+yqwyWRB4fmth6NQhtJjp4ZNm15h10e7gINYTpGWLy1CpqXxeIAiessSa35FDWvLWwB/P5FqdShLQvc64nXzAKNw16XihcACT6M5pmzcGrPK08HOrYx7ybYRuC2pE6C6hwY7K+DrQXaVpAk6NV42s4hD9Rn8XWYBWYD3aQV0O9nbLq2sKzQVZT6zXP5DZ00FSRt9PrAL1KMtVOj3ySxBZb67v2sroP+JqedCCQmV6/M8FmPAWAhDX2pqf2vY+88CkXGkRT7jSYNu8XSBAi/wBIW5hmh6YX3FSqXStLa0IfzJQ/LkAIWlitIIR/IxP4iMYV7NZ26trB4UttolRZBo3UhOF1FfalR9zf3+EzmT3eB3QPq6Up22g2OdGrenuTjJxkcSfQ1MPCz3GtJ2pxDRt2vNDFoTHPpZ6l9Ftc/YH3kvvmMDhoAAAAASUVORK5CYII="
                              />
                              <span className="ml-2">Ended 2025.02</span>
                            </div>
                            <div className="center mb-2 cursor-pointer text-sm font-normal text-primary sm:mt-6 sm:flex sm:justify-around">
                              <p className="border-b border-solid border-third">
                                <span>Official website</span>
                              </p>
                              <img
                                className="ml-1 w-3"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAATCAMAAAC0hZ1zAAAAP1BMVEUAAACzv8C0vsGyvsGzvsGzvsKvv7+zvsKzv7+1v8K0v8CzvsGzvb+zv8Ozv8KzvsKyv7+zv8OzvcKyvMKzvsFgrAS3AAAAFHRSTlMAIN9g76AQv0AwcM+Af6+QUECvUBP7IUkAAADKSURBVCjPbZHbDgMhCEQRxKp7b/n/b+0ISbPpOg8aPQ436a7SLnoq0JbNTMuULeZaZnQb4IVlnUA260TdLE+iwjN2bOlJs98mQHoK6bgXNXvRX3+NqGXQYazwX4VCaZTIkhqbuLFnw5acsblYm7hxi3Nu0UJe4oHuwzGAB0OqqF1wdFV0uiNeHsk/UV6TqjE9SVpxgZNQjZGI8ZkCsxCESZ9U4H/LhlUQTNnxIXtk6xbi4i0LWyg+YI1cv4kCB3Olrkelm+qhfbz9Am3mDy8hpuL7AAAAAElFTkSuQmCC"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-0">
                          <img
                            alt=""
                            className="rounded-lg sm:w-auto"
                            src="/modules/static2/assets/dota-p-light-Bb_8X8FH.png"
                          />
                          <div className="left-1/2 z-100 flex w-full -translate-x-1/2 items-center justify-between flex-row-reverse absolute top-60">
                            <div className="mr-6 text-xs text-quarterary sm:mr-0">
                              @2024
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 rounded-xl bg-layer4 px-7 py-6">
                  <div className="flex">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        Official iGaming Partner – Cloud9 Dota 2 (August 2024 –
                        February 2025)
                      </p>
                      <p className="my-0 p-0 font-[italic] text-sm font-normal leading-normal text-secondary">
                        This partnership concluded in February 2025. The content
                        below is archived for historical reference only.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        From August 2024 to February 2025, BC.GAME partnered
                        with Cloud9 as the official iGaming sponsor of its Dota
                        2 division, in a campaign that aimed to explore the
                        synergy between blockchain-powered gaming and top-tier
                        esports competition.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This collaboration brought together BC.GAME’s
                        cutting-edge iGaming technology with Cloud9’s
                        established reputation in the esports world. The
                        campaign was launched to coincide with Cloud9’s return
                        to the competitive Dota 2 scene—an exciting new chapter
                        for the organization, following a history of strong
                        performances and community support since 2014.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        During the active sponsorship period, BC.GAME and Cloud9
                        engaged fans through exclusive betting integrations,
                        gamified content, and Web3-powered experiences tailored
                        to esports audiences. The partnership aimed to introduce
                        crypto-native engagement to Dota 2 fans in a dynamic and
                        immersive way.
                      </p>
                    </div>
                    <div className="flex-1 ml-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/c-1-BfURxRKn.png"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse mt-6">
                    <div className="flex flex-1 flex-col justify-center">
                      <p className="text-base font-extrabold leading-normal text-primary">
                        A Retrospective Look: Esports Meets Web3
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        This short-term partnership represented a key milestone
                        for BC.GAME’s expansion into esports. The initiative
                        provided players and fans with interactive matchday
                        challenges, community-driven token rewards, and
                        exclusive content tied to Cloud9’s Dota 2 matches.
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-normal text-secondary">
                        Though the campaign has ended, it remains a noteworthy
                        moment in BC.GAME’s journey to redefine iGaming through
                        esports integration.
                      </p>
                      <p className="mt-3 rounded-md p-2 text-sm font-semibold leading-normal text-secondary bg-layer5" />
                      <p className="text-sm font-extrabold text-secondary">
                        Disclaimer:
                      </p>
                      <p className="mt-3 text-xs font-semibold text-secondary">
                        The partnership between BC.GAME and Cloud9 Dota2 team
                        officially ended in February 2025. All references to
                        Cloud9 or its esports programs on this page refer
                        exclusively to this concluded campaign and do not imply
                        any ongoing affiliation, endorsement, or rights of use.
                        Any references to Cloud9 Dota2 on this page relate
                        solely to the historical collaboration during the term
                        of the agreement and do not imply current sponsorship,
                        endorsement, or authorization. This content is intended
                        for informational purposes only. BC.GAME does not
                        currently maintain any official relationship with Cloud9
                        Dota2.
                      </p>
                      <p />
                    </div>
                    <div className="flex-1 mr-6">
                      <img
                        alt="img"
                        className="rounded-lg sm:w-full"
                        src="/modules/static2/assets/c-2-_8aS2-g7.png"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex min-h-100 w-full gap-4 overflow-x-auto">
                    <div className="min-w-60 flex-1 rounded-md bg-alw_dark">
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src="https://youtube.com/embed/XCUNmNHg26E?si=KDfEB-quLjF4XVbW"
                        style={{
                          borderRadius: "8px",
                          height: "100%",
                          minHeight: "440px",
                          width: "100%",
                        }}
                      />
                    </div>
                    <div className="min-w-60 flex-1 rounded-md bg-alw_dark">
                      <iframe
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        src="https://youtube.com/embed/-z0GwOEQNWM?si=86TIg0eYA2KVmsmD"
                        style={{
                          borderRadius: "8px",
                          height: "100%",
                          minHeight: "440px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
