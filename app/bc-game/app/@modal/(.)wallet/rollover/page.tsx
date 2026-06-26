"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WalletRolloverModal() {
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
              Rollover
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
                    className="sticky z-10 grid gap-2 py-4 grid-cols-2 bg-inherit sm:grid-cols-3 top-0 [&>button]:bg-layer3"
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
                        All Status
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
                  <div className="mt-3 flex flex-none justify-between rounded-xl px-4 py-3 bg-layer3">
                    <div className="flex-1">Rollover Type</div>
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

