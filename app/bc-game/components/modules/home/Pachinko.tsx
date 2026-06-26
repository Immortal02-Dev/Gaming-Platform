import CardCarousel from "@/components/ui/carousel/CardCarousel";

const Pachinko_Game = [
  {
    id: "bc1",
    title: "Crash",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc2",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/6f2962ec00.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc3",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc4",
    title: "Crash",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc5",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/6f2962ec00.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc6",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc7",
    title: "Crash",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc8",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/6f2962ec00.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc9",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  {
    id: "bc10",
    title: "Crash",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/crash",
    userCount: 2045,
  },
  {
    id: "bc11",
    title: "Limbo",
    image: "https://imgxcut.com/game/image/6f2962ec00.png?_v=4,dpr=1,width=200",
    href: "/game/limbo",
    userCount: 880,
  },
  {
    id: "bc13",
    title: "Hash Dice",
    image: "https://imgxcut.com/game/image/edfc30a1c0.png?_v=4,dpr=1,width=200",
    href: "/game/dice",
    userCount: 120,
  },
  // ...
];

export default function Pachinko() {
  return (
    <CardCarousel
      title="Pachinko"
      games={Pachinko_Game}
      path="casino/pachinko"
      sectionId="pachinko-home"
    />
  );
}
