"use client";

interface Props {
  onClose: () => void;
}
export default function ReferralLink({ onClose }: Props) {
  return (
    <div className="pop-overlayer">
      <div
        className="bg-layer3 dark:bg-layer2 pop-center min-w-109.75!"
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
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 rounded-lg bg-layer1 px-2 py-4">
                <img
                  className="h-auto w-32 object-contain"
                  src="https://bc.game/substation/bc/bonus/affiliate/refer.png"
                />
                <div className="text-xl font-extrabold">
                  <p className="mb-4">
                    <span className="block">REFER A FRIEND AND GET</span>
                    <span className="text-3xl text-warning">₩1,453,918</span>
                    <span className="mx-1">+</span>
                    <span className="text-3xl text-brand">15%</span>
                    <span className="block">COMMISSION</span>
                  </p>
                  <p className="text-sm font-normal text-brand">
                    Invite friends, earn money.
                  </p>
                </div>
              </div>
              <div>
                <p className="text-secondary">referral link</p>
                <div className="mt-2 flex w-full items-center justify-between rounded-xl border border-input bg-layer3 px-3 py-2">
                  <p className="text-brand">https://bc.game/i-494swhc0j-n/</p>
                </div>
              </div>
              <button
                className="button button-brand button-m w-full"
                type="button"
              >
                Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

