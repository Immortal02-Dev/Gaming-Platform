import GameCard from "@/components/ui/game-card/GameCard";

import { Game } from "@/types/game";

const myGames: Game[] = [
  {
    id: "1",
    title: "Bear Smash: 15000X Boost",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/bear-smash-15000x-boost",
    userCount: 52,
    isNew: true,
  },
  {
    id: "2",
    title: "Arcane Portals",
    image: "https://imgxcut.com/game/image/fedd8dd28a.png?_v=4,dpr=1,width=200",
    href: "/game/arcane-portals",
    userCount: 1240,
    isNew: false,
  },
  {
    id: "3",
    title: "Classic Dice",
    image: "https://imgxcut.com/game/image/6b0de1a65a.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 850,
    isNew: false,
  },
  {
    id: "4",
    title: "Sugar Rush 1000",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/sugar-rush-1000",
    userCount: 312,
    isNew: true,
  },
  {
    id: "5",
    title: "Gates of Olympus",
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
    title: "Mines",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/mines",
    userCount: 945,
    isNew: true,
  },
  {
    id: "8",
    title: "Sweet Bonanza",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/sweet-bonanza",
    userCount: 670,
    isNew: false,
  },
  {
    id: "9",
    title: "Wheel",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/wheel",
    userCount: 125,
    isNew: false,
  },
  {
    id: "10",
    title: "Crash",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/crash",
    userCount: 5600,
    isNew: true,
  },
  {
    id: "11",
    title: "Starlight Princess",
    image: "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
    href: "/game/starlight-princess",
    userCount: 418,
    isNew: false,
  },
  {
    id: "12",
    title: "Wukong",
    image: "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
    href: "/game/wukong",
    userCount: 24,
    isNew: false,
  },
  {
    id: "13",
    title: "Ne Zha",
    image: "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
    href: "/game/ne-zha",
    userCount: 26,
    isNew: true,
  },
  {
    id: "14",
    title: "Super Waldo",
    image: "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
    href: "/game/super-waldo",
    userCount: 49,
    isNew: false,
  },
  {
    id: "15",
    title: "Deadliest Sea",
    image: "https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200",
    href: "/game/deadliest-sea",
    userCount: 76,
    isNew: false,
  },
  {
    id: "16",
    title: "Rhino Robbery",
    image: "https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200",
    href: "/game/rhino-robbery",
    userCount: 30,
    isNew: true,
  },
];

export default function ExclusivePage() {
  return (
    <div className="page-content relative z-10 w-full px-4 mx-auto max-w-312">
      <div className="flex items-center my-6 ">
        <button
          className="button button-m mr-3 size-8! rounded-lg bg-layer4 p-0! text-secondary"
          type="button"
        >
          <div className="icon size-5!">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
            </svg>
          </div>
        </button>
        <div className="text-xl font-extrabold">BC Exclusive</div>
      </div>

      <div className="grid mt-4 gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {myGames.map((item) => (
          <GameCard key={item.id} game={item} />
        ))}
      </div>

      <div className="w-full center mt-4 flex">
        <div className="flex items-center gap-x-[0.15rem] ">
          <button
            disabled
            className="button button-m pagination-button pagination-prev"
            type="button"
          >
            <div className="icon size-4! text-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
              </svg>
            </div>
          </button>
          <div className="pagination">
            <input size={2} className="pagination-current" defaultValue="01" />
            <span className="text-tertiary">of</span>
            <div className="p-2 min-w-8 h-8 justify-center flex items-center">
              <span>03</span>
            </div>
          </div>
          <button
            className="button button-m pagination-button pagination-next"
            type="button"
          >
            <div className="icon size-4! rotate-180 text-secondary">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.9717 9.59292L15.2482 15.3155L20.9717 21.0389L18.5143 23.4972L10.3325 15.3164L18.5143 7.1355L20.9717 9.59292Z"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
