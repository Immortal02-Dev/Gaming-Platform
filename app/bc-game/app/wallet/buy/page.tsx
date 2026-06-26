export default function WalletBuy() {
  return (
    <div className="rounded-xl p-4 bg-layer4 lg:px-8">
      <div className="">
        <div className="text-secondary mb-1.5">You pay with</div>
        <div className="input text-base">
          <input inputMode="decimal" />
          <button
            className="button button-s select bg-input_bright bg-input border-none! *:bg-transparent"
            type="button"
          >
            <div className="flex items-center rounded-lg flex-auto">
              <img
                className="mr-1 size-5"
                src="https://bc.game/coin/KRW.rect.png"
              />
              <div className="text-left">KRW</div>
            </div>
            <div className="size-6 ml-auto bg-input_button center rounded-md ">
              <div className="icon size-4! transition-all -rotate-90">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-secondary mb-1.5">Estimate to obtain</div>
        <div className="input text-base">
          <input inputMode="decimal" readOnly />
          <button
            className="button button-s select bg-input_bright bg-input border-none! *:bg-transparent"
            type="button"
          >
            <div className="flex items-center rounded-lg flex-auto">
              <img
                className="mr-1 size-5"
                src="https://bc.game/coin/USDT.black.png"
              />
              <div className="text-left">USDT</div>
            </div>
            <div className="size-6 ml-auto bg-input_button center rounded-md ">
              <div className="icon size-4! transition-all -rotate-90">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>
      <section className="py-10 text-center center flex-col">
        <img
          className="w-48 h-48"
          src="https://bc.game/substation/bc/common/empty_w.png"
        />
        <div className="leading-5 mt-4">
          <div className="text-secondary">server_error</div>
          <button
            className="button button-second button-m mx-auto mt-1 min-w-40"
            type="button"
          >
            Reload{" "}
            <div className="icon size-4! ml-1">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3928 22.9458H13.6156C9.7887 22.5976 7.20686 19.5852 7.39883 15.9518C7.46219 14.7525 7.75565 13.4865 8.17602 12.843L8.95322 13.6202C9.43984 14.1147 9.93781 14.4931 10.5076 14.3974C10.7985 14.3485 11.1528 14.0947 11.2848 13.6202L12.8392 7.40338C12.9644 6.94981 12.9086 6.51703 12.8392 6.34496C12.6964 5.99082 12.3211 5.84898 12.062 5.84898H5.84521C5.12009 5.85831 4.66465 6.13499 4.29082 6.62618C4.03597 6.96006 4.00304 7.6285 4.29082 8.18057L5.84521 10.5122C4.95377 11.9065 4.28926 13.9551 4.29082 15.9518C4.29004 21.0331 7.95219 25.2696 12.8392 26.0546C13.3568 26.0658 13.8758 26.0546 14.3936 26.0546C15.4728 26.0546 15.948 25.1199 15.948 24.5002C15.948 23.8147 15.411 23.0153 14.3928 22.9458ZM27.6036 23.723L26.0492 21.3914C26.9414 20.0002 27.6059 17.9515 27.6036 15.9518C27.6044 10.8728 23.9422 6.63628 19.0552 5.84898C17.6852 5.73371 16.0753 5.61692 15.9464 7.40338C15.9464 8.09042 16.5555 8.62177 17.4656 8.85105L18.278 8.95777C22.1042 9.30595 24.6868 12.3184 24.4948 15.9518C24.6891 17.0484 24.379 18.1714 23.7176 19.0606L22.9404 18.2834C22.3848 17.7801 21.9143 17.445 21.386 17.5062C21.0107 17.5919 20.7417 17.8714 20.6088 18.2834L19.0544 24.5002C18.95 24.8301 18.8913 25.4046 18.9968 25.639C19.3075 26.0546 19.7749 26.0553 19.8316 26.0546H26.0484C26.7751 26.0452 27.2306 25.7685 27.6028 25.2774C27.8209 24.9265 27.8697 24.2113 27.6036 23.723Z" />
              </svg>
            </div>
          </button>
        </div>
      </section>
      <div className="p-2 flex text-secondary rounded-xl bg-success/10 my-4">
        <div className="icon flex-none -mt-0.5 w-6 h-6 mr-1.5 text-success">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.0005 4C22.6282 4 28.001 9.37279 28.001 16.0005C28.001 22.6282 22.6282 28.001 16.0005 28.001C9.37279 28.001 4 22.6282 4 16.0005C4 9.37279 9.37279 4 16.0005 4ZM15.8393 20.2572C15.4433 20.2572 15.1193 20.3832 14.8493 20.6352C14.5793 20.8873 14.4533 21.2113 14.4533 21.6073C14.4533 22.0033 14.5793 22.3273 14.8493 22.5793C15.1193 22.8313 15.4433 22.9753 15.8393 22.9753C16.2354 22.9753 16.5594 22.8493 16.8294 22.5973C17.0994 22.3453 17.2434 22.0033 17.2434 21.6073C17.2434 21.2113 17.0994 20.8873 16.8474 20.6352C16.5774 20.3832 16.2354 20.2572 15.8393 20.2572ZM15.7999 8.74019C15.7768 8.74019 15.7536 8.74105 15.7313 8.74191C14.8313 8.77962 14.1327 9.53994 14.1713 10.44L14.5013 18.2506H17.0651L17.4234 10.4391C17.4243 10.4143 17.4251 10.3894 17.4251 10.3645C17.4251 9.46708 16.6974 8.74019 15.8008 8.74019H15.7999Z" />
          </svg>
        </div>
        Depending on the blockchain, the deposit may take a few minutes to 1
        hour to arrive.
      </div>
      <div className="flex h-6 items-center text-secondary">
        <button className="checkbox btn-like mr-1" type="button">
          <div className="checkbox-ico" />
        </button>
        I have read and agree to the
        <span className="cursor-pointer text-primary ml-1 underline">
          disclaimer.
        </span>
      </div>
      <button
        className="button button-brand button-m mt-8 w-full center"
        disabled
        type="button"
      >
        Buy Crypto
      </button>
    </div>
  );
}

