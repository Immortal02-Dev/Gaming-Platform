import Link from "next/link";
export default function SettingAccount() {
  return (
    <>
      <div className="mt-4 w-full rounded-lg bg-layer4 p-3 sm:mt-0 sm:px-6 sm:py-4">
        <div className="flex h-11 items-center border-b border-solid border-third pb-3">
          <span className="text-base font-extrabold">Profile Info</span>
        </div>
        <div className="mt-3 flex items-center">
          <div className="size-16 rounded-full bg-layer5 p-1">
            <div className="h-full w-full overflow-hidden rounded-full">
              <img
                alt="avatar"
                className="h-full w-full"
                src="//img2.distributedresourcestorage.com/avatar/102324897/s?t=1769499309607"
              />
            </div>
          </div>
          <div className="ml-2.5">
            <p className="text-base">techcode187</p>
            <p className="mt-1 text-secondary">
              <span>User ID:</span>
              <span className="ml-0.5">102324897</span>
            </p>
          </div>
          <Link
            href="/settings/edit-profile"
            className="button button-brand button-m ml-auto h-8 min-w-24 overflow-hidden sm:h-10 sm:min-w-24"
          >
            <span className="ml-0.5 whitespace-nowrap">Edit</span>
          </Link>
        </div>
      </div>

      <div className="mt-3 w-full rounded-lg bg-layer4 p-3 sm:mt-4 sm:px-6 sm:py-4">
        <div className="flex h-11 flex-col items-start justify-center border-b border-solid border-third pb-3">
          <span className="text-base font-extrabold">Contact Info</span>
        </div>
        <div className="mt-3">
          <p className="flex h-4.5 items-center text-secondary">
            E-mail Verification
          </p>
          <div className="sm:flex sm:items-center">
            <div className="mt-1.5 flex h-12 w-full items-center rounded-lg border border-solid border-input bg-input_bright px-4 sm:h-10">
              <span className="noline text-base text-secondary">
                techcode187@gmail.com
              </span>
            </div>
            <Link
              href="/user-action/email-bind"
              className="button button-brand button-m mt-3 w-full flex-none sm:ml-2 sm:mt-1.5 sm:w-auto sm:min-w-24"
              type="button"
            >
              <span className="ml-1 text-primary_brand">Verify</span>
            </Link>
          </div>
          <p className="mt-4 flex h-4.5 items-center text-secondary">
            Phone Number
          </p>
          <div className="sm:flex sm:items-center">
            <p className="mt-1.5 text-secondary sm:flex-1">
              Verify your phone number and you can use the phone as your second
              login method.
            </p>
            <button
              className="button button-brand button-m mt-3 w-full flex-none sm:ml-2 sm:mt-1.5 sm:w-auto sm:min-w-24"
              type="button"
            >
              <span className="ml-1 text-primary_brand">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mb-4 mt-4 w-full rounded-lg bg-layer4 p-3 sm:px-6 sm:py-4">
        <div className="flex h-11 items-center border-b border-solid border-third pb-3">
          <span className="text-base font-extrabold">Account Connections</span>
        </div>
        <div className="flex items-center border-b border-solid border-third">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-start">
              <div className="center flex size-6">
                <div className="icon size-6 flex-none fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.49144 13.7447C8.98834 15.2056 8.98831 16.7946 9.49144 18.2554L5.47289 21.2749L9.49144 18.2808C10.4711 21.0489 13.146 23.1246 16.3235 23.1246C17.9649 23.1245 19.3689 22.7152 20.4543 21.9976C21.7514 21.1774 22.6251 19.896 22.8899 18.4351H16.3225V13.899H27.7883C27.9207 14.6676 28.0002 15.4875 28.0002 16.2818C28.0002 19.8445 26.6758 22.8695 24.3723 24.9458L24.3567 24.9331C22.3458 26.7185 19.5979 27.7641 16.3235 27.7642C11.7161 27.7642 7.53135 25.2525 5.46605 21.2798C3.745 17.9736 3.74589 14.0521 5.46703 10.7203L9.49144 13.7447Z" />
                    <path d="M16.3264 4.23588C19.3449 4.21031 22.2575 5.28746 24.4553 7.28666L20.9866 10.6695C19.7422 9.51609 18.0474 8.87535 16.3264 8.90092C13.1489 8.90092 10.474 10.952 9.49437 13.7456L5.46996 10.7212C7.53525 6.74851 11.7191 4.23588 16.3264 4.23588Z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold capitalize">google</p>
                <p className="mt-2 text-secondary">Not Connected</p>
              </div>
            </div>
            <button
              className="button button-brand button-m relative min-w-27.5"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="flex items-center border-b border-solid border-third">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-start">
              <div className="center flex size-6">
                <div className="icon size-6 flex-none fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.90694 15.2947L26.2758 5.47633C27.0847 5.10485 28.0305 5.4855 28.3877 6.32673C28.515 6.62491 28.5543 6.95474 28.5022 7.27707L25.6344 24.999C25.4582 26.0876 24.4667 26.8222 23.42 26.639C23.1213 26.5865 22.8386 26.4616 22.5952 26.2741L15.3683 20.7061C14.6572 20.1589 14.5074 19.1161 15.0344 18.3765C15.0945 18.2915 15.1633 18.2124 15.2386 18.1407L22.4846 11.2259C22.5503 11.1634 22.5543 11.0585 22.4942 10.9902C22.4421 10.9319 22.3581 10.9194 22.2916 10.9618L11.296 18.0441C10.8964 18.3006 10.4087 18.3631 9.96103 18.2132L4.96937 16.5382C4.6322 16.4249 4.44722 16.0493 4.55615 15.6994C4.61221 15.5195 4.74038 15.3713 4.90694 15.2947Z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold capitalize">telegram</p>
                <p className="mt-2 text-secondary">Not Connected</p>
              </div>
            </div>
            <button
              className="button button-brand button-m relative min-w-27.5"
              type="button"
            >
              Connect
              <div className="absolute left-0 top-0 size-full overflow-hidden rounded-lg">
                <iframe
                  className="size-full"
                  scrolling="no"
                  src="https://auth.bc.game/api/account/open/telegram/login-iframe"
                  style={{
                    colorScheme: "light",
                    opacity: "0.01",
                  }}
                />
              </div>
            </button>
          </div>
        </div>
        <div className="flex items-center border-b border-solid border-third">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-start">
              <div className="center flex size-6">
                <div className="icon size-6 flex-none fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                      clipRule="evenodd"
                      d="M15.9999 4.25146C22.7181 4.25146 28.1833 8.74008 28.1833 14.2574C28.1833 16.4655 27.3381 18.4541 25.5724 20.4136C23.0164 23.3911 17.3003 27.0177 15.9999 27.5722C14.7362 28.1112 14.8821 27.2688 14.9399 26.935C14.9416 26.9254 14.9432 26.9162 14.9447 26.9075C14.9755 26.7222 15.1184 25.8521 15.1184 25.8521C15.1595 25.5373 15.202 25.049 15.0792 24.7372C14.9426 24.394 14.4026 24.2158 14.0058 24.1293C8.15098 23.3459 3.81665 19.2036 3.81665 14.2574C3.81665 8.74008 9.28256 4.25146 15.9999 4.25146ZM9.14195 16.0831H11.464C11.595 16.0831 11.7008 16.1905 11.7008 16.323V17.1869C11.7008 17.3193 11.595 17.427 11.464 17.427H8.04984C7.91858 17.427 7.81278 17.3171 7.81278 17.1869V11.8214C7.81278 11.689 7.91905 11.5816 8.05008 11.5816H8.90489C9.03568 11.5816 9.14195 11.689 9.14195 11.8214V16.0831ZM13.5241 11.5818H12.6696C12.5385 11.5818 12.432 11.6892 12.432 11.8212V17.1876C12.432 17.3198 12.5385 17.427 12.6696 17.427H13.5241C13.6552 17.427 13.7614 17.3198 13.7614 17.1876V11.8212C13.7614 11.6892 13.6552 11.5818 13.5241 11.5818ZM19.4064 11.5818H18.5518C18.4208 11.5818 18.3145 11.6892 18.3145 11.8212V15.0094L15.8818 11.6883C15.8368 11.6201 15.7638 11.5863 15.6842 11.5818H14.8298C14.6988 11.5818 14.5923 11.6892 14.5923 11.8212V17.1876C14.5923 17.3198 14.6988 17.427 14.8298 17.427H15.6842C15.8154 17.427 15.9217 17.3198 15.9217 17.1876V14.0003L18.3575 17.3257C18.4012 17.3883 18.4755 17.427 18.5518 17.427H19.4064C19.5376 17.427 19.6437 17.3198 19.6437 17.1876V11.8212C19.6437 11.6892 19.5376 11.5818 19.4064 11.5818ZM24.125 12.9254C24.256 12.9254 24.3618 12.8182 24.3618 12.6855V11.8217C24.3618 11.6892 24.256 11.5816 24.125 11.5816H20.7111C20.58 11.5816 20.4738 11.6912 20.4738 11.8214V17.1871C20.4738 17.317 20.5797 17.427 20.7107 17.427H24.125C24.256 17.427 24.3618 17.3193 24.3618 17.1871V16.323C24.3618 16.1908 24.256 16.0831 24.125 16.0831H21.8032V15.1761H24.125C24.256 15.1761 24.3618 15.0686 24.3618 14.9362V14.0723C24.3618 13.9399 24.256 13.8322 24.125 13.8322H21.8032V12.9254H24.125Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold capitalize">line</p>
                <p className="mt-2 text-secondary">Not Connected</p>
              </div>
            </div>
            <button
              className="button button-brand button-m relative min-w-27.5"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="flex items-center border-b border-solid border-third">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-start">
              <div className="center flex size-6">
                <div className="icon size-6 flex-none fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.1236 14.3799L26.2298 5.16797H24.3096L17.268 13.1649L11.6481 5.16797H5.16455L13.6648 17.2619L5.16455 26.9208H7.08479L14.5161 18.474L20.4524 26.9208H26.936M8.0674 6.61816L10.7279 6.58362L24.3081 25.5747H21.3574" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold capitalize">twitter</p>
                <p className="mt-2 text-secondary">Not Connected</p>
              </div>
            </div>
            <button
              className="button button-brand button-m relative min-w-27.5"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
        <div className="flex items-center border-b border-solid border-third">
          <div className="flex w-full items-center justify-between py-4">
            <div className="flex items-start">
              <div className="center flex size-6">
                <div className="icon size-6 flex-none fill-secondary">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9376 10.7051C21.1956 10.7052 22.2187 11.7285 22.2189 12.9902C22.2192 13.5958 21.9787 14.177 21.5509 14.6055C21.1231 15.0338 20.543 15.2747 19.9376 15.2754C19.3324 15.2745 18.7519 15.0338 18.3243 14.6055C17.8967 14.177 17.657 13.5956 17.6573 12.9902C17.6569 12.385 17.8969 11.8045 18.3243 11.376C18.7519 10.9474 19.3322 10.7061 19.9376 10.7051Z" />
                    <path
                      clipRule="evenodd"
                      d="M15.9923 4C22.62 4 27.9933 9.37324 27.9933 16.001C27.9931 22.6286 22.6199 28.001 15.9923 28.001C10.5837 28.0008 6.01135 24.4196 4.5128 19.501L4.49522 19.4941C3.87969 17.6827 4.01879 15.2581 4.02159 15.2109C4.02015 15.2085 4.01912 15.2055 4.01768 15.2031C4.42881 8.94762 9.63291 4.00016 15.9923 4ZM15.9923 5.59961C10.6409 5.59977 6.23205 9.64352 5.65538 14.8408C5.86797 15.2271 6.0635 15.6431 6.20323 16.1084L10.4718 17.8682C10.648 17.7489 10.8362 17.6485 11.0333 17.5684C11.4862 17.382 11.9632 17.2976 12.4386 17.3193L15.3751 13.0537L15.3741 12.9951H15.3702C15.3702 10.4772 17.4154 8.42969 19.9288 8.42969C22.4471 8.43496 24.4874 10.4772 24.4874 12.9951C24.4872 15.5128 22.4432 17.5625 19.9288 17.5625L19.8253 17.5605L15.628 20.5625C15.6402 21.0325 15.5524 21.4998 15.3712 21.9336C15.0315 22.748 14.3824 23.3942 13.5665 23.7305C12.7508 24.0666 11.8354 24.065 11.0206 23.7266C9.98487 23.2953 9.27888 22.399 9.05382 21.376L6.53917 20.3379C8.18419 23.9164 11.8 26.4012 15.9923 26.4014C21.7363 26.4014 26.3935 21.7449 26.3937 16.001C26.3937 10.2569 21.7364 5.59961 15.9923 5.59961ZM13.2833 18.2764C12.6542 18.0152 11.9814 18.0231 11.3898 18.248L12.9278 18.8828C13.3909 19.0763 13.7584 19.446 13.9493 19.9102C14.1402 20.3742 14.1383 20.8951 13.9454 21.3584C13.8502 21.5876 13.711 21.7963 13.5353 21.9717C13.3595 22.147 13.1505 22.2862 12.921 22.3809C12.6915 22.4755 12.4456 22.5238 12.1974 22.5234C11.9491 22.523 11.703 22.4743 11.4737 22.3789L9.99034 21.7637C10.2613 22.3317 10.7314 22.7806 11.3116 23.0244C12.5375 23.5351 13.9364 23.0242 14.5558 21.877L14.6661 21.6387C14.9292 21.0066 14.9309 20.3066 14.67 19.6719C14.409 19.037 13.9208 18.54 13.2833 18.2764ZM19.9327 9.9541C19.1272 9.95633 18.3554 10.2776 17.7862 10.8477C17.2172 11.4177 16.8966 12.1897 16.8956 12.9951C16.8963 13.8009 17.217 14.5743 17.7862 15.1445C18.3554 15.7145 19.1272 16.0359 19.9327 16.0381C20.7385 16.0361 21.5108 15.7147 22.0802 15.1445C22.6496 14.5742 22.9701 13.801 22.9708 12.9951C22.9698 12.1895 22.6495 11.4167 22.0802 10.8467C21.5108 10.2766 20.7384 9.95609 19.9327 9.9541Z"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-semibold capitalize">steam</p>
                <p className="mt-2 text-secondary">Not Connected</p>
              </div>
            </div>
            <button
              className="button button-brand button-m relative min-w-27.5"
              type="button"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
