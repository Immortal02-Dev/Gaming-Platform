export default function ViewModeToggle() {
  return (
    <div className="mt-4">
      <div>
        <div className="w-full h-10 overflow-hidden relative">
          <div className="w-full overflow-x-auto overflow-y-hidden">
            <div className="inline-block whitespace-nowrap align-top h-10">
              <div className="flex">
                <div
                  className="sports-outright__btn active"
                  data-editor-id="sportPageTab"
                >
                  <div className="opacity-[1] flex items-center justify-center mr-1">
                    <svg
                      data-cy="ic-hot-title"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block"
                      style={{
                        fill: "currentcolor",
                        color: "inherit",
                        width: "auto",
                        height: "24px",
                      }}
                    >
                      <path d="M3 4.28571C3 3.57563 3.57563 3 4.28571 3H8.14286C8.85294 3 9.42857 3.57563 9.42857 4.28571V10.7143C9.42857 11.4244 8.85294 12 8.14286 12H4.28571C3.57563 12 3 11.4244 3 10.7143V4.28571Z"></path>
                      <path d="M12 12C12 11.2899 12.5756 10.7143 13.2857 10.7143H19.7143C20.4244 10.7143 21 11.2899 21 12V19.7143C21 20.4244 20.4244 21 19.7143 21H13.2857C12.5756 21 12 20.4244 12 19.7143V12Z"></path>
                      <path d="M3 15.8571C3 15.1471 3.57563 14.5714 4.28571 14.5714H8.14286C8.85294 14.5714 9.42857 15.1471 9.42857 15.8571V19.7143C9.42857 20.4244 8.85294 21 8.14286 21H4.28571C3.57563 21 3 20.4244 3 19.7143V15.8571Z"></path>
                      <path d="M12 4.28571C12 3.57563 12.5756 3 13.2857 3H19.7143C20.4244 3 21 3.57563 21 4.28571V6.85714C21 7.56722 20.4244 8.14286 19.7143 8.14286H13.2857C12.5756 8.14286 12 7.56722 12 6.85714V4.28571Z"></path>
                    </svg>
                  </div>
                  <div className="opacity-[1]">Matches</div>
                </div>
                <div
                  className="sports-outright__btn"
                  data-editor-id="sportPageTab"
                >
                  <div className="opacity-[0.5] flex items-center justify-center mr-1">
                    <svg
                      data-cy="ic-outrights-title"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block"
                      style={{
                        fill: "currentcolor",
                        color: "inherit",
                        width: "auto",
                        height: "24px",
                      }}
                    >
                      <path d="M11 6.5C11 5.67157 11.6716 5 12.5 5C13.3284 5 14 5.67157 14 6.5V8H18V6.5C18 5.67157 18.6716 5 19.5 5C20.3284 5 21 5.67157 21 6.5V8H23C25.2091 8 27 9.79086 27 12V13V23C27 25.2091 25.2091 27 23 27H9C6.79086 27 5 25.2091 5 23V13V12C5 9.79086 6.79086 8 9 8H11V6.5ZM24 13H8V23C8 23.5523 8.44772 24 9 24H23C23.5523 24 24 23.5523 24 23V13ZM10 16.5C10 17.0523 10.4477 17.5 11 17.5L21 17.5C21.5523 17.5 22 17.0523 22 16.5C22 15.9477 21.5523 15.5 21 15.5H11C10.4477 15.5 10 15.9477 10 16.5ZM11 21.5C10.4477 21.5 10 21.0523 10 20.5C10 19.9477 10.4477 19.5 11 19.5H15C15.5523 19.5 16 19.9477 16 20.5C16 21.0523 15.5523 21.5 15 21.5H11Z"></path>
                    </svg>
                  </div>
                  <div className="opacity-[0.5]">Outrights</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
