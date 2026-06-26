"use client";

interface Props {
  onClose: () => void;
}
export default function Language({ onClose }: Props) {
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
          Language
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
            <div className="w-full pb-3 sticky top-0 z-10">
              <div className="input h-11">
                <input placeholder="Search" />
                <div className="icon size-6! order-first mr-2 fill-tertiary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.6269 21.5678L19.3527 20.2936C17.8403 21.5314 15.9082 22.2749 13.8023 22.2774C8.95471 22.2774 5.02441 18.3471 5.02441 13.4996C5.02441 8.65197 8.95471 4.72168 13.8023 4.72168C18.6499 4.72168 22.5802 8.65197 22.5802 13.4996C22.5776 15.5902 21.8443 17.5095 20.6235 19.0169L21.9003 20.2936L21.8714 20.3216L21.8825 20.3123C22.158 20.0936 22.5598 20.1122 22.815 20.3665L27.2599 24.8114C27.5337 25.0853 27.5337 25.5304 27.2599 25.805L26.1307 26.9343C25.8568 27.2081 25.4117 27.2081 25.1371 26.9343L20.6922 22.4894C20.4378 22.235 20.4192 21.8332 20.6379 21.5568L20.6269 21.5678ZM13.8023 6.82332C10.1153 6.82332 7.12605 9.81258 7.12605 13.4996C7.12605 17.1865 10.1153 20.1758 13.8023 20.1758C17.4893 20.1758 20.4785 17.1865 20.4785 13.4996C20.4751 9.81343 17.4884 6.82671 13.8023 6.82332Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="pb-4 -ml-4 -mr-4 px-4">
              <div
                aria-selected="true"
                className="radio btn-like select-item flex items-center"
              >
                <span className="flex-auto text-left text-base font-semibold">
                  English
                </span>

                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Indian English
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Tiếng việt
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Indonesian
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  日本語
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  한국어
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Français
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Español
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  <label className="radio-container pointer-events-none">
                    <input type="radio" readOnly />
                    <span className="checkmark"></span>
                  </label>
                  Español (M éxico)
                </span>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Filipino
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  عربى
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  हिन्दी
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Türkçe
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  فارسی
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Português
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Руccкий
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Deutsch
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  ภาษาไทย
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Suomi
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Polski
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Italiano
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  မြန်မာ
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  اردو
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Українська
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Melayu
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  বাংলা
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Marathi
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Tamil
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Telugu
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  繁體中文
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  简体中文
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="radio btn-like select-item flex items-center">
                <span className="flex-auto text-left text-base font-semibold">
                  Հայերեն
                </span>
                <label className="radio-container pointer-events-none">
                  <input type="radio" readOnly />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
