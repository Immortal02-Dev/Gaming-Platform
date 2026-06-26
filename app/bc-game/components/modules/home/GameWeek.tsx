import CardCarousel from "@/components/ui/carousel/CardCarousel";

const game_week = [
  {
    id: 1,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  {
    id: 2,
    title: "Roulette 2",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/2",
    userCount: 154,
  },
  {
    id: 3,
    title: "Speed Baccarat 2",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/3",
    userCount: 45,
  },
  {
    id: 4,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 5,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  {
    id: 6,
    title: "Roulette 2",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/2",
    userCount: 154,
  },
  {
    id: 7,
    title: "Speed Baccarat 2",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/3",
    userCount: 45,
  },
  {
    id: 8,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 9,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 10,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 11,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 12,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  {
    id: 13,
    title: "Roulette 2",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/2",
    userCount: 154,
  },
  {
    id: 14,
    title: "Speed Baccarat 2",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/3",
    userCount: 45,
  },
  {
    id: 15,
    title: "Roulette 1",
    image: "https://imgxcut.com/game/image/ad1dfce45a.png",
    href: "/game/4",
    userCount: 99,
  },
  {
    id: 16,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  {
    id: 17,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  {
    id: 18,
    title: "Speed Baccarat 1",
    image: "https://imgxcut.com/game/image/1782e23ec3.png?_v=4,dpr=1,width=200",
    href: "/game/1",
    userCount: 88,
  },
  // ... dagdagan mo pa para makita yung swipe
];

export default function GameWeek() {
  return (
    <CardCarousel
      title="Game of the Week"
      games={game_week}
      path="casino/game-week"
      sectionId="game-week-home"
    />
  );
}
