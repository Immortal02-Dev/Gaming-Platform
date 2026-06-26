"use client";

interface Props {
  onClose: () => void;
}
export default function PhoneVerification({ onClose }: Props) {
  return (
    <div className="pop-overlayer">
      <div
        className="bg-layer3 dark:bg-layer2 pop-center"
        style={{
          opacity: "1",
          transform: "scale(1)",
        }}
      >
        <div className="pop-title">
          <button
            className="button button-m pop-close p-0!"
            type="button"
            onClick={onClose}
          >
            <div className="icon size-4!">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.15445 7.40846C6.3734 8.18951 6.3734 9.45584 7.15445 10.2369L12.9175 15.9999L7.15445 21.7629C6.3734 22.544 6.3734 23.8103 7.15445 24.5914L7.40846 24.8454C8.18951 25.6264 9.45584 25.6264 10.2369 24.8454L15.9998 19.0825L21.7631 24.8458C22.5441 25.6269 23.8104 25.6269 24.5915 24.8458L24.8455 24.5918C25.6265 23.8108 25.6265 22.5444 24.8455 21.7634L19.0825 16.0003L24.8455 10.2373C25.6265 9.45627 25.6265 8.18994 24.8455 7.40889L24.5915 7.15488C23.8104 6.37383 22.5441 6.37383 21.7631 7.15488L16.0002 12.9177L10.2369 7.15445C9.45584 6.3734 8.18951 6.3734 7.40846 7.15445L7.15445 7.40846Z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="scroll-y pop-content">
          <div className="scroll-container">
            <div className="special-tabs-change w-full">
              <div className="tabs-content">
                <div className="w-fll">
                  <div className="center flex-col pt-6">
                    <div className="icon fill-secondary">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21.2608 3.5918H10.7384C7.31361 3.5918 6.07275 4.83265 6.07275 8.31945V23.6812C6.07275 27.168 7.31361 28.4089 10.7384 28.4089H21.2484C24.6855 28.4089 25.9264 27.168 25.9264 23.6812V8.31945C25.9264 4.83265 24.6855 3.5918 21.2608 3.5918ZM15.9996 25.0585C14.8084 25.0585 13.8281 24.0783 13.8281 22.8871C13.8281 21.6958 14.8084 20.7156 15.9996 20.7156C17.1908 20.7156 18.1711 21.6958 18.1711 22.8871C18.1711 24.0783 17.1908 25.0585 15.9996 25.0585ZM18.4813 8.86542H13.5179C13.0091 8.86542 12.5872 8.44353 12.5872 7.93478C12.5872 7.42603 13.0091 7.00414 13.5179 7.00414H18.4813C18.99 7.00414 19.4119 7.42603 19.4119 7.93478C19.4119 8.44353 18.99 8.86542 18.4813 8.86542Z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-center text-lg font-extrabold">
                      Phone Verification
                    </p>
                    <p className="mt-3 px-2 text-center text-secondary">
                      Enter your new phone number below to receive a
                      verification code.
                    </p>
                  </div>
                  <div className="input mt-4 bg-input_darken">
                    <input placeholder="Your phone number" required />
                    <div className="order-first">
                      <button className="" type="button">
                        <div className="flex h-5 min-w-12 items-center justify-center border-r-2 border-solid border-third pr-1">
                          <span className="mr-1.5">+82</span>
                          <span className="mr-0.5">🇰🇷</span>
                          <div className="icon size-4! -rotate-90 fill-tertiary transition ease-out">
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
                  <button
                    className="button button-brand button-m mt-6 w-full"
                    disabled
                    type="button"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
