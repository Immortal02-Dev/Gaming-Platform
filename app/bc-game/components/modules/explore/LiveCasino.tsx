import GameCard from "@/components/ui/game-card/GameCard";
import { Game } from "@/types/game";
export default function LiveCasinoExplore() {
  const LiveCasino: Game[] = [
    {
      id: "1",
      title: "",
      image:
        "https://imgxcut.com/game/image/7360_Chance Machine 5.png?_v=4,dpr=2,width=200",
      href: "/game/crash",
      userCount: 52,
      isNew: false,
    },
    {
      id: "2",
      title: "",
      image:
        "https://imgxcut.com/game/image/42a568e7d7.png?_v=4,dpr=2,width=200",
      href: "/game/arcane-portals",
      userCount: 1240,
      isNew: false,
    },
    {
      id: "3",
      title: "",
      image:
        "https://imgxcut.com/game/image/97c8bda59e.png?_v=4,dpr=2,width=200",
      href: "/game/dice",
      userCount: 850,
      isNew: false,
    },
    {
      id: "4",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/sugar-rush-1000",
      userCount: 312,
      isNew: false,
    },
    {
      id: "5",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/gates-of-olympus",
      userCount: 2105,
      isNew: false,
    },
    {
      id: "6",
      title: "Plinko",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/plinko",
      userCount: 4320,
      isNew: false,
    },
    {
      id: "7",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/mines",
      userCount: 945,
      isNew: false,
    },
    {
      id: "8",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/sweet-bonanza",
      userCount: 670,
      isNew: false,
    },
    {
      id: "9",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/wheel",
      userCount: 125,
      isNew: false,
    },
    {
      id: "10",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/crash",
      userCount: 5600,
      isNew: false,
    },
    {
      id: "11",
      title: "",
      image:
        "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
      href: "/game/starlight-princess",
      userCount: 418,
      isNew: false,
    },
    {
      id: "12",
      title: "",
      image:
        "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
      href: "/game/wukong",
      userCount: 24,
      isNew: false,
    },
    {
      id: "13",
      title: "",
      image:
        "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
      href: "/game/ne-zha",
      userCount: 26,
      isNew: false,
    },
    {
      id: "14",
      title: "",
      image:
        "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
      href: "/game/super-waldo",
      userCount: 49,
      isNew: false,
    },
    {
      id: "15",
      title: "",
      image:
        "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
      href: "/game/deadliest-sea",
      userCount: 76,
      isNew: false,
    },
    {
      id: "16",
      title: "",
      image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
      href: "/game/rhino-robbery",
      userCount: 30,
      isNew: false,
    },
  ];
  return (
    <>
      <div className="mt-2 flex w-full items-center gap-2 sm:w-auto">
        <button
          className="button select bg-input_bright flex-1 sm:w-[288px] sm:flex-none"
          type="button"
        >
          <span className="whitespace-nowrap text-secondary">Sort By:</span>
          <span className="font-semibold ml-1">Popular</span>
          <div className="size-6 ml-auto bg-input_button center rounded-md ">
            <div className="icon size-4! transition-all -rotate-90">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
              </svg>
            </div>
          </div>
        </button>
        <button
          className="button select bg-input_bright flex-1 sm:w-[288px] sm:flex-none"
          type="button"
        >
          <span className="mr-1 text-secondary">Providers:</span>
          <span>All</span>
          <div className="size-6 ml-auto bg-input_button center rounded-md">
            <div className="icon size-4! transition-all -rotate-90">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
              </svg>
            </div>
          </div>
        </button>
      </div>
      <div className="w-full">
        <div
          className="grid mt-4 gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-8"
          style={
            {
              ["--aspect-ratio" as any]: "0.75",
              ["--grid-gap" as any]: ".5rem",
            } as React.CSSProperties
          }
        >
          {LiveCasino.map((item) => (
            <GameCard key={item.id} game={item} />
          ))}
        </div>
        <div className="f-ull center mt-4 flex">
          <div className="flex items-center gap-x-[0.15rem] ">
            <button
              className="button pagination-button pagination-prev"
              disabled
              type="button"
            >
              <div className="icon size-4! text-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
            <div className="pagination">
              <input
                className="pagination-current size-2 text-center"
                defaultValue={1}
              />
              <span className="text-tertiary">of</span>
              <div className="p-2 min-w-8 h-8 justify-center-center flex items-center">
                <span>100</span>
              </div>
            </div>
            <button
              className="button pagination-button pagination-next"
              type="button"
            >
              <div className="icon size-4! rotate-180 text-secondary">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
