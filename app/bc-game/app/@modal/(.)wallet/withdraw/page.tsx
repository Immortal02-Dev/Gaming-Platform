"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function WalletWithdrawModal() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      if (!mobile) {
        // Force a page reload to escape the interception on desktop
        window.location.reload();
      } else {
        setIsMobile(true);
      }
    };
    checkMobile();
  }, []);

  if (isMobile === null) return null;
  return (
    <div className="dialog-root dialog-visible">
      <div className="dialog-list">
        <div
          className="dialog-overlayer"
          style={{ ["--scroll" as any]: "0%" } as React.CSSProperties}
        >
          <div className="dialog-item dialog-transparent-title scroll-noheader-dialog pt-12!">
            <div className="dialog-title h-12! bg-layer4">
              Withdraw
              <button
                className="button dialog-back p-0! absolute left-3.5 right-auto"
                type="button"
                onClick={() => router.back()}
              >
                <div className="icon size-5!">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                  </svg>
                </div>
              </button>
              <div className="ml-auto absolute right-4 top-0 flex items-center h-full" />
            </div>
            <div className="scroll-y dialog-content">
              <div className="scroll-container">
                <div className="rounded-xl bg-layer4 p-4 flex cursor-pointer items-center px-4 py-3 mt-4">
                  <div className="flex h-full flex-none items-center overflow-hidden rounded-lg bg-layer3_alt">
                    <div className="py-1">
                      <img
                        alt=""
                        className="h-7 min-w-24"
                        src="https://bc.game/modules/wallet2/assets/cwallet_w-CnOXM19u.png"
                      />
                    </div>
                  </div>
                  <div className="ml-2.5 mr-4 line-clamp-2">
                    Connect Cwallet to earn bonus
                  </div>
                  <div className="icon ml-auto size-6! flex-none rotate-180 fill-secondary">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                    </svg>
                  </div>
                </div>
                <div className="center relative flex px-3 py-1">
                  <hr className="h-[.5px] flex-1 border-t-[0.5px] border-third" />
                  <span className="mx-2 flex-none text-secondary">or</span>
                  <hr className="h-[.5px] flex-1 border-t-[0.5px] border-third" />
                </div>
                <div className="mt-1 rounded-xl bg-layer4 p-4">
                  <div className="mb-1 text-secondary">Withdraw Currency</div>
                  <button
                    className="button not-full w-full border border-input bg-input_bright"
                    type="button"
                  >
                    <img
                      alt=""
                      className="size-6!"
                      src="https://imgxcut.com/coin/ETH.black.png"
                    />
                    <div className="mx-2 text-base">ETH</div>
                    <div className="button-input center ml-auto size-6! rounded-lg">
                      <div className="icon size-3! -rotate-90">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                  <form>
                    <div className="mt-5 [&_.select]:w-full [&_.select]:bg-input_bright">
                      <div className="mb-1.5 text-secondary">
                        Choose CoinNetwork
                      </div>
                      <button
                        className="button select bg-input_bright"
                        type="button"
                      >
                        <div className="ellipsis w-0 flex-auto text-left">
                          Ethereum (ERC20)
                        </div>
                        <div className="size-6! ml-auto bg-input_button center rounded-md ">
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
                    <div className="mt-4 flex items-center underline">
                      <div className="icon ml-auto mr-1.5 size-4! fill-primary">
                        <svg
                          viewBox="0 0 32 32"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M27.0652 6.12112C26.8805 5.96972 26.6644 5.86455 26.4338 5.81385C26.2032 5.76315 25.9643 5.76831 25.7359 5.82891L18.5402 7.73948C17.7611 7.94635 17.2186 8.65159 17.2186 9.45772V23.9102C17.2186 25.077 18.3237 25.9275 19.4516 25.6287L26.5236 23.7555C26.8564 23.6675 27.1512 23.4672 27.3608 23.1862C27.5705 22.9053 27.6831 22.5601 27.6806 22.2055V7.3662C27.6768 7.12396 27.6194 6.88582 27.5127 6.67001C27.4061 6.45421 27.253 6.26645 27.0652 6.12112ZM14.757 9.45873C14.757 8.65213 14.214 7.9466 13.4342 7.74016L6.21515 5.82891C5.99027 5.77516 5.75666 5.77349 5.53108 5.82401C5.3055 5.87453 5.09356 5.976 4.91049 6.12112C4.72393 6.27167 4.57356 6.46465 4.47109 6.68501C4.36862 6.90538 4.31681 7.14719 4.31969 7.39161V22.2055C4.31995 22.5579 4.43378 22.9002 4.64324 23.1786C4.8527 23.4569 5.1459 23.6554 5.47666 23.7428L12.5207 25.6232C13.6494 25.9245 14.757 25.0738 14.757 23.9056V9.45873Z" />
                        </svg>
                      </div>
                      <span className="cursor-pointer">
                        How to Withdraw Crypto?
                      </span>
                    </div>
                    <label
                      className="text-secondary block mb-1.5 mt-5"
                      htmlFor="address"
                    >
                      Withdrawal Address
                    </label>
                    <input defaultValue="" name="address" type="hidden" />
                    <div className="relative w-full">
                      <div className="input text-base">
                        <input
                          autoComplete="off"
                          id="address"
                          placeholder="Fill in carefully according to the specific currency"
                          required
                        />
                        <div className="mr-1 flex rounded-md size-6! bg-layerx center sm:cursor-pointer">
                          <div className="icon size-4!">
                            <svg
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                d="M10.3825 4.45605C8.68242 4.45605 7.30408 5.8344 7.30408 7.53443V9.07361H6.53449C6.10967 9.07361 5.76489 9.41839 5.76489 9.84321C5.76489 10.268 6.10967 10.6128 6.53449 10.6128H7.30408V12.9216H6.53449C6.10967 12.9216 5.76489 13.2664 5.76489 13.6912C5.76489 14.116 6.10967 14.4608 6.53449 14.4608H7.30408V16.7695H6.53449C6.10967 16.7695 5.76489 17.1143 5.76489 17.5391C5.76489 17.964 6.10967 18.3087 6.53449 18.3087H7.30408V20.6175H6.53449C6.10967 20.6175 5.76489 20.9623 5.76489 21.3871C5.76489 21.8119 6.10967 22.1567 6.53449 22.1567H7.30408V24.4655C7.30408 26.1655 8.68242 27.5438 10.3825 27.5438V4.45605ZM11.9216 4.45605V27.5438H23.1568C24.8568 27.5438 26.2351 26.1655 26.2351 24.4655V7.53443C26.2351 5.8344 24.8568 4.45605 23.1568 4.45605H11.9216ZM15 12.152H20.3088C20.7336 12.152 21.0784 11.8072 21.0784 11.3824C21.0784 10.9576 20.7336 10.6128 20.3088 10.6128H15C14.5752 10.6128 14.2304 10.9576 14.2304 11.3824C14.2304 11.8072 14.5752 12.152 15 12.152ZM15 9.84321H22.6176C23.0424 9.84321 23.3872 9.49843 23.3872 9.07361C23.3872 8.6488 23.0424 8.30402 22.6176 8.30402H15C14.5752 8.30402 14.2304 8.6488 14.2304 9.07361C14.2304 9.49843 14.5752 9.84321 15 9.84321Z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-0" />
                    </div>
                    <input
                      defaultValue='{"chain":"ETHEREUM","chainName":"Ethereum","label":"Ethereum (ERC20)","tokenFullName":"Ethereum","tokenType":"NATIVE","tokenId":"1","currencyGroupName":"ETH","decimals":0,"addrTypes":[],"withdrawLimitAmount":"0.02","depositLimitAmount":"0.0002","minFee":"0.0001","maxFee":"0.05","blockExplorer":"https://etherscan.io/","queryTxPath":"tx/0x%s","queryTokenPath":"token/%s","status":0,"depositConfirmTimes":6,"walletVersion":1,"tagName":"","canDeposit":true,"canWithdraw":true}'
                      name="token"
                      type="hidden"
                    />
                    <div className="mb-1.5 mt-5 flex justify-between text-secondary">
                      <div>Withdraw Amount</div>
                      <div>
                        Min:
                        <span className="text-error ml-1">0.0201 ETH</span>
                      </div>
                    </div>
                    <div className="input text-base">
                      <input autoComplete="off" inputMode="decimal" required />
                    </div>
                    <div className="mt-1 flex justify-between gap-1">
                      <button
                        className="button button-second h-8! flex-1 bg-layer6 text-secondary"
                        type="button"
                      >
                        Min
                      </button>
                      <button
                        className="button button-second h-8! flex-1 bg-layer6 text-secondary"
                        type="button"
                      >
                        25%
                      </button>
                      <button
                        className="button button-second h-8! flex-1 bg-layer6 text-secondary"
                        type="button"
                      >
                        50%
                      </button>
                      <button
                        className="button button-second h-8! flex-1 bg-layer6 text-secondary"
                        type="button"
                      >
                        Max
                      </button>
                    </div>
                    <input
                      defaultValue="Withdrawal amount should be greater than the minimum amount."
                      name="error_amount"
                      type="hidden"
                    />
                    <div className="mt-5">
                      <div className="text-right">
                        <span className="mr-1 text-secondary">Available:</span>
                        <span>0</span>
                      </div>
                    </div>
                    <input defaultValue="0" name="amount" type="hidden" />
                    <input defaultValue="0" name="showAmount" type="hidden" />
                    <input defaultValue="0" name="reciveAmount" type="hidden" />
                    <input defaultValue="0.0001" name="calcFee" type="hidden" />
                    <button
                      className="button button-brand my-4 w-full"
                      disabled
                      type="submit"
                    >
                      Preview
                    </button>
                  </form>
                </div>
                <div id="withdraw-crypto-notice" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
