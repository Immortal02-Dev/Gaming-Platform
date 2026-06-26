export default function EditProfilePage() {
  return (
    <div className="w-full py-6">
      <div className="fix-bglayer5 relative mx-auto size-40 rounded-full">
        <div className="h-full w-full overflow-hidden rounded-full">
          <img
            alt="avatar"
            className="h-full w-full"
            src="//img2.distributedresourcestorage.com/avatar/102324897/s?t=0"
          />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <button
            className="button button-brand button-m h-8! min-w-32 px-2 py-0"
            type="button"
          >
            <span className="whitespace-nowrap">Edit Your Avatar</span>
          </button>
        </div>
      </div>
      <p className="mt-4! input-label">Username</p>
      <div className="input bg-layer3">
        <input defaultValue="techcode187" />
      </div>
      <p className="mt-1 text-xs text-secondary">
        Do not use special symbols, otherwise your account may not be supported.
      </p>
      <div className="mt-4 flex w-full justify-between px-1 font-semibold text-secondary">
        <div>Avatar Frame</div>
        <div />
      </div>
      <div className="mt-2 grid grid-cols-4 sm:grid-cols-5">
        <div
          className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4"
          style={{
            backgroundColor: "rgb(58, 65, 66)",
          }}
        >
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative left-1/2 top-1/2 flex h-17.5 w-17.5 -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-full border-2 border-dashed border-[#697072] p-4 text-center text-sm">
              Not used
            </div>
            <div className="absolute bottom-1 left-1/2 z-10 w-13 -translate-x-1/2 rounded-lg bg-brand px-2 text-center text-xs font-extrabold text-primary_brand">
              In use
            </div>
          </div>
        </div>
        <div className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4">
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative flex center size-full">
              <div className="h-full w-full overflow-hidden rounded-full" />
              <div className="icon absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                </svg>
              </div>
              <img
                alt="Avatar frame 1"
                className="pointer-events-none absolute select-none w-full  scale-100 -z-1"
                src="https://bc.game/assets/frame/1.png"
              />
            </div>
          </div>
        </div>
        <div className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4">
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative flex center size-full">
              <div className="h-full w-full overflow-hidden rounded-full" />
              <div className="icon absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                </svg>
              </div>
              <img
                alt="Avatar frame 2"
                className="pointer-events-none absolute select-none w-full scale-100 -z-1"
                src="https://bc.game/assets/frame/2.png"
              />
            </div>
          </div>
        </div>
        <div className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4">
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative flex center size-full">
              <div className="h-full w-full overflow-hidden rounded-full" />
              <div className="icon absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                </svg>
              </div>
              <img
                alt="Avatar frame 3"
                className="pointer-events-none absolute select-none w-full scale-100 -z-1"
                src="https://bc.game/assets/frame/3.png"
              />
            </div>
          </div>
        </div>
        <div className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4">
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative flex center size-full">
              <div className="h-full w-full overflow-hidden rounded-full" />
              <div className="icon absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                </svg>
              </div>
              <img
                alt="Avatar frame 4"
                className="pointer-events-none absolute select-none w-full scale-100 -z-1"
                src="https://bc.game/assets/frame/4.png"
              />
            </div>
          </div>
        </div>
        <div className="relative flex h-24.5 items-center justify-center rounded-lg px-3 py-4">
          <div className="relative aspect-square h-23 w-23 cursor-pointer">
            <div className="relative flex center size-full">
              <div className="h-full w-full overflow-hidden rounded-full" />
              <div className="icon absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2576 13.7203H22.1016V8.67326C22.0975 5.84024 19.8023 3.54504 16.9701 3.54102H15.1613C12.3283 3.54504 10.0331 5.84024 10.029 8.67246V13.7195H8.72347C7.18476 13.7307 5.94189 14.98 5.94189 16.5204V25.661C5.94189 27.2077 7.19601 28.4618 8.74276 28.4618H23.2568C24.8035 28.4618 26.0577 27.2077 26.0577 25.661V16.5204C26.0577 14.9736 24.8035 13.7195 23.2568 13.7195L23.2576 13.7203ZM17.1397 21.5023C17.0947 22.0602 16.6309 22.4959 16.0657 22.4959C15.5005 22.4959 15.0367 22.0602 14.9917 21.5063V19.6548C15.0367 19.0969 15.5005 18.6612 16.0657 18.6612C16.6309 18.6612 17.0947 19.0969 17.1397 19.6508V19.6548V21.5023ZM19.8168 13.7203H12.3146V8.67326C12.3186 7.10239 13.5904 5.83059 15.1613 5.82657H16.9701C18.541 5.83059 19.8128 7.10239 19.8168 8.67326V13.7203Z" />
                </svg>
              </div>
              <img
                alt="Avatar frame 5"
                className="pointer-events-none absolute select-none w-full scale-100 -z-1"
                src="https://bc.game/assets/frame/5.png"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="button button-brand button-m mt-4 w-full"
        disabled
        type="button"
      >
        Save
      </button>
    </div>
  );
}
