import ResponsibleSidebar from "@/components/modules/responsible/ResponsibleSidebar";

export default function HelpLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="page-main flex flex-wrap gap-x-4">
        <div
          className="sticky text-lg w-full font-extrabold leading-8 pb-4"
          style={{ ["--offsetTop" as any]: "72px" } as React.CSSProperties}
        >
          <label className="-mt-8 block w-60 bg-layer2 md:pb-4 pt-8 pb-0">
            Responsible Gambling
          </label>
        </div>
        <section className="bg-layer2 py-4 md:hidden w-full pt-0!">
          <button
            className="button select bg-input_bright w-full!"
            type="button"
          >
            <label>FAQ's</label>
            <div className="size-6 ml-auto bg-input_button center rounded-md ">
              <div className="icon size-4! transition-all -rotate-90">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </div>
          </button>
        </section>
        <div className="hidden md:block">
          <ResponsibleSidebar />
        </div>

        <div className="page-container w-96 min-h-96 flex-1 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
