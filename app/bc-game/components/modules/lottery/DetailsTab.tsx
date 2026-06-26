import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  TabPanel,
} from "@/components/ui/tabs/TabsFlat";

export default function LotteryPage() {
  return (
    <>
      <Tabs defaultValue="buy">
        {/* Dito mo mababago ang class depende sa page */}
        <TabList className="mb-4 rounded-xl sticky! z-20 top-35 w-100">
          <TabTrigger
            id="buy"
            label="Buy Lottery"
            className="hover:text-white"
          />
          <TabTrigger id="results" label="Results" />
          <TabTrigger id="winners" label="Jackpot Winners" />
        </TabList>

        <TabContent className="flex-1 overflow-hidden bg-transparent mt-0!">
          <TabPanel id="buy">
            <div className="flex flex-col gap-4 sm:flex-row">
              <section className="market-wrap p-4 bg-layer4 rounded-xl sm:flex-1">
                <div className="bc-lottery">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-secondary font-semibold text-sm">
                      Numbers of Ticket
                    </div>
                    <div className="text-primary font-semibold text-sm">
                      1 Ticket = $0.1{" "}
                    </div>
                  </div>
                  <section className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center cursor-pointer h-10 rounded py-0.5 px-1 w-full bg-input_bright">
                      <button
                        className="button button-m rounded-lg bg-black_alpha5 w-8 h-8!"
                        type="button"
                      >
                        -
                      </button>
                      <div className="input flex-1 w-full h-full min-w-4 p-0 border-0! text-center px-2 text-primary text-base font-extrabold [&>input]:text-center bg-input_bright">
                        <input inputMode="decimal" defaultValue="3" />
                      </div>
                      <button
                        className="button button-m rounded-lg bg-black_alpha5 w-8 h-8!"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="button button-m rounded-lg w-1/3 h-8 sm:w-24 sm:h-10 bg-black_alpha5 dark:bg-layer6 text-primary text-sm font-extrabold"
                        type="button"
                      >
                        20
                      </button>
                      <button
                        className="button button-m rounded-lg w-1/3 h-8 sm:w-24 sm:h-10 bg-black_alpha5 dark:bg-layer6 text-primary text-sm font-extrabold"
                        type="button"
                      >
                        50
                      </button>
                      <button
                        className="button button-m rounded-lg w-1/3 h-8 sm:w-24 sm:h-10 bg-black_alpha5 dark:bg-layer6 text-primary text-sm font-extrabold"
                        type="button"
                      >
                        100
                      </button>
                    </div>
                  </section>
                </div>
                <div className="pick-nums-wrap flex items-center justify-between flex-wrap">
                  <div className="picks-head flex flex-col w-full mt-4">
                    <div className="text-primary font-extrabold text-base">
                      Completed 0 / 5 Ticket(s)
                    </div>
                    <div className="btns flex justify-between">
                      <button
                        className="button button-m text-secondary font-semibold text-sm px-0"
                        type="button"
                      >
                        <div className="icon fill-secondary size-4! mr-1">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M23.4576 12.8027C24.2971 12.8027 24.9774 13.4831 24.9774 14.3226C24.9774 14.4305 24.9661 14.5375 24.9435 14.6419L22.8712 24.2744C22.404 26.4467 20.4831 27.9988 18.2603 27.9988H12.6628C10.4399 27.9988 8.51988 26.4476 8.05183 24.2744L5.97952 14.6419C5.80292 13.8215 6.32491 13.0133 7.14531 12.8367C7.25057 12.814 7.35758 12.8027 7.46459 12.8027H23.4567H23.4576ZM17.9044 4.11679C20.825 4.63182 22.3257 6.46488 22.2517 9.28364L26.5486 10.0414C27.1898 10.1545 27.6178 10.7661 27.5047 11.4073L27.3864 12.078C27.2733 12.7192 26.6617 13.1472 26.0205 13.0341L5.89514 9.48548C5.25396 9.37238 4.82592 8.76078 4.93902 8.1196L5.05734 7.44884C5.17044 6.80766 5.78204 6.37962 6.42322 6.49272L12.0538 7.48451C12.9481 4.81104 14.9848 3.60176 17.9053 4.11592L17.9044 4.11679ZM14.3236 7.88557L19.9793 8.88258C19.928 7.40708 19.1433 6.64932 17.5077 6.36135C15.8721 6.07339 14.876 6.51621 14.3227 7.88557H14.3236Z" />
                          </svg>
                        </div>
                        Clear All
                      </button>
                      <button
                        className="button button-m text-brand font-extrabold text-sm px-0"
                        type="button"
                      >
                        <div className="icon size-4! mr-1 fill-brand">
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                            <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                            <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                            <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                            <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                          </svg>
                        </div>{" "}
                        Quick Pick
                      </button>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth mt-3∑">
                    <div className="picks-list pb-5 flex justify-start gap-4 sm:grid sm:grid-cols-2 sm:gap-2">
                      <div className="min-w-[320px] bg-layer3 rounded-xl">
                        <div className="head-opt relative flex items-center justify-between px-1 rounded-t-xl bg-layer3 border border-solid border-layer2">
                          <button
                            className="button button-m text-secondary text-sm font-semibold"
                            type="button"
                          >
                            Clear
                          </button>
                          <span className="">0/6</span>
                          <button className="button button-m" type="button">
                            <span className="w-6 h-6 center bg-layer5 rounded-md">
                              <div className="icon size-4! fill-primary">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                                  <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                                  <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                                  <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                                  <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                                </svg>
                              </div>
                            </span>
                          </button>
                        </div>
                        <div className="select-box p-4 bg-layer2 rounded-b-xl">
                          <div className="nums">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 5 numbers
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                11
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                12
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                13
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                14
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                15
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                16
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                17
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                18
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                19
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                20
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                21
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                22
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                23
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                24
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                25
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                26
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                27
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                28
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                29
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                30
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                31
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                32
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                33
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                34
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                35
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                36
                              </button>
                            </div>
                          </div>
                          <div className="jackpot mt-3 pb-3">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 1 Jackpot Ball
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[320px] bg-layer3 rounded-xl">
                        <div className="head-opt relative flex items-center justify-between px-1 rounded-t-xl bg-layer3 border border-solid border-layer2">
                          <button
                            className="button button-m text-secondary text-sm font-semibold"
                            type="button"
                          >
                            Clear
                          </button>
                          <span className="">0/6</span>
                          <button className="button button-m" type="button">
                            <span className="w-6 h-6 center bg-layer5 rounded-md">
                              <div className="icon size-4! fill-primary">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                                  <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                                  <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                                  <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                                  <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                                </svg>
                              </div>
                            </span>
                          </button>
                        </div>
                        <div className="select-box p-4 bg-layer2 rounded-b-xl">
                          <div className="nums">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 5 numbers
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                11
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                12
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                13
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                14
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                15
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                16
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                17
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                18
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                19
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                20
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                21
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                22
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                23
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                24
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                25
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                26
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                27
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                28
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                29
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                30
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                31
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                32
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                33
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                34
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                35
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                36
                              </button>
                            </div>
                          </div>
                          <div className="jackpot mt-3 pb-3">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 1 Jackpot Ball
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[320px] bg-layer3 rounded-xl">
                        <div className="head-opt relative flex items-center justify-between px-1 rounded-t-xl bg-layer3 border border-solid border-layer2">
                          <button
                            className="button button-m text-secondary text-sm font-semibold"
                            type="button"
                          >
                            Clear
                          </button>
                          <span className="">0/6</span>
                          <button className="button button-m" type="button">
                            <span className="w-6 h-6 center bg-layer5 rounded-md">
                              <div className="icon size-4! fill-primary">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                                  <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                                  <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                                  <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                                  <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                                </svg>
                              </div>
                            </span>
                          </button>
                        </div>
                        <div className="select-box p-4 bg-layer2 rounded-b-xl">
                          <div className="nums">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 5 numbers
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                11
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                12
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                13
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                14
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                15
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                16
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                17
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                18
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                19
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                20
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                21
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                22
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                23
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                24
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                25
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                26
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                27
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                28
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                29
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                30
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                31
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                32
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                33
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                34
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                35
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                36
                              </button>
                            </div>
                          </div>
                          <div className="jackpot mt-3 pb-3">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 1 Jackpot Ball
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[320px] bg-layer3 rounded-xl">
                        <div className="head-opt relative flex items-center justify-between px-1 rounded-t-xl bg-layer3 border border-solid border-layer2">
                          <button
                            className="button button-m text-secondary text-sm font-semibold"
                            type="button"
                          >
                            Clear
                          </button>
                          <span className="">0/6</span>
                          <button className="button button-m" type="button">
                            <span className="w-6 h-6 center bg-layer5 rounded-md">
                              <div className="icon size-4! fill-primary">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                                  <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                                  <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                                  <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                                  <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                                </svg>
                              </div>
                            </span>
                          </button>
                        </div>
                        <div className="select-box p-4 bg-layer2 rounded-b-xl">
                          <div className="nums">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 5 numbers
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                11
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                12
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                13
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                14
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                15
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                16
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                17
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                18
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                19
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                20
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                21
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                22
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                23
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                24
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                25
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                26
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                27
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                28
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                29
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                30
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                31
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                32
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                33
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                34
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                35
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                36
                              </button>
                            </div>
                          </div>
                          <div className="jackpot mt-3 pb-3">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 1 Jackpot Ball
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="min-w-[320px] bg-layer3 rounded-xl">
                        <div className="head-opt relative flex items-center justify-between px-1 rounded-t-xl bg-layer3 border border-solid border-layer2">
                          <button
                            className="button button-m text-secondary text-sm font-semibold"
                            type="button"
                          >
                            Clear
                          </button>
                          <span className="">0/6</span>
                          <button className="button button-m" type="button">
                            <span className="w-6 h-6 center bg-layer5 rounded-md">
                              <div className="icon size-4! fill-primary">
                                <svg
                                  viewBox="0 0 32 32"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M13.7969 11.8174C13.9258 11.8174 14.0527 11.8347 14.1758 11.8643C14.2002 11.8701 14.2249 11.8749 14.249 11.8818C14.2582 11.8845 14.2672 11.8878 14.2764 11.8906C14.3616 11.9168 14.445 11.9497 14.5254 11.9902L14.5352 11.9951C14.6059 12.0314 14.6728 12.0745 14.7373 12.1211C14.7954 12.1631 14.8523 12.208 14.9053 12.2588L27.0986 23.9639C27.7104 24.5514 27.7103 25.5042 27.0986 26.0918L26.5439 26.624C25.9318 27.2117 24.9393 27.2117 24.3271 26.624L12.1338 14.9189C12.0388 14.8277 11.961 14.7262 11.8955 14.6201C11.8827 14.5994 11.8682 14.5798 11.8564 14.5586C11.8466 14.5407 11.8382 14.5221 11.8291 14.5039C11.7949 14.4353 11.7652 14.3648 11.7422 14.292L11.7393 14.2832C11.7329 14.2626 11.729 14.2415 11.7236 14.2207C11.6925 14.1018 11.6748 13.9791 11.6748 13.8545C11.6748 13.7213 11.694 13.5902 11.7295 13.4639C11.7333 13.4503 11.736 13.4364 11.7402 13.4229C11.7636 13.348 11.794 13.2755 11.8291 13.2051C11.8382 13.1869 11.8466 13.1683 11.8564 13.1504C11.8939 13.0825 11.9382 13.0181 11.9863 12.9561C12.0309 12.8987 12.0796 12.8431 12.1338 12.791L12.6885 12.2588C12.7414 12.208 12.7983 12.1631 12.8564 12.1211C12.9225 12.0734 12.9909 12.0291 13.0635 11.9922C13.1451 11.9507 13.2299 11.9173 13.3164 11.8906C13.3255 11.8878 13.3346 11.8845 13.3438 11.8818C13.3641 11.876 13.3847 11.8713 13.4053 11.8662C13.5321 11.8348 13.6636 11.8174 13.7969 11.8174Z" />
                                  <path d="M9.90234 16.7275C8.70262 18.4556 8.70265 18.9224 9.90234 20.6504C8.10006 19.4987 7.61636 19.4987 5.81641 20.6504C7.01611 18.9201 7.01614 18.4556 5.81641 16.7275C7.61876 17.8793 8.10235 17.8792 9.90234 16.7275Z" />
                                  <path d="M24.5703 10.9238C23.502 12.4618 23.502 12.8773 24.5703 14.416C22.9683 13.3905 22.5323 13.3905 20.9326 14.416C22.0009 12.878 22.0009 12.4595 20.9326 10.9238C22.5346 11.9494 22.9707 11.9493 24.5703 10.9238Z" />
                                  <path d="M7.0752 6.13281C7.49922 8.16965 7.84411 8.50016 9.96582 8.90723C7.84411 9.31429 7.49922 9.6448 7.0752 11.6816C6.65117 9.64484 6.30724 9.31429 4.18555 8.90723C6.30725 8.50016 6.65117 8.16965 7.0752 6.13281Z" />
                                  <path d="M19.3086 4.68848C18.1086 6.41681 18.1086 6.883 19.3086 8.61133C17.506 7.45941 17.0218 7.45954 15.2217 8.61133C16.4214 6.88102 16.4215 6.41664 15.2217 4.68848C17.0243 5.84037 17.5083 5.84042 19.3086 4.68848Z" />
                                </svg>
                              </div>
                            </span>
                          </button>
                        </div>
                        <div className="select-box p-4 bg-layer2 rounded-b-xl">
                          <div className="nums">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 5 numbers
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                11
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                12
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                13
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                14
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                15
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                16
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                17
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                18
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                19
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                20
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                21
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                22
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                23
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                24
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                25
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                26
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                27
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                28
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                29
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                30
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                31
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                32
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                33
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                34
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                35
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                36
                              </button>
                            </div>
                          </div>
                          <div className="jackpot mt-3 pb-3">
                            <div className="mb-3 text-sm font-semibold text-secondary">
                              Choose 1 Jackpot Ball
                            </div>
                            <div className="box grid grid-cols-7 gap-1.5">
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                1
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                2
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                3
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                4
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                5
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                6
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                7
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                8
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                9
                              </button>
                              <button
                                className="button button-m w-10 h-10 text-center rounded-full bg-layer3 text-base font-extrabold"
                                type="button"
                              >
                                10
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="cart-list mb-40 sm:w-96">
                <div className="ticket-info-box bg-layer4 p-3 mb-2 rounded-xl">
                  <section className="text-lg text-primary font-extrabold border-b border-solid border-input pb-3 pt-2">
                    BC Lottery Jackpot
                  </section>
                  <section className="flex justify-between mt-4">
                    <label className="text-secondary text-sm font-semibold">
                      5 Tickets
                    </label>
                    <span className="text-primary text-sm font-extrabold">
                      $0.1 X 5
                    </span>
                  </section>
                  <section className="flex justify-between mt-4">
                    <label className="text-sm font-semibold text-secondary">
                      Total Bet Amount
                    </label>
                    <span className="text-sm font-extrabold text-primary flex items-center gap-1">
                      0.5
                      <img
                        className="w-3 h-3"
                        loading="lazy"
                        src="https://bc.game/coin/USD.rect.png"
                      />
                    </span>
                  </section>
                  <section className="flex justify-end text-secondary text-sm font-semibold">
                    ≈ ₩726
                  </section>
                  <section className="flex items-center w-full mt-2">
                    <button
                      className="button button-brand button-m rounded-xl w-full"
                      type="button"
                    >
                      Add Bet
                    </button>
                  </section>
                </div>
                <div
                  className="flex flex-col justify-center rounded p-4 relative h-37.5! bg-size-[100%_100%] bg-no-repeat"
                  style={{
                    backgroundImage:
                      'url("https://bc.game/substation/bc/lottery/bc_lottery/send-ticket-bg_w.png")',
                  }}
                >
                  <div className="text-primary text-base font-extrabold">
                    Send Lottery Ticket as Gift
                  </div>
                  <div className="mt-2.5 text-secondary text-sm font-semibold">
                    Invite your friends to win $100,000
                  </div>
                  <div className="mt-4 flex items-center">
                    <button
                      className="button button-m p-2 text-primary text-sm font-extrabold bg-black_alpha5 rounded-md border border-solid border-third h-8"
                      type="button"
                    >
                      Send Ticket
                    </button>
                    <button
                      className="button button-m text-primary text-sm font-extrabold ml-3 bg-black_alpha5 rounded-md border border-solid border-third h-8"
                      type="button"
                    >
                      View Gift History
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </TabPanel>

          <TabPanel id="results">
            <div className="bg-layer4 rounded-xl mb-40 relative">
              <div className="p-4 border-b border-solid border-input relative flex gap-3">
                <div className="flex justify-between items-center">
                  <label className="font-extrabold text-primary text-base">
                    Game ID
                  </label>
                  <button
                    className="button button-m bg-layer5 size-8 p-0 rounded-md absolute right-4"
                    type="button"
                  >
                    <div className="icon fill-secondary size-5!">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M15.9997 4.08398C17.2423 4.08398 18.2496 5.10857 18.2496 6.37199H25.1872C25.9123 6.37199 26.4999 6.95957 26.4999 7.68473V7.72887C26.4999 8.45404 25.9123 9.04161 25.1872 9.04161H17.3929V23.9136L20.6873 23.9145C21.4125 23.9145 22 24.5021 22 25.2273V25.2714C22 25.9966 21.4125 26.5841 20.6873 26.5841H11.3129C10.5877 26.5841 10.0001 25.9966 10.0001 25.2714V25.2273C10.0001 24.5021 10.5877 23.9145 11.3129 23.9145L14.7683 23.9136V9.04161H6.81303C6.08786 9.04161 5.50029 8.45404 5.50029 7.72887V7.68473C5.50029 6.95957 6.08786 6.37199 6.81303 6.37199H13.7506C13.7506 5.10857 14.7579 4.08398 16.0005 4.08398H15.9997ZM24.8739 10.3483C25.1439 10.4971 25.3637 10.7377 25.4987 11.0345L27.6032 15.6607C28.5292 17.6969 27.7789 20.1727 25.9262 21.1904C25.4052 21.4768 24.8315 21.6256 24.2491 21.6256C22.1783 21.6256 20.4995 19.7807 20.4995 17.5039C20.4995 16.8644 20.6354 16.2327 20.895 15.6607L22.9995 11.0345C23.3448 10.2765 24.1833 9.96841 24.8739 10.3483ZM8.37414 10.3483C8.64413 10.4971 8.86393 10.7377 8.99892 11.0345L11.1035 15.6607C12.0294 17.6969 11.2791 20.1727 9.42641 21.1904C8.90547 21.4768 8.33173 21.6256 7.74935 21.6256C5.67855 21.6256 3.99976 19.7807 3.99976 17.5039C3.99976 16.8644 4.13562 16.2327 4.39522 15.6607L6.49977 11.0345C6.84505 10.2765 7.68358 9.96841 8.37327 10.3483H8.37414Z" />
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="center">
                  <button
                    className="button button-m pre size-8! p-0 mr-3 bg-black_alpha5 dark:bg-layer6"
                    type="button"
                  >
                    <div className="icon size-4!">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                      </svg>
                    </div>
                  </button>
                  <button
                    className="button button-m select bg-input_bright flex-1 bg-input_bright w-52"
                    type="button"
                  >
                    <label>20260210000000</label>
                    <div className="size-6 ml-auto bg-input_button center rounded-md ">
                      <div className="icon size-4! transition-all -rotate-90">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  <button
                    className="button button-m size-8! p-0 mx-3 bg-black_alpha5 dark:bg-layer6"
                    disabled
                    type="button"
                  >
                    <div className="icon size-5! rotate-180">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                      </svg>
                    </div>
                  </button>
                  <button
                    className="button button-m size-8! p-0 bg-black_alpha5 dark:bg-layer6"
                    disabled
                    type="button"
                  >
                    <div className="icon size-5!">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.4899 7.35118L10.586 7.43934L16.5534 13.3484C17.9874 14.768 18.0308 17.0445 16.6841 18.516L16.5534 18.6514L10.586 24.5605C9.9947 25.1465 9.03575 25.1465 8.44379 24.5605C7.88325 24.0056 7.85371 23.1241 8.35518 22.5342L8.44379 22.4389L14.4111 16.5298C14.6839 16.2595 14.7052 15.8343 14.474 15.54L14.4111 15.4694L8.44379 9.56028C7.85246 8.9743 7.85246 8.02467 8.44379 7.43934C9.00433 6.88447 9.89478 6.8553 10.4899 7.35118ZM22.6043 7.35961C23.3402 7.35961 23.9434 7.86327 23.9962 8.50175L24 8.5938V23.4054C24 24.0873 23.3747 24.6396 22.6037 24.6396C21.8678 24.6396 21.2645 24.1359 21.2118 23.4974L21.208 23.4054V8.5938C21.208 7.91188 21.8333 7.35961 22.6043 7.35961Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              <div className="table-wrap">
                <section
                  className="m-4 bg-size-[100%_100%] flex"
                  style={{
                    backgroundImage:
                      'url("https://bc.game/modules/lottery2/assets/bclottery_winners_result_pc_white-Cdkw5ym8.png")',
                  }}
                >
                  <section className="w-1/2">
                    <div className="pt-4 text-center text-primary text-xs font-semibold">
                      Draw time: 2/10/2026, 7:55:00 AM
                    </div>
                    <div className="info-left-cont">
                      <div className="mview">
                        <div className="jackpot-bg relative w-full inline-block align-top sm:flex sm:flex-col sm:items-center">
                          <div className="center m-4">
                            <div className="icon fill-brand size-3">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z" />
                              </svg>
                            </div>
                            <label className="text-brand text-base font-extrabold">
                              Winner Numbers
                            </label>
                            <div className="icon fill-brand size-3">
                              <svg
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z" />
                              </svg>
                            </div>
                          </div>
                          <div className="border-t border-dashed border-third sm:mb-4 sm:w-fit sm:border-t sm:border-solid">
                            <div className="center gap-3 sm:border-b sm:border-dashed border-third p-2">
                              <div className="relative center">
                                <img
                                  alt=""
                                  className="w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/ball-white.png"
                                />
                                <label className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  8
                                </label>
                              </div>
                              <div className="relative center">
                                <img
                                  alt=""
                                  className="w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/ball-white.png"
                                />
                                <label className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  5
                                </label>
                              </div>
                              <div className="relative center">
                                <img
                                  alt=""
                                  className="w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/ball-white.png"
                                />
                                <label className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  14
                                </label>
                              </div>
                              <div className="relative center">
                                <img
                                  alt=""
                                  className="w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/ball-white.png"
                                />
                                <label className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  32
                                </label>
                              </div>
                              <div className="relative center">
                                <img
                                  alt=""
                                  className="w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/ball-white.png"
                                />
                                <label className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  13
                                </label>
                              </div>
                              <div className="bg-third h-10 w-px" />
                              <div className="jackpotNum w-10 h-10 center relative placeholder-layer3">
                                <img
                                  className="ball-img w-10 h-10"
                                  loading="lazy"
                                  src="https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png"
                                />
                                <div className="absolute-center text-primary_brand text-base font-semibold z-10">
                                  6
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="flex flex-col items-center border-t border-dashed border-third py-4 mx-4 w-1/2 sm:mx-0 sm:justify-center sm:border-0">
                    <div className="center gap-1">
                      <img
                        className="icon w-8 h-8"
                        loading="lazy"
                        src="https://bc.game/substation/bc/lottery/lottery/total-tickets.png"
                      />
                      <div>
                        <label className="text-secondary text-sm font-semibold">
                          Total tickets sold this round
                        </label>
                        :{" "}
                        <span className="text-primary text-sm font-extrabold">
                          15922
                        </span>
                      </div>
                    </div>
                    <div className="center gap-1 mt-2">
                      <img
                        className="icon w-8 h-8"
                        loading="lazy"
                        src="https://bc.game/substation/bc/lottery/lottery/winner-tickets.png"
                      />
                      <div>
                        <label className="text-secondary text-sm font-semibold">
                          Total winning tickets in this round
                        </label>
                        :{" "}
                        <span className="text-primary text-sm font-extrabold">
                          103
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="table-box">
                  <div className="wrap rounded pt-4 ">
                    <div className="center">
                      <div className="icon size-6">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z" />
                        </svg>
                      </div>
                      <div className="text-primary text-base font-extrabold">
                        Winners List
                      </div>
                      <div className="icon size-6">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.2579 25.0916L10.3082 27.8097C9.52925 28.2367 8.56657 27.925 8.15768 27.1115C7.99465 26.788 7.93858 26.4169 7.99724 26.0565L8.94267 20.2996C9.03152 19.76 8.85986 19.2095 8.48462 18.8275L4.48034 14.7509C3.85062 14.1094 3.83768 13.0562 4.45187 12.3986C4.69685 12.1364 5.01689 11.9661 5.36366 11.9139L10.8974 11.0742C11.4158 10.9958 11.8644 10.6553 12.0964 10.1643L14.5713 4.92726C14.9603 4.10382 15.9152 3.76508 16.7045 4.17139C17.0185 4.33356 17.273 4.59843 17.4283 4.92726L19.9031 10.1643C20.1352 10.6553 20.5837 10.9958 21.1022 11.0742L26.6359 11.9139C27.5062 12.0463 28.1092 12.8905 27.9833 13.7995C27.9332 14.1617 27.7693 14.4959 27.5192 14.7518L23.5149 18.8284C23.1397 19.2104 22.968 19.7609 23.0569 20.3005L24.0023 26.0574C24.1507 26.9628 23.5684 27.8223 22.7015 27.9781C22.3564 28.0403 22.001 27.9808 21.6913 27.8106L16.7416 25.0925C16.2775 24.8375 15.7237 24.8375 15.2596 25.0925L15.2579 25.0916Z" />
                        </svg>
                      </div>
                    </div>
                    <table className="w-full mt-4">
                      <thead>
                        <tr className="text-xs font-semibold border-b border-solid border-input">
                          <th className="text-left pl-3 sm:pl-4 py-2 font-semibold text-secondary text-xs sm:w-72">
                            Player
                          </th>
                          <th className="py-2 font-semibold text-secondary text-xs">
                            Numbers
                          </th>
                          <th className="text-center py-2 font-semibold text-secondary text-xs">
                            Matches
                          </th>
                          <th className="text-right pr-2 py-2 font-semibold text-secondary text-xs">
                            Profit
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/16225368"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/16225368/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                SHD™
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                30
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                14
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                10
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 4{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            4
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩29,078
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/74136207"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/74136207/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Kigume22
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                4
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                8
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 4{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            4
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩29,078
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/2114332"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/2114332/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                SatoshiaNakamota
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                14
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                29
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                8
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 4{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            4
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩29,078
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/16225368"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/16225368/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                SHD™
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                28
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                14
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                26
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                7
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/103970352"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/103970352/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Gwagon2026
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                34
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                1
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                8
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/3999479"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/3999479/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Nym_num
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                11
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                6
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                7
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/1214394"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/1214394/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Yorbelisv
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                35
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                21
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                13
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                                }}
                              >
                                6
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3 + 1 Jackpot ball
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            4
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/26985149"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/26985149/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Alam101
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                20
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                24
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                10
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/12437224"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/12437224/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                Hirani
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                35
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                29
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                5
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                        <tr className="border-b border-solid border-input">
                          <td className="pl-3 sm:pl-4 py-2">
                            <a
                              aria-current="page"
                              className="cursor-pointer inline-flex items-center active"
                              href="/lottery/detail/0#/user/profile/10528446"
                            >
                              <img
                                className="w-4 h-4 mr-2 rounded-full inline-flex"
                                loading="lazy"
                                src="//img2.distributedresourcestorage.com/avatar/10528446/s"
                              />
                              <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                                March26_60M
                              </span>
                            </a>
                          </td>
                          <td className="py-2">
                            <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                8
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                32
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                35
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                1
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                                }}
                              >
                                5
                              </div>
                              <div
                                className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                                style={{
                                  backgroundImage:
                                    'url("https://bc.game/modules/lottery2/assets/ball-lose-white-nhzkMSf5.png")',
                                }}
                              >
                                8
                              </div>
                            </div>
                            <div className="text-secondary font-semibold text-xs text-center mt-2">
                              Match: 3{" "}
                            </div>
                          </td>
                          <td className="text-center py-2 font-semibold text-primary text-sm">
                            3
                          </td>
                          <td className="pr-2 py-2 text-right">
                            <span className="text-primary text-sm font-semibold">
                              ₩1,453
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center gap-x-[0.15rem]  justify-end py-4 mr-4">
                    <button
                      className="button button-m pagination-button pagination-prev"
                      disabled
                      type="button"
                    >
                      <div className="icon size-4! text-secondary">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </button>
                    <div className="pagination">
                      <input className="pagination-current" size={2} />
                      <span className="text-tertiary">of</span>
                      <div className="p-2 min-w-8 h-8 justify-center-center flex items-center">
                        <span>11</span>
                      </div>
                    </div>
                    <button
                      className="button button-m pagination-button pagination-next"
                      type="button"
                    >
                      <div className="icon size-4! rotate-180 text-secondary">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel id="winners">
            <div className="bg-layer4 rounded-xl mb-40">
              <table className="w-full">
                <thead>
                  <tr className="table-tr text-secondary text-sm font-semibold border-b border-solid border-third">
                    <th className="text-left py-4 pl-3 sm:pl-4 text-secondary text-xs font-semibold">
                      Game ID
                    </th>
                    <th className="text-center py-4 text-secondary text-xs font-semibold">
                      Top Winner
                    </th>
                    <th className="text-center py-4 text-secondary text-xs font-semibold">
                      Numbers
                    </th>
                    <th className="text-center py-4 text-secondary text-xs font-semibold">
                      Matches
                    </th>
                    <th className="text-right py-4 pr-2 text-secondary text-xs font-semibold">
                      Prize
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20250909080000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/8556766"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/8556766/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Akanbem4
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          34
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          3
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          6
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          20
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          27
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          5
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20250825000000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/17032842"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/17032842/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Winner1990
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          15
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          16
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          34
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          6
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          30
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          8
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20250716000000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/62566573"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/62566573/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Asclielnjuac
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          19
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          2
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          33
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          16
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          5
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          7
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20250105160000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/49673497"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/49673497/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Ydnac666
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          5
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          6
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          16
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          1
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          28
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          3
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20241202160000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/5267160"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/5267160/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            st1kerrr
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          26
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          10
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          36
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          6
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          27
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          6
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20241121000000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/17032842"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/17032842/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Winner1990
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          2
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          5
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          19
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          1
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          30
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          5
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20241110160000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/3418729"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/3418729/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Rutvil_Shah
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          36
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          5
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          8
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          1
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          12
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          8
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20240828000000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/41685969"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/41685969/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Darren916
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          23
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          2
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          35
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          20
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          15
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          7
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20240812160000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/48266234"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/48266234/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Ylrqhdocdsac
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          35
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          15
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          1
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          10
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          5
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          2
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                  <tr className="text-primary text-xs font-semibold border-b border-solid border-third">
                    <td className="py-4 pl-3 sm:pl-4 text-primary text-sm font-semibold">
                      20240717080000
                    </td>
                    <td className="py-4">
                      <div className="center">
                        <a
                          aria-current="page"
                          className="cursor-pointer inline-flex items-center active"
                          href="/lottery/detail/0#/user/profile/44948994"
                        >
                          <img
                            className="w-4 h-4 mr-2 rounded-full inline-flex"
                            loading="lazy"
                            src="//img2.distributedresourcestorage.com/avatar/44948994/s"
                          />
                          <span className="text-primary font-semibold text-sm inline-block max-w-60 truncate">
                            Ddmuadsaprac
                          </span>
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="relative flex gap-1 w-40 bg-no-repeat bg-cover p-1 items-center my-0 mx-auto sm:w-fit">
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          26
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          32
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          9
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          31
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/ball-white.png")',
                          }}
                        >
                          18
                        </div>
                        <div
                          className="w-6 h-6 text-primary_brand text-xs font-semibold ml-1 rounded-full center bg-no-repeat bg-cover"
                          style={{
                            backgroundImage:
                              'url("https://bc.game/substation/bc/lottery/lottery/jackpot_ball.png")',
                          }}
                        >
                          4
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-center text-primary text-sm font-semibold">
                      6
                    </td>
                    <td className="text-right py-4 pr-2 text-primary text-sm font-semibold">
                      ₩145,391K
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="flex items-center justify-end">
                <div className="flex items-center gap-x-[0.15rem]  justify-end py-4 mr-4">
                  <button
                    className="button button-m pagination-button pagination-prev"
                    disabled
                    type="button"
                  >
                    <div className="icon size-4! text-secondary">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                      </svg>
                    </div>
                  </button>
                  <div className="pagination">
                    <input className="pagination-current" size={2} />
                    <span className="text-tertiary">of</span>
                    <div className="p-2 min-w-8 h-8 justify-center-center flex items-center">
                      <span>04</span>
                    </div>
                  </div>
                  <button
                    className="button button-m pagination-button pagination-next"
                    type="button"
                  >
                    <div className="icon size-4! rotate-180 text-secondary">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabContent>
      </Tabs>
    </>
  );
}

