export default function EmailBind() {
  return (
    <div className="special-tabs-change w-full">
      {/* <div className="scroll-x tabs-title hide-scroll">
        <button aria-selected="true" className="tabs-btn btn-like" />
        <button className="tabs-btn btn-like" />
        <div className="tabs-indicator" />
      </div> */}
      <div className="tabs-content mt-0">
        <div className="w-full">
          <div className="center flex-col pt-6">
            <div className="icon fill-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.2746 5.33398H9.72598C5.96139 5.33398 3.45166 7.21628 3.45166 11.6083V20.3923C3.45166 24.7844 5.96139 26.6667 9.72598 26.6667H22.2746C26.0392 26.6667 28.5489 24.7844 28.5489 20.3923V11.6083C28.5489 7.21628 26.0392 5.33398 22.2746 5.33398ZM22.8644 12.9761L18.9367 16.1133C18.1085 16.7783 17.0544 17.1046 16.0003 17.1046C14.9462 17.1046 13.8796 16.7783 13.0639 16.1133L9.13619 12.9761C8.73464 12.6498 8.67189 12.0475 8.98561 11.6459C9.31187 11.2444 9.90166 11.1691 10.3032 11.4954L14.2309 14.6325C15.1846 15.398 16.8034 15.398 17.7571 14.6325L21.6848 11.4954C22.0864 11.1691 22.6887 11.2318 23.0024 11.6459C23.3287 12.0475 23.266 12.6498 22.8644 12.9761Z" />
              </svg>
            </div>
            <p className="mt-3 text-center text-lg font-extrabold">
              Email Verification
            </p>
          </div>
          <div className="input mt-6 h-12 w-full">
            <input readOnly defaultValue="techcode187@gmail.com" />
          </div>
          <button
            className="button button-brand button-m mt-6 w-full"
            type="button"
          >
            Verify
          </button>
          <div className="center mt-3 flex w-full gap-1 text-secondary">
            <span>Not your email?</span>
            <span className="cursor-pointer text-brand underline">Change</span>
          </div>
        </div>
      </div>
    </div>
  );
}
