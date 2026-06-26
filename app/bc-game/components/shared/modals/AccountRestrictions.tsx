"use client";

interface Props {
  onClose: () => void;
}
export default function AccountRestrictions({ onClose }: Props) {
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
          Account Restrictions
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
            <div className="flex w-full flex-col items-center justify-center">
              <img
                alt="action"
                className="h-36 w-40"
                src="https://bc.game/modules/account2/assets/action-CuSL-obN.png"
              />
              <p className="text-center text-secondary">
                In order to protect your account safety,
                <span className="mx-1 font-semibold text-primary">
                  we will disable your withdrawals for 24 hours
                </span>
                after you change your <span>password</span>.
              </p>
              <div className="mt-9 flex w-full items-center gap-3">
                <button
                  className="button button-second button-m flex-1"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="button button-brand button-m flex-1"
                  type="button"
                >
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
