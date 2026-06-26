import {
  Tabs,
  TabList,
  TabTrigger,
  TabContentWrapper,
  TabPanel,
} from "@/components/ui/tabs/Tabs";

export default function WalletVault() {
  return (
    <>
      <div className="max-sm:py-4">
        <div className="justify-between sm:flex">
          <div className="bg-layer4 rounded-lg w-full p-4 basis-[55%] sm:p-6">
            <div className="flex items-end justify-end space-x-2">
              <button className="flex h-6 items-center justify-center rounded-md bg-button_bright text-secondary p-2 text-xs">
                <div className="icon size-4! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.0004 4.19043C22.5223 4.19043 27.8094 9.47748 27.8094 15.9994C27.8094 22.5214 22.5223 27.8084 16.0004 27.8084C9.47846 27.8084 4.19141 22.5214 4.19141 15.9994C4.19141 9.47748 9.47846 4.19043 16.0004 4.19043ZM16.0004 6.72093C10.8761 6.72093 6.7219 10.8752 6.7219 15.9994C6.7219 21.1237 10.8761 25.2779 16.0004 25.2779C21.1247 25.2779 25.2789 21.1237 25.2789 15.9994C25.2789 10.8752 21.1247 6.72093 16.0004 6.72093ZM16.6684 9.25143V11.1544C17.7616 11.2623 18.8143 11.6402 19.5971 12.1531L18.7738 13.921C17.7751 13.3272 16.5875 12.9493 15.8317 12.9493C15.1164 12.9493 14.6306 13.2057 14.6306 13.7186C14.6306 15.4596 19.6646 14.4879 19.6511 17.8889C19.6511 19.5219 18.3959 20.4936 16.6684 20.696V22.7069H15.0489V20.669C13.8208 20.4936 12.6466 19.9672 11.7829 19.2385L12.6331 17.4975C13.6049 18.3612 14.9814 18.9146 15.9802 18.9146C16.8574 18.9146 17.3837 18.5907 17.3837 18.0103C17.3837 16.2289 12.3497 17.268 12.3497 13.921C12.3497 12.477 13.4024 11.4783 15.0489 11.2083V9.25143H16.6684Z" />
                  </svg>
                </div>
                <span className="ml-1.5">Interests</span>
              </button>
              <button className="flex h-6 items-center justify-center rounded-md bg-button_bright text-secondary p-2 text-xs">
                <div className="icon size-4! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C22.6274 4 28 9.37257 28 16C28 22.6274 22.6274 28 16 28C9.37257 28 4 22.6274 4 16C4 9.37257 9.37257 4 16 4ZM16 6.57143C10.7929 6.57143 6.57143 10.7929 6.57143 16C6.57143 21.2071 10.7929 25.4286 16 25.4286C21.2071 25.4286 25.4286 21.2071 25.4286 16C25.4286 10.7929 21.2071 6.57143 16 6.57143ZM15.1429 9.256C15.9297 9.256 16.5751 9.862 16.6377 10.6326L16.6429 10.756V16.4637L20.7503 16.4646C21.5783 16.4646 22.2503 17.1366 22.2503 17.9646C22.2503 18.7514 21.6443 19.3969 20.8737 19.4594L20.7503 19.4646H15.1429C15.0246 19.4646 14.9089 19.4509 14.7983 19.4251C14.7923 19.4234 14.7863 19.4226 14.7803 19.4209C14.7589 19.4157 14.7374 19.4097 14.7169 19.4037C14.6963 19.3977 14.6731 19.39 14.6517 19.3831C14.6423 19.3797 14.6329 19.3763 14.6234 19.3729C14.596 19.3626 14.5686 19.3514 14.542 19.3403C14.5249 19.3326 14.5094 19.3257 14.4931 19.318C14.476 19.3094 14.458 19.3009 14.4409 19.2914C14.4194 19.2803 14.398 19.2683 14.3766 19.2554C14.3629 19.2477 14.35 19.2391 14.3363 19.2306C14.3209 19.2211 14.3063 19.2109 14.2917 19.2006C14.2711 19.186 14.2506 19.1714 14.2309 19.156C14.218 19.1466 14.2051 19.1363 14.1923 19.126C14.176 19.1131 14.1614 19.1003 14.146 19.0866C14.1306 19.0729 14.1169 19.06 14.1031 19.0463C14.0886 19.0326 14.0749 19.0189 14.062 19.0051C14.0457 18.9889 14.0303 18.9717 14.0149 18.9537C14.0054 18.9426 13.996 18.9314 13.9866 18.9203C13.9729 18.904 13.96 18.8877 13.9471 18.8706C13.9334 18.8526 13.9206 18.8346 13.9069 18.8157C13.8966 18.8011 13.8871 18.7857 13.8769 18.7711C13.8666 18.7549 13.8563 18.7377 13.846 18.7214C13.8357 18.7051 13.8263 18.6863 13.8169 18.6683C13.8066 18.6494 13.7971 18.6297 13.7877 18.61C13.78 18.5929 13.7723 18.5766 13.7646 18.5594C13.7577 18.5431 13.7509 18.5277 13.7449 18.5114C13.7226 18.454 13.7037 18.3949 13.6883 18.3349C13.6583 18.2166 13.6429 18.0931 13.6429 17.9654V10.7569C13.6429 9.92886 14.3149 9.25686 15.1429 9.25686V9.256Z" />
                  </svg>
                </div>
                <span className="ml-1.5">History</span>
              </button>
              <div className="w-6 h-6 rounded-md bg-button_bright cursor-pointer center">
                <div className="icon size-4! fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <p className="text-primary text-base">Total Value</p>
              <p className="font-extrabold text-primary mt-3 text-3xl">₩0</p>
            </div>
            <div className="grid mt-8 grid-cols-2">
              <div className="">
                <p className="text-base text-secondary">Last Day Return</p>
                <p className="text-primary text-2xl font-extrabold mt-3">₩0</p>
              </div>
              <div className="">
                <p className="text-base text-secondary">Total Return</p>
                <p className="text-primary text-2xl font-extrabold mt-3">₩0</p>
              </div>
            </div>
          </div>
          <div className="bg-layer4 rounded-lg py-3 my-4 md:ml-4 basis-[45%] px-6">
            <Tabs defaultValue="in">
              <div className="bg-layer2 p-1 rounded-md center">
                <TabList>
                  <TabTrigger id="in" label="Transfer In" />
                  <TabTrigger id="out" label="Transfer Out" />
                </TabList>
              </div>

              <TabContentWrapper className="rounded-md! mt-0!">
                <TabPanel id="in">
                  <div className="rounded-xl">
                    <div className="mb-1.5 text-sm text-secondary">Amount</div>
                    <div className="">
                      <div className="input text-base">
                        <input inputMode="decimal" defaultValue="0" />
                        <button
                          className="button button-s select bg-input_bright button-input border-none *:bg-transparent"
                          type="button"
                        >
                          <div className="flex items-center rounded-lg flex-auto">
                            <img
                              className="mr-1 h-5 w-5"
                              src="https://imgxcut.com/coin/KRW.rect.png"
                            />
                            <div className="text-sm text-left">KRW</div>
                          </div>
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
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-3 flex items-center">
                        <span className="mr-2 text-sm leading-6 text-secondary">
                          Available:
                        </span>
                        <span className="text-sm text-primary">₩0</span>
                      </div>
                      <div className="mb-3 flex justify-between">
                        <span className="text-sm leading-6 text-secondary">
                          Daily real-time return
                        </span>
                        <div className="text-sm text-primary">
                          <span className="ml-1">0KRWFIAT</span>
                          <span className="ml-1 rounded-md bg-white_alpha5 px-1.5 py-0.5 text-xs text-brand">
                            <span className="mr-1">APR</span>
                            5%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="button button-brand button-m h-12! w-full rounded-md text-base font-extrabold"
                        disabled
                        type="button"
                      >
                        Transfer to Vault Pro
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel id="out">
                  <div className="rounded-xl">
                    <div className="mb-1.5 text-sm text-secondary">Amount</div>
                    <div className="">
                      <div className="input text-base">
                        <input inputMode="decimal" defaultValue="0" />
                        <button
                          className="button button-s select bg-input_bright button-input border-none *:bg-transparent"
                          type="button"
                        >
                          <div className="flex items-center rounded-lg flex-auto">
                            <img
                              className="mr-1 h-5 w-5"
                              src="https://imgxcut.com/coin/KRW.rect.png"
                            />
                            <div className="text-sm text-left">KRW</div>
                          </div>
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
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-11 flex items-center">
                        <span className="mr-2 text-sm leading-6 text-secondary">
                          Vault Balance:
                        </span>
                        <span className="text-primary">₩0</span>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="button button-brand button-m h-12! w-full rounded-md text-base font-extrabold"
                        disabled
                        type="button"
                      >
                        Withdraw to Wallet
                      </button>
                    </div>
                  </div>
                </TabPanel>
              </TabContentWrapper>
            </Tabs>
          </div>
        </div>
        <div className="rounded-xl bg-layer4 text-center p-5 sm:mt-5">
          <img
            alt=""
            className="mx-auto mb-4 h-12! w-12"
            src="https://bc.game/modules/wallet2/assets/v-coin-CKLnhPLC.png"
          />
          <div className="">
            <div className="text-lg font-extrabold text-primary">
              No Asset yet
            </div>
            <div className="text-base text-secondary">
              Start earning by transferring assets to Vault Pro
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl px-4 bg-layerx mt-5 py-6 lg:px-8">
          <div className="w-full mx-auto max-w-full">
            <p className="text-white text-lg font-extrabold mb-0 text-left">
              Frequently Asked Questions
            </p>
            <div className="w-full">
              <div className="w-full  space-y-4">
                <div className="overflow-hidden rounded-xl">
                  <div className=" cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold bg-layer4 w-full py-3 rounded-b-none pl-0">
                    <span className="text-base">
                      How is the deposit and withdrawal of funds in Vault Pro
                      protected?
                    </span>
                    <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                      <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl">
                  <div className="cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold bg-layer4 w-full py-3 rounded-b-none pl-0">
                    <span className="text-base">
                      When is the daily interest calculated, and how is it
                      determined?
                    </span>
                    <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                      <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl">
                  <div className=" cursor-pointer px-3 flex justify-between items-center rounded-md text-sm font-extrabold bg-layer4 w-full py-3 rounded-b-none pl-0">
                    <span className="text-base">
                      Can I trust that my funds in Vault Pro are safe?
                    </span>
                    <div className="flex-none size-6 flex items-center justify-center bg-button_bright rounded-md">
                      <div className="icon transition-all size-4! duration-300 fill-secondary rotate-180">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
