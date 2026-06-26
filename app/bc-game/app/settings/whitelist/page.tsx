export default function SettingWhitelist() {
  return (
    <div className="mt-3 w-full rounded-lg bg-layer4 p-3 sm:mt-0 sm:px-6 sm:py-4">
      <div className="block md:flex w-full items-center border-b border-solid border-third pb-4">
        <div className="flex flex-col">
          <span className="text-base font-extrabold hidden md:block">
            Whitelist Management
          </span>
          <div className="mt-2 flex items-center text-secondary justify-between md:justify-start">
            <span>Whitelist Disabled</span>
            <div className="switch switch-xs ml-2">
              <div />
            </div>
          </div>
        </div>
        <button
          className="button button-m ml-auto h-10 bg-button_bright px-3 hidden! md:flex!"
          type="button"
        >
          <div className="icon size-4! fill-brand">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0247 5.11523C14.962 5.11523 14.1005 5.97674 14.1005 7.03946L14.1005 14.0761H7.06388C6.00116 14.0761 5.13965 14.9376 5.13965 16.0003C5.13965 17.063 6.00115 17.9245 7.06388 17.9245H14.1003V24.9615C14.1003 26.0242 14.9618 26.8857 16.0245 26.8857C17.0872 26.8857 17.9487 26.0242 17.9487 24.9615V17.9249L24.9854 17.9249C26.0481 17.9249 26.9096 17.0634 26.9096 16.0006C26.9096 14.9379 26.0481 14.0764 24.9854 14.0764L17.949 14.0764L17.949 7.03946C17.949 5.97674 17.0874 5.11523 16.0247 5.11523Z" />
            </svg>
          </div>
          <span className="ml-2 font-extrabold text-brand">Add Address</span>
        </button>
      </div>
      <div className="flex items-center mt-4 gap-2">
        <button
          className="button button-m select bg-input_bright bg-input_darken flex-1 h-10"
          type="button"
        >
          <span className="sm:text-secondary">All Type</span>
          <div className="size-6 ml-auto bg-input_button center rounded-md ">
            <div className="icon size-4! transition-all -rotate-90">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
              </svg>
            </div>
          </div>
        </button>
        <button
          className="button button-m select bg-input_bright bg-input_darken flex-1 h-10"
          type="button"
        >
          <span className="sm:text-secondary">All Network</span>
          <div className="size-6 ml-auto bg-input_button center rounded-md ">
            <div className="icon size-4! transition-all -rotate-90">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div className="w-full p-3 bg-layer4 rounded-lg mt-3 sm:py-4 sm:px-0 sm:mt-4">
        <div className="w-full h-80 flex center">
          <section className="py-10 text-center center flex-col">
            <img
              className="w-48 h-48"
              src="https://bc.game/substation/bc/common/empty_w.png"
            />
            <div className="leading-5 mt-4">Stay tuned—something's coming!</div>
          </section>
        </div>
      </div>
    </div>
  );
}

