"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function WalletTransactionModal() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      if (!mobile) {
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
              Transaction
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
                <div className="sm:mx-0 rounded-xl flex-auto bg-layer2">
                  <div
                    className="sticky z-10 grid gap-2 py-4 grid-cols-2 bg-inherit top-0 [&>button]:bg-layer3"
                    style={
                      {
                        ["--offsetTop" as any]: "49px",
                      } as React.CSSProperties
                    }
                  >
                    <button
                      className="button select bg-input_bright"
                      type="button"
                    >
                      <div className="ellipsis w-0 flex-auto text-left">
                        Bill
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
                    <button
                      className="button select bg-input_bright"
                      type="button"
                    >
                      <div className="ellipsis w-0 flex-auto text-left">
                        All Assets
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
                    <button
                      className="button select bg-input_bright "
                      type="button"
                    >
                      <div className="ellipsis w-0 flex-auto text-left">
                        Past 24 hours
                      </div>
                      <div className="-mr-1 ml-auto size-6 flex-none rounded-md bg-input_button p-1 center">
                        <div className="icon -rotate-90 transition-all size-4!">
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
                      className="button select bg-input_bright"
                      type="button"
                    >
                      <div className="ellipsis w-0 flex-auto text-left">
                        All Type
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
                  <div className="mb-3 flex cursor-pointer items-center text-secondary underline sm:mb-4">
                    <div className="icon mr-1 size-4!">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M13.3646 27.9996C8.19298 27.9996 4 23.8067 4 18.635V13.3646C4 8.19298 8.19298 4 13.3646 4L18.635 4.00003C23.8066 4.00003 27.9996 8.19301 27.9996 13.3647V18.635C27.9996 23.8067 23.8066 27.9997 18.6349 27.9997H13.3646L13.3646 27.9996ZM13.3646 25.9604H18.6349C22.6812 25.9604 25.9605 22.6804 25.9605 18.6349V13.3646C25.9605 9.31831 22.6804 6.03913 18.6351 6.03913H13.3647C9.31836 6.03913 6.03918 9.31917 6.03918 13.3646V18.6349C6.03918 22.6812 9.31925 25.9604 13.3647 25.9604H13.3646ZM16.0003 13.2918C15.3887 13.2918 14.8838 12.8375 14.8038 12.2482L14.7931 12.0846V12.0073C14.7931 11.3406 15.3336 10.7993 16.0012 10.7993C16.6127 10.7993 17.1176 11.2535 17.1976 11.8428L17.2082 12.0064V12.0837C17.2082 12.7504 16.6678 13.2918 16.0002 13.2918H16.0003ZM16.0003 21.8919C15.3887 21.8919 14.8838 21.4377 14.8038 20.8484L14.7931 20.6849V15.5016C14.7931 14.8349 15.3336 14.2936 16.0012 14.2936C16.6127 14.2936 17.1176 14.7478 17.1976 15.3371L17.2082 15.5007V20.684C17.2082 21.3515 16.6678 21.8919 16.0002 21.8919H16.0003Z" />
                      </svg>
                    </div>
                    Fiat deposit issues or disputes
                  </div>
                  <div className="mt-3 flex flex-none justify-between rounded-xl px-4 py-3 bg-layer3">
                    <div className="flex-1">Transaction</div>
                    <div className="flex-1 text-right">Amount</div>
                  </div>
                  <div className="grid grid-cols-1">
                    <section className="py-10 text-center center flex-col col-span-full">
                      <img
                        className="w-48 h-48"
                        src="https://bc.game/substation/bc/common/empty_w.png"
                      />
                      <div className="leading-5 mt-4">
                        Stay tuned—something's coming!
                      </div>
                    </section>
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

