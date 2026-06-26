export default function SettingPayment() {
  return (
    <div className="py-4 sm:py-0">
      <div className="w-full p-3 bg-layer4 rounded-lg sm:py-4 sm:px-6 relative">
        <button
          className="button button-m rounded-lg bg-layer5 h-10 absolute right-4 w-auto px-2 py-0 hidden! md:flex!"
          style={{
            background: "var(--Chip-Group-Tab)",
          }}
          type="button"
        >
          <div className="icon fill-brand size-5!">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0247 5.11523C14.962 5.11523 14.1005 5.97674 14.1005 7.03946L14.1005 14.0761H7.06388C6.00116 14.0761 5.13965 14.9376 5.13965 16.0003C5.13965 17.063 6.00115 17.9245 7.06388 17.9245H14.1003V24.9615C14.1003 26.0242 14.9618 26.8857 16.0245 26.8857C17.0872 26.8857 17.9487 26.0242 17.9487 24.9615V17.9249L24.9854 17.9249C26.0481 17.9249 26.9096 17.0634 26.9096 16.0006C26.9096 14.9379 26.0481 14.0764 24.9854 14.0764L17.949 14.0764L17.949 7.03946C17.949 5.97674 17.0874 5.11523 16.0247 5.11523Z" />
            </svg>
          </div>
          <span className="ml-2 font-extrabold text-brand">Add New Method</span>
        </button>
        <div className="w-full h-9 overflow-x-auto flex items-center hidden-scroll-bar">
          <button
            className="p-2 h-9 mr-1 rounded-lg center sm:h-10 sm:px-4"
            style={{
              background: "var(--Chip-Group-Tab)",
            }}
          >
            <span className="whitespace-nowrap text-primary font-extrabold">
              All Cards
            </span>
          </button>
          <button
            className="p-2 h-9 mr-1 rounded-lg center sm:h-10 sm:px-4"
            style={{
              background: "transparent",
            }}
          >
            <span className="whitespace-nowrap text-secondary">
              Credit Cards
            </span>
          </button>
          <button
            className="p-2 h-9 mr-1 rounded-lg center sm:h-10 sm:px-4"
            style={{
              background: "transparent",
            }}
          >
            <span className="whitespace-nowrap text-secondary">
              Debit Cards
            </span>
          </button>
        </div>
        <div className="mt-3 pt-3 w-full border-t border-solid border-third sm:mt-4 sm:pt-4 sm:flex sm:flex-wrap sm:gap-2">
          <button
            className="button rounded-x w-full mb-3 bg-[#f2f2f2] md:hidden!"
            type="button"
          >
            <div className="icon fill-brand size-5!">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.0247 5.11523C14.962 5.11523 14.1005 5.97674 14.1005 7.03946L14.1005 14.0761H7.06388C6.00116 14.0761 5.13965 14.9376 5.13965 16.0003C5.13965 17.063 6.00115 17.9245 7.06388 17.9245H14.1003V24.9615C14.1003 26.0242 14.9618 26.8857 16.0245 26.8857C17.0872 26.8857 17.9487 26.0242 17.9487 24.9615V17.9249L24.9854 17.9249C26.0481 17.9249 26.9096 17.0634 26.9096 16.0006C26.9096 14.9379 26.0481 14.0764 24.9854 14.0764L17.949 14.0764L17.949 7.03946C17.949 5.97674 17.0874 5.11523 16.0247 5.11523Z" />
              </svg>
            </div>
            <span className="ml-2 font-extrabold text-brand">
              Add New Method
            </span>
          </button>
          <p className="text-center text-secondary w-full">
            No card yet! Please add a card
          </p>
        </div>
      </div>
      <div className="w-full p-3 bg-layer4 rounded-lg mt-3 sm:py-4 sm:px-6 sm:mt-4">
        <div className="w-full h-11 flex items-center pb-3 border-b border-third border-solid">
          <span className="text-base font-extrabold">History</span>
        </div>
        <div className="py-3 sm:py-4">
          <div className="w-full h-60 center">
            <section className="py-10 text-center center flex-col w-full">
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
  );
}

